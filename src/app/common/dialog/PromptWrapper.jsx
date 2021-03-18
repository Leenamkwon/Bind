import React from 'react';
import { Dialog } from '@material-ui/core';

export default function ChatPrompt({ open, handleClose, children }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {children}
    </Dialog>
  );
}
