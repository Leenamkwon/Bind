import React, { memo, useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { userBye } from '../../firestore/firebaseService';
import ButtonComponent from '../../layout/ButtonComponent';

export default memo(function AuthDelete({ open, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

  async function userDelete() {
    setLoading(true);
    try {
      await userBye();
      setLoading(false);
      enqueueSnackbar('회원을 탈퇴하였습니다.', { variant: 'success' });
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>정말 회원 탈퇴를 하실 건가요?</DialogTitle>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            취소
          </Button>
          <ButtonComponent
            disabled={loading}
            loading={loading}
            color='primary'
            type='button'
            content='회원 탈퇴'
            onClick={userDelete}
          />
        </DialogActions>
      </Dialog>
    </>
  );
});
