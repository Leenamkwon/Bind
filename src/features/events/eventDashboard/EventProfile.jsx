import React, { memo } from 'react';
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
    top: 100,
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

export default memo(function EventProfile({ profile }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} raised={true}>
      <div className={classes.details}>
        <CardActions>
          <Avatar
            className={classes.avatar}
            src={profile?.photoURL || null}
            component={Link}
            to={profile?.id && `/profile/${profile?.id}`}
          />
        </CardActions>
        <CardContent className={classes.content}>
          <Typography variant='h6' align='center'>
            {profile?.displayName || profile?.email || '회원가입을 하여 이용해보세요'}
          </Typography>
          <Typography variant='subtitle2' color='textSecondary' align='center'>
            {profile?.email || null}
          </Typography>
        </CardContent>

        <Divider />

        {/* EVENT FOLLOWING */}
        {profile && <EventProfileFollowing profile={profile} />}
      </div>
    </Card>
  );
});
