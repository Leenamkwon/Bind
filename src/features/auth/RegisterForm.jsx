import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../../app/common/modal/ModalWrapper';
import { modalClose } from '../../app/common/modal/modalReducer';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.modal);

  function handleClose() {
    dispatch(modalClose());
  }

  return (
    <ModalWrapper open={open} onClose={handleClose} maxWidth='md'>
      <div style={{ width: 500, height: 300, backgroundColor: 'red' }}>dasdasdas</div>;
    </ModalWrapper>
  );
}
