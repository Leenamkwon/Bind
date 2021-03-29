import React from 'react';
import {
  Link as MuiLink,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { formatDateDistance } from '../../app/util/util';
import { checkedNotification } from '../../app/firestore/firebaseNotification';

export default function NotificationList({ notification }) {
  function render() {
    switch (notification.code) {
      case 'like':
        return (
          <>
            <MuiLink component={Link} to={`/events/${notification.eventId}`}>
              이벤트
            </MuiLink>
            에 좋아요를 보냈습니다.
          </>
        );

      case 'event-join':
        return (
          <>
            <MuiLink component={Link} to={`/events/${notification.eventId}`}>
              이벤트
            </MuiLink>
            에 참가했습니다.
          </>
        );

      case 'event-out':
        return (
          <>
            <MuiLink component={Link} to={`/events/${notification.eventId}`}>
              이벤트
            </MuiLink>
            를 떠났습니다.
          </>
        );

      case 'my-event-joined':
        return (
          <>
            <MuiLink component={Link} to={`/events/${notification.eventId}`}>
              이벤트
            </MuiLink>
            에 참가했습니다.
          </>
        );

      case 'follow':
        return '팔로워를 하였습니다.';

      case 'unfollow':
        return '언팔로우를 하였습니다.';

      default:
        return '알림이 없습니다.';
    }
  }

  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar component={Link} to={`/profile/${notification.userUid}`} src={notification.photoURL || null} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant='body2' color='textSecondary' gutterBottom>
              {`${notification.displayName}님이`} {render()}
            </Typography>
          }
          secondary={<Typography variant='caption'>{formatDateDistance(notification.date) + ' 전'}</Typography>}
        />
        <ListItemSecondaryAction>
          <Tooltip title='읽음 표시 하기' arrow placement='top'>
            <div>
              <IconButton
                disabled={notification.isChecked}
                size='small'
                color='inherit'
                onClick={() => checkedNotification(notification.id)}
              >
                <HighlightOffRoundedIcon />
              </IconButton>
            </div>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider component='li' light={true} variant='middle' />
    </>
  );
}
