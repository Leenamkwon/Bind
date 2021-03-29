import React, { useState } from 'react';
import { Box, Hidden, Typography, Link as MuiLink } from '@material-ui/core';
import { DonutSmall } from '@material-ui/icons';

// COMPONENT
import modalImages from '../../app/api/modalImage';
import LoginFormText from '../auth/LoginFormText';
import ForgotPassword from '../auth/ForgotPassword';

export default function Login({ setIsLogin }) {
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
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
        {!forgotPassword ? <LoginFormText type='route' /> : <ForgotPassword />}
        {!forgotPassword ? (
          <>
            <Typography variant='subtitle2' color='textSecondary'>
              계정이 없으신가요?{' '}
              <MuiLink component='button' onClick={() => setIsLogin(false)}>
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
  );
}
