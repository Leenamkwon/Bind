import React, { useState, memo, useCallback } from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography, IconButton, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

// COMPONENT
import { formatDateDistance } from '../../../app/util/util';
import EventDetailedChatForm from './EventDetailedChatForm';
import { deleteChatComment } from '../../../app/firestore/firebaseEventChat';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default memo(function EventDetailedChildChat({ childChat, eventId, chatId, currentUser }) {
  const classes = useStyles();
  const [reply, setReply] = useState({ target: null, open: false, type: 'write', text: '' });

  const deleteChat = useCallback(
    (eventId, childChat) => async () => {
      try {
        await deleteChatComment(eventId, childChat);
      } catch (error) {}
    },
    []
  );

  return (
    <div key={childChat.id}>
      <ListItem alignItems='center' disableGutters style={{ padding: 0 }}>
        <ListItemAvatar component={Link} to={`/profile/${childChat.uid}`}>
          <IconButton>
            <Avatar className={classes.small} src={childChat?.photoURL ?? null} alt={childChat.displayName} />
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography component='span' variant='body2' color='textPrimary' display='inline'>
                {childChat.displayName}
              </Typography>{' '}
              <Typography component='span' variant='caption' color='textSecondary'>
                {formatDateDistance(childChat.date) + ' 전'}
              </Typography>
            </>
          }
          secondary={
            <>
              {childChat.isUpdate && <em style={{ marginRight: 10 }}>수정됨</em>}
              <Typography component='span' variant='body2' display='inline' color='textPrimary'>
                {childChat.text.split('\n').map((childcomment, i) => (
                  <span key={i}>
                    {childcomment}
                    <br />
                  </span>
                ))}
              </Typography>
              <Typography
                variant='caption'
                display='inline'
                onClick={() => setReply({ open: true, target: childChat.id, type: 'write', text: '' })}
              >
                답글
              </Typography>
              {childChat.uid === currentUser.uid && (
                <>
                  <Typography
                    variant='caption'
                    display='inline'
                    style={{ margin: '0 5px' }}
                    onClick={() => setReply({ open: true, target: childChat.id, type: 'edit', text: childChat.text })}
                  >
                    수정
                  </Typography>
                  <Typography variant='caption' display='inline' onClick={deleteChat(eventId, childChat)}>
                    삭제
                  </Typography>
                </>
              )}
            </>
          }
        />
      </ListItem>
      {reply.open && reply.target === childChat.id && (
        <ListItem>
          <EventDetailedChatForm eventId={eventId} parentId={chatId} reply={reply} setReply={setReply} />
        </ListItem>
      )}
    </div>
  );
});
