import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Typography, Avatar, makeStyles, Divider, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));

export default function NotificationList() {
  const classes = useStyles();

  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography>
              이남권님이 <Link style={{ cursor: 'pointer' }}>쿠팡가즈아</Link> 좋아요를 눌렀습니다.
            </Typography>
          }
          secondary={
            <>
              <Typography component='span' variant='caption' className={classes.inline} color='textSecondary'>
                1hours ago...
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider component='li' light={true} variant='middle' />
    </>
  );
}
