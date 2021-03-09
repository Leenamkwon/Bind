import React from 'react';
import { CircularProgress, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    display: 'inline-block',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ButtonComponent({ loading, content, ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button {...props}>{content}</Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} color='primary' />}
    </div>
  );
}