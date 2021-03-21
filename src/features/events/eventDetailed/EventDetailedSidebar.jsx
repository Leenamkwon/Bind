import React, { memo } from 'react';
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
import { Link } from 'react-router-dom';

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

  return (
    <Card raised={true}>
      <CardHeader title={<Typography variant='h4'>이벤트 참가자</Typography>} />
      <Divider />
      <List className={classes.root}>
        {event.attendees.map((attendee) => (
          <div key={attendee.id}>
            <ListItem alignItems='center'>
              <ListItemAvatar>
                <IconButton size='small' component={Link} to={`/profile/${attendee.id}`}>
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
