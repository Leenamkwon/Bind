import React, { useMemo, memo, useState } from 'react';
import {
  Box,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { ImageRounded, Face, Delete } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import formatDate from '../../../../app/util/util';
import IconButtonComponent from '../../../../app/layout/IconButtonComponent';
import { userBackgroundUpdate, userProfilePhotoUpdate } from '../../../../app/firestore/firestoreService';
import GalleryDelete from '../../../../app/common/dialog/GalleryDelete';

const useStyles = makeStyles(() => ({
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'none',
  },
  root: {
    '&:hover .MuiIconButton-root': {
      display: 'block',
    },
  },
}));

export default memo(function PhotoList({ photos, userIsMe, profile }) {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const xsMatches = useMediaQuery(theme.breakpoints.down('xs'));
  const smMatches = useMediaQuery(theme.breakpoints.down('sm'));
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

  const gridColsResponsive = useMemo(() => {
    if (xsMatches) return 1;
    if (smMatches) return 2;
    if (mdMatches) return 3;
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
        <GridListTile key={photo.url} className={classes.root}>
          <Link
            to={{
              pathname: `/gallery/${photo.id}`,
              state: { gallery: { ...location, profileId: profile.id } },
            }}
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            <img
              src={photo.url}
              alt={photo.name}
              loading='lazy'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Link>
          <GridListTileBar
            subtitle={formatDate(photo?.createdAt, 'yyyy년 MM월 dd일')}
            actionIcon={
              <Box display='flex'>
                {userIsMe && (
                  <>
                    <IconButtonComponent
                      type='async'
                      disabled={profile.photoURL === photo.url}
                      handleClick={() => handleProfilePhoto(photo.url)}
                      TooltipContext='프로필 이미지'
                      size='small'
                      Icon={<Face />}
                    />
                    <IconButtonComponent
                      type='async'
                      disabled={profile.backgroundURL === photo.url}
                      handleClick={() => updateBackground(photo.url)}
                      TooltipContext='배경 이미지'
                      size='small'
                      Icon={<ImageRounded />}
                    />
                  </>
                )}
              </Box>
            }
          />
          {userIsMe && (
            <IconButton
              onClick={() => setOpen(true)}
              color='primary'
              className={classes.deleteIcon}
              disabled={profile.photoURL === photo.url || profile.backgroundURL === photo.url}
            >
              <Delete size='small' />
            </IconButton>
          )}
          <GalleryDelete open={open} setOpen={setOpen} photo={photo} />
        </GridListTile>
      ))}
    </GridList>
  );
});
