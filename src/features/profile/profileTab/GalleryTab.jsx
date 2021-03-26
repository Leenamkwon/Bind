import React, { memo, useState } from 'react';
import { Box } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENT
import PhotoUpload from './photoTab/PhotoUpload';
import PhotoList from './photoTab/PhotoList';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { listenToUserPhotos } from '../profileActions';
import { getUserPhotos } from '../../../app/firestore/firestoreService';
import PhotoListSkeleton from './photoTab/PhotoListSkeleton';
import IconButtonComponent from '../../../app/layout/IconButtonComponent';

export default memo(function GalleryTab(props) {
  const { value, index, userIsMe, profile } = props;
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);

  useFirestoreCollection({
    shouldExcute: photos.length === 0,
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      <Box p={1} style={{ minHeight: 400 }}>
        {userIsMe && (
          <Box display='flex' justifyContent='flex-end'>
            <IconButtonComponent
              type='linear'
              handleClick={() => setEditMode(!editMode)}
              TooltipContext='이미지 업로드'
              Icon={<PhotoCameraIcon />}
              color='primary'
            />
          </Box>
        )}
        {loading ? (
          <PhotoListSkeleton />
        ) : editMode ? (
          <PhotoUpload setEditMode={setEditMode} />
        ) : (
          <PhotoList photos={photos} userIsMe={userIsMe} profile={profile} />
        )}
      </Box>
    </div>
  );
});
