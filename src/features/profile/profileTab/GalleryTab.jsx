import React, { memo, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';

// COMPONENT
import PhotoDropzone from './photoTab/PhotoDropzone';
import { PhotoCropper } from './photoTab/PhotoCropper';

export default memo(function GalleryTab(props) {
  const { value, index } = props;
  const [image, setImage] = useState(null);

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box mt={2} p={3}>
          <PhotoDropzone setImage={setImage} />
          <Box mt={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <Typography variant='subtitle1'>Cropper</Typography>
                <PhotoCropper imagePreview={image?.[0]?.preview ?? null} />
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant='subtitle1'>미리 보기</Typography>
                <div className='img-preview' style={{ width: '100%', height: 400, overflow: 'hidden' }}></div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </div>
  );
});
