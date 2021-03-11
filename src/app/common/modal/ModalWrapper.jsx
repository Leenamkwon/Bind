import React from 'react';
import { Dialog } from '@material-ui/core';

export default function ModalWrapper({ children, open = false, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth='lg'>
      {children}
    </Dialog>
  );
}
