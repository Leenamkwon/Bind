import React, { useState } from 'react';
import Notification from './Notification';
import { Avatar, makeStyles, Menu, MenuItem, ListItemIcon, ListItemText, Box, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { useLocation } from 'react-router';

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

export default function SignedInMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { pathname } = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(pathname);

  return (
    <Box>
      <Notification />
      <IconButton onClick={handleClick}>
        <Avatar src='/assets/user.png' className={classes.avatar} aria-controls='avatar' aria-haspopup='true' />
      </IconButton>
      <Menu
        className={classes.menu}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        keepMounted
        id='customized-menu'
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem selected={pathname === '/events'}>
          <ListItemIcon>
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText primary='이벤트 올리기' />
        </MenuItem>
        <MenuItem selected={pathname === '/profile'}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary='프로필' />
        </MenuItem>
        <MenuItem selected={pathname === '/account'}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='계정 설정' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary='로그아웃' />
        </MenuItem>
      </Menu>
    </Box>
  );
}
