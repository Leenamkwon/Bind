import React, { memo } from 'react';
import { CircularProgress, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    display: 'inline-block',
  },
  button: {
    width: '100%',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default memo(function ButtonComponent({ loading, content, css, ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper} style={css || {}}>
      <Button className={classes.button} {...props}>
        {content}
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} color='primary' />}
    </div>
  );
});
