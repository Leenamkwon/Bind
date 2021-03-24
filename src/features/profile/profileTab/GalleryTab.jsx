import React, { memo, useState } from 'react';
import { Box, Button, GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core';
import PhotoUpload from './photoTab/PhotoUpload';

export default memo(function GalleryTab(props) {
  const { value, index, userIsMe, profile } = props;
  const [editMode, setEditMode] = useState(false);

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      <Box mt={2} p={3} style={{ minHeight: 400 }}>
        {userIsMe && (
          <Button variant='outlined' color='primary' onClick={() => setEditMode(!editMode)}>
            이미지 올리기
          </Button>
        )}
        {editMode ? (
          <PhotoUpload setEditMode={setEditMode} />
        ) : (
          <GridList cellHeight={180} style={{ width: '100%' }}>
            <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
              <ListSubheader component='div'>December</ListSubheader>
            </GridListTile>
          </GridList>
        )}
      </Box>
    </div>
  );
});
