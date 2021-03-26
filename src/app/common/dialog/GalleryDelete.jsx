import React, { memo, useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { deleteFromGalleryFirebaseStorage, deleteGalleryFromCollection } from '../../firestore/fireStorageService';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    display: 'inline-block',
  },
  button: {
    width: '100%',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default memo(function GalleryDelete({ open, setOpen, photo }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const deletePhoto = async () => {
    try {
      setLoading(true);
      await deleteGalleryFromCollection(photo.id);
      await deleteFromGalleryFirebaseStorage(photo.fileName);
      enqueueSnackbar('사진이 삭제되었습니다', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>사진을 삭제하실건가요?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>사진을 삭제하시면 되돌릴 수 없습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading} color='primary'>
            취소
          </Button>
          <div className={classes.wrapper} disabled={loading}>
            <Button onClick={deletePhoto} color='primary'>
              삭제
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} color='primary' />}
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
});
