import React, { memo } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteEventInFireStore } from '../../firestore/firestoreService';
import { deleteSelectEvent } from '../../../features/events/eventActions';
import { useHistory } from 'react-router';

export default memo(function Prompt({ open, setOpen, eventId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClose = () => setOpen(false);

  const handleAccept = () => {
    deleteEventInFireStore(eventId).then((_) => {
      dispatch(deleteSelectEvent(eventId));
      setOpen(false);
      history.push('/events');
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'이벤트를 삭제하실건가요?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>이벤트를 삭제하시면 되돌릴 수 없습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            취소
          </Button>
          <Button onClick={handleAccept} color='primary' autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
