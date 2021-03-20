import React from 'react';
import { AppBar, Button, makeStyles, Toolbar, IconButton, Box, Hidden } from '@material-ui/core';
import { DonutSmall, Brightness4, Brightness7, Home } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

// COMPONENT
import { DARK_MODE, LIGHT_MODE } from '../../app/store/themeReducer';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

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
  const { isThemeMode } = useSelector((state) => state.theme);
  const { authenticated } = useSelector((state) => state.auth);
  const { initialized } = useSelector((state) => state.async);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

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
        <Hidden mdDown>
          <Box className={classes.tabs} display='flex'>
            <Button variant='text' startIcon={<Home />} color='inherit'>
              홈{pathname === '/events' && <div className='indicator' aria-label='indicator'></div>}
            </Button>
          </Box>
        </Hidden>

        <IconButton aria-label='logo button' color='inherit' component={Link} to='/events'>
          <DonutSmall size='large' />
        </IconButton>

        <Box className={classes.rightButtonSection}>
          {authenticated && initialized && <SignedInMenu />}
          {!authenticated && initialized && <SignedOutMenu />}
          <Hidden xsDown>
            <IconButton color='inherit' onClick={changeTheme}>
              {isThemeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
