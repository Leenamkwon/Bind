import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { VpnKey, Update, CheckCircle } from '@material-ui/icons';

// COMPONENT
import AccountReAuth from './AccountReAuth';
import AccountCompleteAuth from './AccountCompleteAuth';
import AccountChangeSuc from './AccountChangeSuc';
import { outChatList } from '../../app/firestore/firebaseRealChat';

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth);
  const [authStep, setAuthstep] = useState('reauth');

  const step = useMemo(
    () => ({
      reauth: {
        Component: <AccountReAuth setAuthstep={setAuthstep} />,
        title: '본인 인증',
        icon: <VpnKey color='primary' />,
      },
      authcomplete: {
        Component: <AccountCompleteAuth setAuthstep={setAuthstep} />,
        title: '개인 정보 업데이트',
        icon: <Update color='primary' />,
      },
      authrelogin: { Component: <AccountChangeSuc />, title: '업데이트 완료', icon: <CheckCircle color='primary' /> },
    }),
    []
  );

  const reAuthenticatedOrder = useCallback(
    (order, type) => {
      switch (order) {
        case 'authcomplete':
          return step[order][type];
        case 'authrelogin':
          return step[order][type];
        default:
          return step[order][type];
      }
    },
    [step]
  );

  return (
    <Grid container justify='center'>
      <Grid item xs={8}>
        <Card raised={true}>
          <CardHeader
            avatar={reAuthenticatedOrder(authStep, 'icon')}
            title={<Typography variant='h6'>{reAuthenticatedOrder(authStep, 'title')}</Typography>}
          />
          <CardContent>
            {currentUser?.providerId === 'password' && reAuthenticatedOrder(authStep, 'Component')}

            {currentUser?.providerId === 'google.com' && (
              <Box>
                <Typography variant='h6' gutterBottom>
                  Google 사용자는 Google 홈페이지에서 계정 설정을 해주세요.
                </Typography>
                <Button
                  style={{ marginTop: 10 }}
                  startIcon={<i className='fab fa-google'></i>}
                  variant='outlined'
                  size='large'
                  component='a'
                  href='https://google.com'
                  target='_blank'
                >
                  홈페이지 이동
                </Button>
              </Box>
            )}

            {currentUser?.providerId === 'facebook.com' && (
              <Box>
                <Typography variant='h6' gutterBottom>
                  Facebook 사용자는 Facebook 홈페이지에서 계정 설정을 해주세요.
                </Typography>
                <Button
                  style={{ marginTop: 10, backgroundColor: '#4267B2' }}
                  startIcon={<i className='fab fa-facebook'></i>}
                  variant='outlined'
                  size='large'
                  component='a'
                  href='https://facebook.com'
                  target='_blank'
                >
                  홈페이지 이동
                </Button>
              </Box>
            )}

            {currentUser?.providerId === 'github.com' && (
              <Box>
                <Typography variant='h6' gutterBottom>
                  Github 사용자는 Github 홈페이지에서 계정 설정을 해주세요.
                </Typography>
                <Button
                  style={{ marginTop: 10, backgroundColor: '#333' }}
                  startIcon={<i className='fab fa-github'></i>}
                  variant='outlined'
                  size='large'
                  component='a'
                  href='https://github.com'
                  target='_blank'
                >
                  홈페이지 이동
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
      <h1 onClick={async () => await outChatList('FjBcpVMcHqtucz56YtZ1')}> test </h1>
    </Grid>
  );
}
