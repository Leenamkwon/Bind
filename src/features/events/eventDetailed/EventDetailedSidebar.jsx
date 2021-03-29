import React, { memo, useCallback } from 'react';
import {
  makeStyles,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  CardHeader,
  IconButton,
  fade,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  cardHeader: {
    padding: theme.spacing(1),
  },
  inline: {
    display: 'inline',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.15),
    },
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}));

export default memo(function AlignItemsList({ event }) {
  const classes = useStyles();
  const history = useHistory();
  const { authenticated } = useSelector((state) => state.auth);

  const goUserProfile = useCallback(
    (attendeeId) => () => {
      if (!authenticated) return history.push('/login');

      history.push(`/profile/${attendeeId}`);
    },
    [authenticated, history]
  );

  return (
    <Card raised={true}>
      <CardHeader title={<Typography variant='h6'>이벤트 참가자</Typography>} />
      <Divider />
      <List className={classes.root}>
        {event.attendees.map((attendee) => (
          <div key={attendee.id}>
            <ListItem alignItems='center'>
              <ListItemAvatar>
                <IconButton size='small' onClick={goUserProfile(attendee.id)}>
                  <Avatar alt={attendee.displayName} src={attendee.photoURL || null} />
                </IconButton>
              </ListItemAvatar>
              <ListItemText primary={attendee.displayName || attendee.email} />
            </ListItem>
            <Divider variant='inset' component='li' />
          </div>
        ))}
      </List>
    </Card>
  );
});
