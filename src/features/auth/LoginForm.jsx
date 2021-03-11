import React from 'react';
import { Box, Card, Hidden, Typography, Link as MuiLink } from '@material-ui/core';
import { DonutSmall } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose, modalOpen } from '../../app/common/modal/modalReducer';
import ModalWrapper from '../../app/common/modal/ModalWrapper';
import LoginFormText from './LoginFormText';

const image = [
  '/assets/modal/modal1.jpg',
  '/assets/modal/modal2.jpg',
  '/assets/modal/modal3.jpg',
  '/assets/modal/modal4.jpg',
  '/assets/modal/modal5.jpg',
  '/assets/modal/modal6.jpg',
];

export default function LoginForm() {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.modal);

  function handleClose() {
    dispatch(modalClose());
  }

  return (
    <ModalWrapper open={open} onClose={handleClose} maxWidth='md'>
      <Card style={{ height: 800 }}>
        <Box display='flex' style={{ height: '100%' }}>
          <Hidden smDown>
            <Box width='45%'>
              <img
                src={image[Math.floor(Math.random() * image.length)]}
                alt='asd'
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          </Hidden>
          <Box flexGrow={1} display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center'>
            <Box mt={4} display='flex' alignItems='center' flexDirection='column'>
              <DonutSmall style={{ fontSize: 60 }} color='primary' />
              <Typography variant='h5' component='h4'>
                로그인
              </Typography>
              <Typography variant='subtitle2' component='h4'>
                반가워요
              </Typography>
            </Box>
            {/* FORM  */}
            <LoginFormText />
            <Typography color='textSecondary'>
              계정이 없으신가요?{' '}
              <MuiLink component='button' onClick={() => dispatch(modalOpen('RegisterForm'))}>
                Join
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Card>
    </ModalWrapper>
  );
}
