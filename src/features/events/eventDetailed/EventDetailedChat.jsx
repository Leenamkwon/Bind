import React, { useEffect, memo, useState, useRef } from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// COMPONENT
import EventDetailedChatForm from './EventDetailedChatForm';
import { firebaseObjectToArray, getEventChatRef } from '../../../app/firestore/firebaseEventChat';
import { clearEventChat, listenToEventChat } from '../eventActions';
import { formatDateDistance, makeChatTree } from '../../../app/util/util';
import EventDetailedChildChat from './EventDetailedChildChat';
import EventChatDelete from '../../../app/common/dialog/EventChatDelete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  nested: {
    paddingLeft: theme.spacing(4),
    width: '100%',
    display: 'block',
  },
}));

export default memo(function EventDetailedChat({ eventId, sort }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event);
  const { currentUser } = useSelector((state) => state.auth);
  const [reply, setReply] = useState({ target: null, open: false, type: 'write', text: '' });
  const chatContainer = useRef(null);

  useEffect(() => {
    const unsubscribe = getEventChatRef(eventId).on('value', (snapshot) => {
      dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val())));
    });

    return () => {
      getEventChatRef(eventId).off('value', unsubscribe);
      dispatch(clearEventChat());
    };
  }, [dispatch, eventId]);

  useEffect(() => {
    const outsideClose = (e) => {
      if (reply.open && reply.target !== null && !chatContainer.current.contains(e.target)) {
        setReply({ isEdit: false, target: null });
      }
    };
    window.addEventListener('click', outsideClose);

    return () => window.removeEventListener('click', outsideClose);
  }, [reply]);

  return (
    <List className={classes.root} ref={chatContainer}>
      {makeChatTree(sort, comments).map((chat) => (
        <List key={chat.id} disablePadding>
          <ListItem alignItems='center'>
            <ListItemAvatar>
              <IconButton size='small' component={Link} to={`/profile/${chat.uid}`}>
                <Avatar alt={chat.displayName} src={chat?.photoURL ?? null} />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography component='span' variant='body1' className={classes.inline} color='textPrimary'>
                    {chat.displayName}
                  </Typography>{' '}
                  <Typography component='span' variant='caption' color='textSecondary'>
                    {formatDateDistance(chat.date) + ' 전'}
                  </Typography>
                </>
              }
              secondary={
                <>
                  {chat.isUpdate && <em style={{ marginRight: 10 }}>수정됨</em>}
                  <Typography component='span' variant='body2' display='inline' color='textPrimary'>
                    {chat.text.split('\n').map((chatTxt, i) => (
                      <span key={i}>
                        {chatTxt}
                        <br />
                      </span>
                    ))}
                  </Typography>
                  <Typography
                    variant='caption'
                    display='inline'
                    onClick={() => setReply({ open: true, target: chat.id, type: 'write', text: '' })}
                  >
                    답글
                  </Typography>
                  {chat.uid === currentUser.uid && (
                    <>
                      <Typography
                        variant='caption'
                        display='inline'
                        style={{ margin: '0 5px' }}
                        onClick={() => setReply({ open: true, target: chat.id, type: 'edit', text: chat.text })}
                      >
                        수정
                      </Typography>
                      <EventChatDelete eventId={eventId} childChat={chat} />
                    </>
                  )}
                </>
              }
            />
          </ListItem>
          {reply.open && reply.target === chat.id && (
            <ListItem>
              <EventDetailedChatForm eventId={eventId} parentId={chat.id} reply={reply} setReply={setReply} />
            </ListItem>
          )}
          {/* event chat child */}
          {chat.childNodes.length > 0 && (
            <List disablePadding className={classes.nested}>
              {chat.childNodes.map((childChat) => {
                return (
                  <EventDetailedChildChat
                    childChat={childChat}
                    eventId={eventId}
                    chatId={chat.id}
                    currentUser={currentUser}
                    key={childChat.id}
                  />
                );
              })}
            </List>
          )}
          <Divider />
        </List>
      ))}
    </List>
  );
});
