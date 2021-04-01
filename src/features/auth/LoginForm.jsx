import React, { useState } from 'react';
import { Box, Card, Hidden, Typography, Link as MuiLink } from '@material-ui/core';
import { DonutSmall } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENT
import { modalClose, modalOpen } from '../../app/common/modal/modalReducer';
import ModalWrapper from '../../app/common/modal/ModalWrapper';
import LoginFormText from './LoginFormText';
import ForgotPassword from './ForgotPassword';
import modalImages from '../../app/api/modalImage';

export default function LoginForm() {
  const dispatch = useDispatch();
  const [forgotPassword, setForgotPassword] = useState(false);
  const { open } = useSelector((state) => state.modal);

  function handleClose() {
    dispatch(modalClose());
  }

  return (
    <ModalWrapper open={open} onClose={handleClose} maxWidth='md'>
      <Card style={{ height: 800 }}>
        <Box display='flex' style={{ height: '100%' }}>
          <Hidden smDown>
            <Box width='40%'>
              <img
                src={modalImages[Math.floor(Math.random() * modalImages.length)]}
                alt='Login'
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          </Hidden>
          <Box flexGrow={1} display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center'>
            <Box mt={4} display='flex' alignItems='center' flexDirection='column'>
              <DonutSmall style={{ fontSize: 60 }} color='primary' />
              <Typography variant='h5' component='h4'>
                {!forgotPassword ? '로그인' : '비밀번호 찾기'}
              </Typography>
              {!forgotPassword && (
                <Typography variant='subtitle2' component='h4'>
                  반가워요
                </Typography>
              )}
            </Box>
            {/* FORM  */}
            {!forgotPassword ? <LoginFormText type='modal' /> : <ForgotPassword />}
            {!forgotPassword ? (
              <>
                <Typography variant='subtitle2' color='textSecondary'>
                  계정이 없으신가요?{' '}
                  <MuiLink component='button' onClick={() => dispatch(modalOpen('RegisterForm'))}>
                    가입하기
                  </MuiLink>
                </Typography>
                <Typography variant='subtitle2' color='textSecondary'>
                  비밀번호를 까먹으셨나요?{' '}
                  <MuiLink component='button' onClick={() => setForgotPassword(true)}>
                    비밀번호 찾기
                  </MuiLink>
                </Typography>
              </>
            ) : (
              <Typography variant='subtitle2' color='textSecondary'>
                <MuiLink component='button' onClick={() => setForgotPassword(false)}>
                  로그인 하기
                </MuiLink>
              </Typography>
            )}
          </Box>
        </Box>
      </Card>
    </ModalWrapper>
  );
}
