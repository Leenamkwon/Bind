import React, { useEffect, useState } from 'react';
import { Badge, IconButton, Menu, List, makeStyles, ListItem, ListItemText } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENT
import { getNotificationCollction } from '../../app/firestore/firebaseNotification';
import NotificationList from './NotificationList';
import { firebaseObjectToArray } from '../../app/firestore/firebaseEventChat';
import { listenToNotification } from '../auth/authAction';

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
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { currentUser, notification } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = getNotificationCollction(currentUser).on('value', (snapshot) => {
      if (!snapshot.exists()) return;
      const filtering = firebaseObjectToArray(snapshot.val())
        .filter((item) => !item.isChecked)
        .reverse();
      dispatch(listenToNotification(filtering));
    });

    return () => getNotificationCollction(currentUser).off('value', unsubscribe);
  }, [currentUser, dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color='inherit'>
        <Badge color='error' badgeContent={notification.length} invisible={notification.length === 0}>
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
            {notification.length > 0 ? (
              notification.map((notice, i) => <NotificationList notification={notice} key={i} />)
            ) : (
              <ListItem>
                <ListItemText id='switch-list-label-bluetooth' primary='알림이 없습니다.' />
              </ListItem>
            )}
          </List>
        </Menu>
      </IconButton>
    </>
  );
}
