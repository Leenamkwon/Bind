import React, { useCallback, useState, memo } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import cuid from 'cuid';

// COMPONENT
import { getFileExtension } from '../../../../app/util/util';
import ButtonComponent from '../../../../app/layout/ButtonComponent';
import PhotoDropzone from './PhotoDropzone';
import { PhotoCropper } from './PhotoCropper';
import { useSnackbar } from 'notistack';
import { uploadToGalleryFirebaseStorage } from '../../../../app/firestore/fireStorageService';
import { updateUserGalleryPhoto } from '../../../../app/firestore/firestoreService';

export default memo(function PhotoUpload({ setEditMode }) {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleCancelCrop = useCallback(() => {
    window.URL.revokeObjectURL(image[0].preview);
    setImage([]);
    setEditMode(false);
  }, [image, setEditMode]);

  const handleUploadImage = useCallback(() => {
    setLoading(true);
    const filename = cuid() + '.' + getFileExtension(image[0].path);
    const uploadTask = uploadToGalleryFirebaseStorage(uploadFile, filename);
    const unsubscribe = uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is' + progress + '% done');
      },
      (error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
      (complete) => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserGalleryPhoto(downloadURL, filename)
            .then(() => {
              setLoading(false);
              enqueueSnackbar('이미지가 업로드 되었습니다.', { variant: 'success' });
              unsubscribe();
              handleCancelCrop();
            })
            .catch((error) => {
              enqueueSnackbar(error.message, { variant: 'error' });
              setLoading(false);
            });
        });
      }
    );
  }, [enqueueSnackbar, handleCancelCrop, image, uploadFile]);

  return (
    <>
      <PhotoDropzone setImage={setImage} handleCancelCrop={handleCancelCrop} />
      <Box mt={4}>
        {image.length > 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Typography variant='subtitle1'>이미지를 원하는 사이즈로 잘라보세요</Typography>
              <PhotoCropper imagePreview={image?.[0]?.preview ?? null} setUploadFile={setUploadFile} />
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant='subtitle1'>미리 보기 & 업로드</Typography>
              <div className='img-preview' style={{ width: '100%', height: 400, overflow: 'hidden' }}></div>
              <Box display='flex' justifyContent='flex-end'>
                <ButtonComponent disabled={loading} onClick={() => handleCancelCrop()} variant='contained' content='취소' />
                <ButtonComponent
                  onClick={() => handleUploadImage()}
                  loading={loading}
                  disabled={loading}
                  color='primary'
                  variant='contained'
                  content='업로드'
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
});
