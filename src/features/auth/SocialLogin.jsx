import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { modalClose } from '../../app/common/modal/modalReducer';
import { socialLoginFirebase } from '../../app/firestore/firebaseService';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
    textTransform: 'none',
    margin: '5px 0',
  },
}));

export default function SocialLogin({ register = false }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSocialLogin(provider) {
    try {
      await socialLoginFirebase(provider);
      dispatch(modalClose());
    } catch (error) {
      enqueueSnackbar('이미 동일한 이메일이 존재합니다', { variant: 'error' });
    }
  }

  return (
    <>
      <Button
        className={classes.button}
        onClick={() => handleSocialLogin('facebook')}
        startIcon={<i className='fab fa-facebook'></i>}
        style={{ backgroundColor: '#4267B2' }}
        variant='contained'
        size='large'
        color='inherit'
      >
        {register ? 'Register with Facebook' : 'Login with Facebook'}
      </Button>
      <Button
        className={classes.button}
        onClick={() => handleSocialLogin('google')}
        startIcon={<i className='fab fa-google'></i>}
        style={{ backgroundColor: '#FF0000' }}
        variant='contained'
        size='large'
        color='inherit'
      >
        {register ? 'Register with Google' : 'Login with Google'}
      </Button>
      <Button
        className={classes.button}
        onClick={() => handleSocialLogin('github')}
        startIcon={<i className='fab fa-github'></i>}
        style={{ backgroundColor: '#333' }}
        variant='contained'
        size='large'
        color='inherit'
      >
        {register ? 'Register with Github' : 'Login with Github'}
      </Button>
    </>
  );
}
