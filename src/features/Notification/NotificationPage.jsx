import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
  Link as MuiLink,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Badge,
} from '@material-ui/core';
import { HighlightOffRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FixedSizeList } from 'react-window';

// COMPONENT
import { firebaseObjectToArray } from '../../app/firestore/firebaseEventChat';
import { checkedNotification, getNotificationCollctionAll } from '../../app/firestore/firebaseNotification';
import { formatDateDistance } from '../../app/util/util';
import { listenToAllNotification } from '../auth/authAction';
import NotificationSkeleton from './NotificationSkeleton';

export default function NotificationPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUser, AllNotification } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) return;
    setLoading(true);
    const unsubscribe = getNotificationCollctionAll(currentUser).on('value', (snapshot) => {
      if (!snapshot.exists()) return setLoading(false);
      const filtering = firebaseObjectToArray(snapshot.val()).reverse();
      dispatch(listenToAllNotification(filtering));
      setLoading(false);
    });

    return () => getNotificationCollctionAll(currentUser).off('value', unsubscribe);
  }, [AllNotification.length, currentUser, dispatch]);

  return (
    <Card raised>
      <CardHeader title='알림' />
      <Divider />
      <CardContent>
        {loading && !AllNotification.length ? (
          <NotificationSkeleton />
        ) : (
          <FixedSizeList height={380} itemSize={70} itemData={AllNotification} itemCount={AllNotification.length}>
            {renderRow}
          </FixedSizeList>
        )}
      </CardContent>
    </Card>
  );
}

function renderRow(props) {
  const { data, index, style } = props;

  function render() {
    switch (data[index].code) {
      case 'like':
        return (
          <>
            <MuiLink component={Link} to={`/events/${data[index].eventId}`}>
              이벤트
            </MuiLink>
            에 좋아요를 보냈습니다.
          </>
        );

      case 'event-join':
        return (
          <>
            <MuiLink component={Link} to={`/events/${data[index].eventId}`}>
              이벤트
            </MuiLink>
            에 참가했습니다.
          </>
        );

      case 'event-out':
        return (
          <>
            <MuiLink component={Link} to={`/events/${data[index].eventId}`}>
              이벤트
            </MuiLink>
            를 떠났습니다.
          </>
        );

      case 'my-event-joined':
        return (
          <>
            <MuiLink component={Link} to={`/events/${data[index].eventId}`}>
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
    <ListItem style={style} key={data[index].id} alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar component={Link} to={`/profile/${data[index].userUid}`} src={data[index]?.photoURL || null} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Badge
            color='error'
            variant='dot'
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            invisible={data[index].isChecked}
          >
            <Typography variant='body2' color='textSecondary' gutterBottom>
              {`${data[index].displayName}님이`} {render()}
            </Typography>
          </Badge>
        }
        secondary={<Typography variant='caption'>{formatDateDistance(data[index].date) + ' 전'}</Typography>}
      />
      <Tooltip title='읽음 표시 하기' placement='top' arrow>
        <div>
          <IconButton
            disabled={data[index].isChecked}
            size='small'
            color='inherit'
            onClick={() => checkedNotification(data[index].id)}
          >
            <HighlightOffRounded />
          </IconButton>
        </div>
      </Tooltip>
    </ListItem>
  );
}
