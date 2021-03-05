import React, { useState } from 'react';
import { Badge, IconButton, Menu, List, makeStyles } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationList from './NotificationList';

const useStyles = makeStyles((theme) => ({
  menu: {
    top: '40px !important',
  },
  listRoot: {
    width: '100%',
    maxWidth: '30ch',
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
  },
}));

export default function Notification() {
  const [invisible, setInvisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color='inherit'>
        <Badge color='error' badgeContent={1} invisible={false}>
          <NotificationsIcon onClick={handleClick} />
        </Badge>
        <Menu
          className={classes.menu}
          onClose={handleClose}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          keepMounted
          id='simple-menu'
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <List className={classes.listRoot}>
            <NotificationList />
            <NotificationList />
            <NotificationList />
            <NotificationList />
            <NotificationList />
            <NotificationList />
          </List>
        </Menu>
      </IconButton>
    </>
  );
}
