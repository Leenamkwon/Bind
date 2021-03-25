import React, { memo, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENT
import PhotoUpload from './photoTab/PhotoUpload';
import PhotoList from './photoTab/PhotoList';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { listenToUserPhotos } from '../profileActions';
import { getUserPhotos } from '../../../app/firestore/firestoreService';

export default memo(function GalleryTab(props) {
  const { value, index, userIsMe, profile } = props;
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      <Box mt={2} p={3} style={{ minHeight: 400 }}>
        {userIsMe && (
          <Button variant='outlined' color='primary' onClick={() => setEditMode(!editMode)}>
            이미지 올리기
          </Button>
        )}
        {loading ? (
          <div></div>
        ) : editMode ? (
          <PhotoUpload setEditMode={setEditMode} />
        ) : (
          <PhotoList photos={photos} userIsMe={userIsMe} profile={profile} />
        )}
      </Box>
    </div>
  );
});
