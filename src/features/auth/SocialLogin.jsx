import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { modalClose } from '../../app/common/modal/modalReducer';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    textTransform: 'none',
    margin: '5px 0',
  },
}));

export default function SocialLogin() {
  const classes = useStyles();
  const dispatch = useDispatch();

  function handleSocialLogin(provider) {
    dispatch(modalClose());
  }

  return (
    <>
      <Button
        className={classes.button}
        startIcon={<i className='fab fa-facebook'></i>}
        style={{ backgroundColor: '#4267B2' }}
        variant='contained'
        size='large'
        color='inherit'
      >
        Login with Facebook
      </Button>
      <Button
        className={classes.button}
        startIcon={<i className='fab fa-google'></i>}
        style={{ backgroundColor: '#FF0000' }}
        variant='contained'
        size='large'
        color='inherit'
      >
        Login with Google
      </Button>
      <Button
        className={classes.button}
        startIcon={<i className='fab fa-github'></i>}
        style={{ backgroundColor: '#333' }}
        variant='contained'
        size='large'
        color='inherit'
      >
        Login with Github
      </Button>
    </>
  );
}
