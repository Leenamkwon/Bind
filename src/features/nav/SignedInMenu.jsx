import React, { useEffect, useState, memo } from 'react';
import { Avatar, makeStyles, Menu, MenuItem, ListItemIcon, ListItemText, Box, IconButton, Badge } from '@material-ui/core';
import { AccountCircle, Settings, ExitToApp, EventAvailable, NotificationImportant, Chat } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

// COMPONENT
import Notification from './Notification';
import { signOutFirebase } from '../../app/firestore/firebaseService';
import UserSearch from './UserSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menu: {
    top: '40px !important',
  },
  avatar: {
    cursor: 'pointer',
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default memo(function SignedInMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUserProfile } = useSelector((state) => state.profile);
  const { notification } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      handleClose();
      await signOutFirebase();
      history.push('/events');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    handleClose();
  }, [pathname]);

  if (!currentUserProfile) return null;

  return (
    <Box display='flex' alignItems='center'>
      <UserSearch />
      <Notification />
      <IconButton onClick={handleClick}>
        <Avatar
          src={currentUserProfile?.photoURL || null}
          className={classes.avatar}
          aria-controls='avatar'
          aria-haspopup='true'
        />
      </IconButton>
      <Menu
        className={classes.menu}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        id='customized-menu'
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem selected={pathname === '/createEvent'} component={NavLink} to='/createEvent'>
          <ListItemIcon>
            <EventAvailable />
          </ListItemIcon>
          <ListItemText primary='이벤트 작성하기' />
        </MenuItem>

        <MenuItem selected={pathname === '/profile'} component={NavLink} to={`/profile/${currentUserProfile.id}`}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary='프로필' />
        </MenuItem>

        <MenuItem selected={pathname === '/notification'} component={NavLink} to='/notification'>
          <ListItemIcon>
            <Badge badgeContent={notification && notification?.length} color='error'>
              <NotificationImportant />
            </Badge>
          </ListItemIcon>
          <ListItemText primary='알림' />
        </MenuItem>

        <MenuItem selected={pathname === '/chat'} component={NavLink} to='/chat'>
          <ListItemIcon>
            <Badge badgeContent={notification && notification?.length} color='error'>
              <Chat />
            </Badge>
          </ListItemIcon>
          <ListItemText primary='채팅' />
        </MenuItem>

        <MenuItem selected={pathname === '/account'} component={NavLink} to='/account'>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary='계정 설정' />
        </MenuItem>

        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary='로그아웃' />
        </MenuItem>
      </Menu>
    </Box>
  );
});
