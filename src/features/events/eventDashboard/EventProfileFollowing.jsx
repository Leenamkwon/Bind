import React from 'react';
import { CardContent, Typography, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  followingContent: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export default function EventProfileFollowing() {
  const classes = useStyles();

  return (
    <CardContent className={classes.followingContent}>
      <div>
        <Typography variant='h6' component='h5' display='block'>
          팔로워
        </Typography>
        <Box />
        <Typography variant='subtitle1' display='block' align='center'>
          0
        </Typography>
      </div>
      <div>
        <Typography variant='h6' component='h5' display='block'>
          팔로잉
        </Typography>
        <Box />
        <Typography variant='subtitle1' display='block' align='center'>
          0
        </Typography>
      </div>
    </CardContent>
  );
}
