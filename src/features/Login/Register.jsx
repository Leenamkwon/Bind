import React from 'react';
import { Box, Hidden, Typography, Link as MuiLink } from '@material-ui/core';
import { DonutSmall } from '@material-ui/icons';
import modalImages from '../../app/api/modalImage';
import RegisterFormText from '../auth/RegisterFormText';

export default function Register({ setIsLogin }) {
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
            가입하기
          </Typography>
          <Typography variant='subtitle2' component='h4'>
            반가워요
          </Typography>
        </Box>
        {/* FORM  */}
        <RegisterFormText type='route' />
        <Typography variant='subtitle2' color='textSecondary'>
          <MuiLink component='button' onClick={() => setIsLogin(true)}>
            로그인 하기
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}
