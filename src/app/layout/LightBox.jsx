import React, { memo } from 'react';
import { Avatar, Box, Card, CardHeader, CardMedia, Dialog, IconButton, makeStyles, Typography } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, LocationOn } from '@material-ui/icons';
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
    // transform: 'translateY(-50%)',
  },
  left: {
    left: '0',
  },
  right: {
    right: '0',
  },
  icon: {
    marginRight: 5,
  },
});

export default memo(function LightBox() {
  const classes = useStyles();
  // const location = useLocation();
  let history = useHistory();
  let { id } = useParams();
  const { events } = useSelector((state) => state.event);
  const currentIdx = events.findIndex((item) => item.id === id);
  // const eventsLength = events.length - 1;

  let back = () => {
    history.push('/events');
  };

  if (!events[currentIdx] || currentIdx === -1) return <Redirect to='/error' />;

  return (
    <Dialog fullWidth={true} maxWidth='lg' onClose={back} open={true}>
      <Card>
        <CardMedia
          className={classes.media}
          image={events[currentIdx].thumbnailURL || `/assets/categoryImages/${events[currentIdx].category}.jpg`}
        />
        <CardHeader
          avatar={
            <Avatar
              component={Link}
              to={`/profile/${events[currentIdx].hostUid}`}
              src={events[currentIdx].hostPhotoURL || null}
              aria-label='recipe'
            />
          }
          title={<Typography variant='subtitle1'>{events[currentIdx].title}</Typography>}
          subheader={
            <>
              <Box display='flex' alignItems='center'>
                <LocationOn className={classes.icon} />
                <Typography variant='subtitle2' color='textSecondary'>
                  {events[currentIdx].city.address}
                </Typography>
              </Box>
            </>
          }
        />

        {/* <IconButton
          component={Link}
          to={{
            pathname: `/img/${events[currentIdx - 1]?.id}`,
            state: { background: { ...location } },
          }}
          className={clsx(classes.button, classes.left)}
          disabled={currentIdx === 0}
        >
          <ArrowBackIos color={currentIdx === 0 ? 'disabled' : 'inherit'} />
        </IconButton>
        <IconButton
          component={Link}
          to={{
            pathname: `/img/${events[currentIdx + 1]?.id}`,
            state: { background: { ...location } },
          }}
          className={clsx(classes.button, classes.right)}
          disabled={currentIdx === eventsLength}
        >
          <ArrowForwardIos color={currentIdx === eventsLength ? 'disabled' : 'inherit'} />
        </IconButton> */}
      </Card>
    </Dialog>
  );
});
