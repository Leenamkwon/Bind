import React, { memo, useCallback, useState } from 'react';
import { Button, DialogActions, DialogContent, DialogContentText, Typography } from '@material-ui/core';
import PromptWrapper from './PromptWrapper';
import { deleteChatComment } from '../../firestore/firebaseEventChat';
import { useSnackbar } from 'notistack';

export default memo(function EventChatDelete({ eventId, childChat }) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteChat = useCallback(async () => {
    try {
      setOpen(false);
      await deleteChatComment(eventId, childChat);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [childChat, enqueueSnackbar, eventId]);

  return (
    <>
      <Typography variant='caption' display='inline' onClick={handleClickOpen}>
        삭제
      </Typography>
      <PromptWrapper open={open} handleClose={handleClose}>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>댓글을 삭제하실 건가요?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            취소
          </Button>
          <Button onClick={deleteChat} color='primary' autoFocus>
            삭제
          </Button>
        </DialogActions>
      </PromptWrapper>
    </>
  );
});
