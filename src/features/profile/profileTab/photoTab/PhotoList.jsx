import React, { useMemo, memo } from 'react';
import { Box, GridList, GridListTile, GridListTileBar, useMediaQuery, useTheme } from '@material-ui/core';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import FaceIcon from '@material-ui/icons/Face';

import formatDate from '../../../../app/util/util';
import IconButtonComponent from '../../../../app/layout/IconButtonComponent';
import { userBackgroundUpdate, userProfilePhotoUpdate } from '../../../../app/firestore/firestoreService';

export default memo(function PhotoList({ photos, userIsMe, profile }) {
  const theme = useTheme();
  const xsMatches = useMediaQuery(theme.breakpoints.down('xs'));
  const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

  const gridColsResponsive = useMemo(() => {
    if (xsMatches) return 1;
    if (smMatches) return 2;
    if (mdMatches) return 4;
  }, [mdMatches, smMatches, xsMatches]);

  function handleProfilePhoto(url) {
    return userProfilePhotoUpdate(url);
  }

  function updateBackground(photoURL) {
    return userBackgroundUpdate(photoURL);
  }

  return (
    <GridList cellHeight={360} cols={gridColsResponsive}>
      {photos.map((photo) => (
        <GridListTile key={photo.url}>
          <img src={photo.url} alt={photo.name} />
          <GridListTileBar
            subtitle={formatDate(photo?.createdAt, 'yyyy년 MM월 dd일')}
            actionIcon={
              userIsMe && (
                <Box display='flex'>
                  <IconButtonComponent
                    disabled={profile.photoURL === photo.url}
                    handleClick={() => handleProfilePhoto(photo.url)}
                    TooltipContext='프로필 이미지'
                    size='small'
                    Icon={<FaceIcon />}
                  />
                  <IconButtonComponent
                    disabled={profile.backgroundURL === photo.url}
                    handleClick={() => updateBackground(photo.url)}
                    TooltipContext='배경 이미지'
                    size='small'
                    Icon={<ImageRoundedIcon />}
                  />
                </Box>
              )
            }
          />
        </GridListTile>
      ))}
    </GridList>
  );
});
