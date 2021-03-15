import React, { useCallback, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

// COMPONENT
import AccountReAuth from './AccountReAuth';
import AccountCompleteAuth from './AccountCompleteAuth';
import AccountChangeSuc from './AccountChangeSuc';

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth);
  const [reauthCheck, setReauthCheck] = useState(false);
  const [changeCheck, setChangeCheck] = useState(false);

  const nestedControlFlow = useCallback(
    (...params) => {
      const [Com1, Com2, Com3, Com4] = params;
      if (reauthCheck) {
        if (changeCheck) {
          return Com3;
        } else if (!changeCheck) {
          return Com4;
        }
        return Com2;
      } else {
        return Com1;
      }
    },
    [changeCheck, reauthCheck]
  );

  const reAuthenticatedOrder = useCallback((order) => {
    switch (order) {
      case 'authChange':
        break;
      case 'authComplete':
        break;
      default:
        return <AccountReAuth />;
    }
  }, []);

  return (
    <Grid container justify='center'>
      <Grid item xs={8}>
        <Card raised={true}>
          <CardHeader
            title={nestedControlFlow('본인 인증', '개인 정보 업데이트', '개인정보 업데이트 완료', '개인 정보 업데이트')}
          />
          <CardContent>
            {!currentUser && <Typography>다시 로그인을 진행해 주세요.</Typography>}

            {currentUser?.providerId === 'password' &&
              (reauthCheck ? (
                changeCheck ? (
                  <AccountChangeSuc />
                ) : (
                  <AccountCompleteAuth setChangeCheck={setChangeCheck} />
                )
              ) : (
                <AccountReAuth setReauthCheck={setReauthCheck} />
              ))}

            {currentUser?.providerId === 'google.com' && (
              <Box>
                <Typography>Google 사용자는 Google 홈페이지에서 계정 설정을 해주세요.</Typography>
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
                <Typography>facebook 사용자는 facebook 홈페이지에서 계정 설정을 해주세요.</Typography>
                <Button
                  style={{ marginTop: 10 }}
                  startIcon={<i className='fab fa-facebook'></i>}
                  variant='outlined'
                  size='large'
                  color='primary'
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
                <Typography>github 사용자는 github 홈페이지에서 계정 설정을 해주세요.</Typography>
                <Button
                  style={{ marginTop: 10 }}
                  startIcon={<i className='fab fa-github'></i>}
                  variant='outlined'
                  size='large'
                  color='primary'
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
    </Grid>
  );
}
