import React, { useState, useRef, useEffect, useCallback } from 'react';
import { makeStyles, Tooltip, CircularProgress, Fab } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    display: 'inline-block',
  },
  fabProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
}));

export default function CircularIntegration({
  type = 'async',
  Icon,
  size,
  TooltipContext,
  handleClick,
  disabled = false,
  ...rest
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const timer = useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      setLoading(true);
      await handleClick();
      setLoading(false);
      setSuccess(true);
      enqueueSnackbar('이미지 업데이트가 완료되었습니다.', { variant: 'success' });
      timer.current = window.setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      setLoading(false);
    }
  }, [enqueueSnackbar, handleClick]);

  return (
    <Tooltip title={`${TooltipContext}`} arrow placement='top'>
      <div className={classes.wrapper}>
        <Fab
          aria-label='save'
          className={buttonClassname}
          disabled={loading || disabled}
          size={size}
          onClick={type === 'async' ? handleButtonClick : handleClick}
          {...rest}
        >
          {success ? <CheckIcon /> : Icon}
        </Fab>
        {loading && <CircularProgress size={40} className={classes.fabProgress} />}
      </div>
    </Tooltip>
  );
}
