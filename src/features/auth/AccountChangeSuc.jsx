import React from 'react';
import { Box, Button, CardMedia, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { modalOpen } from '../../app/common/modal/modalReducer';

export default function AccountChangeSuc() {
  const dispatch = useDispatch();

  function handleLogin() {
    dispatch(modalOpen('LoginForm'));
  }

  return (
    <Box display='flex' alignItems='center' flexDirection='column'>
      <CardMedia
        style={{ width: '300px', objectFit: 'cover', marginBottom: 30 }}
        image='/assets/svgImages/well-done.svg'
        component='img'
        alt='채팅을 해보세요!'
      />
      <Typography variant='subtitle1' paragraph>
        업데이트가 완료되었습니다!
      </Typography>
      <Typography variant='subtitle2'>
        계속 활동을 원하시면{' '}
        <Button color='primary' variant='contained' size='small' onClick={handleLogin}>
          로그인
        </Button>{' '}
        해주세요.
      </Typography>
    </Box>
  );
}
