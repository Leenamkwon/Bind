import React from 'react';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
  },
}));

export default function LoadingComponent({ theme }) {
  const classes = useStyles(theme);

  return (
    <Backdrop
      className={classes.backdrop}
      style={{ color: theme.palette.primary.main, backgroundColor: theme.palette.background.default }}
      open={true}
    >
      <CircularProgress style={{ color: theme.palette.primary.main }} />
    </Backdrop>
  );
}
