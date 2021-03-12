import React, { useEffect, useState, memo } from 'react';
import Notification from './Notification';
import { Avatar, makeStyles, Menu, MenuItem, ListItemIcon, ListItemText, Box, IconButton } from '@material-ui/core';
import { AccountCircle, Settings, ExitToApp, EventAvailable } from '@material-ui/icons';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// COMPONENT
import { signOutFirebase } from '../../app/firestore/firebaseService';
import { useSelector } from 'react-redux';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUserProfile } = useSelector((state) => state.profile);
  const classes = useStyles();
  const { pathname } = useLocation();
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
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    handleClose();
  }, [pathname]);

  return (
    <Box>
      <Notification />
      <IconButton onClick={handleClick}>
        <Avatar
          src={currentUserProfile.photoURL || null}
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

        <MenuItem selected={pathname === '/profile'}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary='프로필' />
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
