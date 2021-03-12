import React from 'react';
import { makeStyles, Card, CardContent, Typography, Avatar, CardActions, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import EventProfileFollowing from './EventProfileFollowing';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  details: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  avatar: {
    width: 150,
    height: 150,
    border: `2px solid ${theme.palette.primary.main}`,
    margin: '0 auto',
  },
}));

export default function EventProfile() {
  const classes = useStyles();
  const { currentUserProfile } = useSelector((state) => state.profile);

  return (
    <Card className={classes.root} raised={true}>
      <div className={classes.details}>
        <CardActions>
          <Avatar className={classes.avatar} src={currentUserProfile.photoURL || null} />
        </CardActions>
        <CardContent className={classes.content}>
          <Typography component='h5' variant='h5' align='center'>
            {currentUserProfile.displayName}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary' align='center'>
            {currentUserProfile.email}
          </Typography>
        </CardContent>

        <Divider />

        {/* EVENT FOLLOWING */}
        <EventProfileFollowing />
      </div>
    </Card>
  );
}
