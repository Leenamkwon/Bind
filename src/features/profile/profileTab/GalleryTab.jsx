import { Box, Typography } from '@material-ui/core';
import React from 'react';

export default function GalleryTab(props) {
  const { value, index } = props;

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box p={3}>
          <Typography>asdasdasd</Typography>
        </Box>
      )}
    </div>
  );
}
