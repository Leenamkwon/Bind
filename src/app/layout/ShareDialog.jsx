import React, { memo } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Facebook, Email, Reddit, Twitter, FileCopy } from '@material-ui/icons';
import { EmailShareButton, FacebookShareButton, RedditShareButton, TwitterShareButton } from 'react-share';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';

const share = [
  { Component: FacebookShareButton, Icon: Facebook, title: '페이스북', color: '#4267B2' },
  { Component: RedditShareButton, Icon: Reddit, title: '레딧', color: '#FF4500' },
  { Component: TwitterShareButton, Icon: Twitter, title: '트위터', color: '#1DA1F2' },
  { Component: EmailShareButton, Icon: Email, title: '메일', color: 'unset' },
];

const useStyles = makeStyles(() => ({
  socialButton: { display: 'flex', alignItems: 'center' },
  socialIcon: { fontSize: 25, marginRight: 5 },
}));

export default memo(function ShareDialog({ open = true, onClose, eventId }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const url = `${window.location.origin}/events/${eventId}`;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id='simple-dialog-title'>공유</DialogTitle>
      <Box p={2}>
        <Box display='flex' justifyContent='space-between' width='100%'>
          {share.map((social) => (
            <Box px={1} key={social.title}>
              <social.Component className={classes.socialButton} url={url}>
                {<social.Icon className={classes.socialIcon} style={{ color: social.color }} />}
                <Typography variant='subtitle2'>{social.title}</Typography>
              </social.Component>
            </Box>
          ))}
        </Box>
        <OutlinedInput
          style={{ marginTop: 10 }}
          value={url}
          disabled={true}
          fullWidth
          endAdornment={
            <CopyToClipboard text={url} onCopy={() => enqueueSnackbar('복사 완료!', { variant: 'default' })}>
              <InputAdornment position='end'>
                <IconButton edge='end'>{<FileCopy />}</IconButton>
              </InputAdornment>
            </CopyToClipboard>
          }
        />
      </Box>
    </Dialog>
  );
});
