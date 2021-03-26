import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { formatDateDistance } from '../../app/util/util';

export default function NotificationList({ notification }) {
  let Summary;

  switch (notification.code) {
    case 'like':
      Summary = `${(<Link to={`/events/${notification.eventId}`}>이벤트</Link>)}에 좋아요를 눌렀습니다.`;
      break;
    case 'join-event':
      Summary = `${(<Link to={`/events/${notification.eventId}`}>이벤트</Link>)}에 참가했습니다.`;
      break;
    case 'left-event':
      Summary = `${(<Link to={`/events/${notification.eventId}`}>이벤트</Link>)}를 떠났습니다.`;
      break;
    case 'follow':
      Summary = '팔로워를 하였습니다.';
      break;
    case 'unfollow':
      Summary = '언팔로우를 하였습니다.';
      break;
    default:
      Summary = '알림이 없습니다.';
      break;
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
              {`${notification.displayName}님이 ${Summary}`}
            </Typography>
          }
          secondary={<Typography variant='caption'>{formatDateDistance(notification.date)}</Typography>}
        />
        <ListItemSecondaryAction>
          <IconButton size='small' color='inherit'>
            <HighlightOffRoundedIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider component='li' light={true} variant='middle' />
    </>
  );
}

// {
//   userUid: user.id,
//   code,
//   eventId,
//   photoURL: user.photoURL,
//   displayName: user.displayName,
//   date: realDB.ServerValue.TIMESTAMP,
//   isChecked: false,
// };
