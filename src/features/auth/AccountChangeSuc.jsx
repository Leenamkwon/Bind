import React from 'react';
import { Box, CardMedia, Typography } from '@material-ui/core';

export default function AccountChangeSuc() {
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
      <Typography variant='subtitle2'>많은 활동 부탁드려요 - 남권</Typography>
    </Box>
  );
}
