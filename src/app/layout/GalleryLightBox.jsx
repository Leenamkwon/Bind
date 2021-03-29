import React, { memo } from 'react';
import { Card, CardMedia, Dialog, IconButton, makeStyles } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { Redirect, useHistory, useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  media: {
    minHeight: 190,
    paddingTop: '56.25%', // 16:9
  },
  button: {
    position: 'absolute',
    top: '0%',
  },
  left: {
    left: '0',
  },
  right: {
    right: '0',
  },
});

export default memo(function GalleryLightBox() {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();
  const location = useLocation();
  const { photos } = useSelector((state) => state.profile);
  const currentIdx = photos.findIndex((item) => item.id === id);
  const photosLength = photos.length - 1;

  let back = () => {
    history.push(`/profile/${location.state.gallery.profileId}`);
  };

  if (!photos[currentIdx] || currentIdx === -1) return <Redirect to='/error' />;

  return (
    <Dialog fullWidth={true} maxWidth='lg' onClose={back} open={true}>
      <Card>
        <CardMedia className={classes.media} image={photos[currentIdx].url} />

        <IconButton
          component={Link}
          to={{
            pathname: `/gallery/${photos[currentIdx - 1]?.id}`,
            state: { gallery: { ...location, profileId: location.state.gallery.profileId } },
          }}
          className={clsx(classes.button, classes.left)}
          disabled={currentIdx === 0}
        >
          <ArrowBackIos color={currentIdx === 0 ? 'disabled' : 'inherit'} />
        </IconButton>
        <IconButton
          component={Link}
          to={{
            pathname: `/gallery/${photos[currentIdx + 1]?.id}`,
            state: { gallery: { ...location, profileId: location.state.gallery.profileId } },
          }}
          className={clsx(classes.button, classes.right)}
          disabled={currentIdx === photosLength}
        >
          <ArrowForwardIos color={currentIdx === photosLength ? 'disabled' : 'inherit'} />
        </IconButton>
      </Card>
    </Dialog>
  );
});
