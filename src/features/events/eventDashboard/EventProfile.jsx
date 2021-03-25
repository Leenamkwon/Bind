import React from 'react';
import { makeStyles, Card, CardContent, Typography, Avatar, CardActions, Divider } from '@material-ui/core';

// COMPONENT
import EventProfileFollowing from './EventProfileFollowing';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    position: 'sticky',
    top: 80,
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

export default function EventProfile({ currentUserProfile }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} raised={true}>
      <div className={classes.details}>
        <CardActions>
          <Avatar
            className={classes.avatar}
            src={currentUserProfile?.photoURL || null}
            component={Link}
            to={`/profile/${currentUserProfile?.id}`}
          />
        </CardActions>
        <CardContent className={classes.content}>
          <Typography variant='h6' align='center'>
            {currentUserProfile?.displayName || currentUserProfile?.email || ''}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary' align='center'>
            {currentUserProfile?.email || null}
          </Typography>
        </CardContent>

        <Divider />

        {/* EVENT FOLLOWING */}
        {currentUserProfile && <EventProfileFollowing />}
      </div>
    </Card>
  );
}
