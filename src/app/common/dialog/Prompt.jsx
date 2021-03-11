import React, { memo } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default memo(function Prompt({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const handleAccept = () => setOpen(false);

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
