import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { outChatList } from '../../firestore/firebaseRealChat';
import { useHistory } from 'react-router';

export default function ChatDeletePrompt({ deleteTarget, setDeleteTarget }) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => setDeleteTarget({ open: false, id: null });

  const handleAccept = () => {
    outChatList(deleteTarget.id)
      .then((_) => {
        setDeleteTarget({ open: false, id: null });
        history.push('/chat');
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  return (
    <Dialog
      open={deleteTarget.open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>채팅을 삭제하실건가요?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>채팅을 삭제하시면 되돌릴 수 없습니다.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          취소
        </Button>
        <Button onClick={handleAccept} color='primary'>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}
