import React from 'react';
import { CardContent, Typography, Box, makeStyles, GridList, GridListTile, Divider } from '@material-ui/core';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getUserPhotosLimit } from '../../../app/firestore/firestoreService';
import { listenToUserPhotos } from '../../profile/profileActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  followingContent: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export default function EventProfileFollowing({ profile }) {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.profile);
  const classes = useStyles();

  useFirestoreCollection({
    query: () => getUserPhotosLimit(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  return (
    <>
      <CardContent className={classes.followingContent}>
        <div>
          <Typography variant='h6' component='h5' display='block'>
            팔로워
          </Typography>
          <Box />
          <Typography variant='subtitle1' display='block' align='center'>
            {profile?.followerCount ?? 0}
          </Typography>
        </div>
        <div>
          <Typography variant='h6' component='h5' display='block'>
            팔로잉
          </Typography>
          <Box />
          <Typography variant='subtitle1' display='block' align='center'>
            {profile?.followingCount ?? 0}
          </Typography>
        </div>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant='subtitle2' color='textSecondary' gutterBottom>
          갤러리
        </Typography>
        <GridList cellHeight={80} cols={3}>
          {photos.map((photo) => (
            <GridListTile key={photo.url}>
              <img src={photo.url} alt={photo.name} loading='lazy' />
            </GridListTile>
          ))}
        </GridList>
      </CardContent>
    </>
  );
}
