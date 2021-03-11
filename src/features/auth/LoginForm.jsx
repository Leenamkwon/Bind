import React from 'react';
import { Box, Card } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../../app/common/modal/ModalWrapper';
import { modalClose } from '../../app/common/modal/modalReducer';

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
      <Card style={{ height: 700 }}>
        <Box display='flex'>
          <Box width='45%'>
            <img src={image[Math.floor(Math.random() * image.length)]} alt='asd' style={{ width: '100%', height: '100%' }} />
          </Box>
          <Box>dasdasdasd</Box>
        </Box>
      </Card>
    </ModalWrapper>
  );
}
