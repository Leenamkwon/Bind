import React from 'react';
import { AppBar, Button, makeStyles, Toolbar, IconButton, Box, Hidden } from '@material-ui/core';
import DonutSmallOutlinedIcon from '@material-ui/icons/DonutSmall';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import HomeIcon from '@material-ui/icons/Home';

import { Link, useLocation } from 'react-router-dom';
import SignedInMenu from './SignedInMenu';
import { useDispatch, useSelector } from 'react-redux';
import { DARK_MODE, LIGHT_MODE } from '../../app/store/themeReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  toolBar: {
    width: '1280px',
    justifyContent: 'space-between !important',
  },
  tabs: {
    position: 'relative',
    '& .indicator': {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#fafafa',
    },
  },
  title: {
    flexGrow: 1,
  },
  rightButtonSection: {
    display: 'flex',
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isThemeMode } = useSelector((state) => state.theme);

  function changeTheme() {
    if (isThemeMode === 'dark') {
      localStorage.setItem('theme', 'light');
      dispatch({ type: LIGHT_MODE });
    } else {
      localStorage.setItem('theme', 'dark');
      dispatch({ type: DARK_MODE });
    }
  }

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolBar} position='static'>
        <Hidden smDown>
          <Box className={classes.tabs}>
            <Button variant='text' startIcon={<HomeIcon />} color='inherit'>
              홈
            </Button>
            {pathname === '/events' && <div className='indicator' aria-label='indicator'></div>}
          </Box>
        </Hidden>

        <IconButton aria-label='logo button' color='inherit' component={Link} to='/events'>
          <DonutSmallOutlinedIcon size='large' />
        </IconButton>

        <Box className={classes.rightButtonSection}>
          <SignedInMenu />
          {/* Theme Mode Change */}
          <Hidden smDown>
            <IconButton color='inherit' onClick={changeTheme}>
              {isThemeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
