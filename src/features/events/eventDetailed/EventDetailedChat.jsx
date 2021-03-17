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
import EventDetailedChatForm from './EventDetailedChatForm';
import { firebaseObjectToArray, getEventChatRef } from '../../../app/firestore/firebaseEventChat';
import { useDispatch, useSelector } from 'react-redux';
import { listenToEventChat } from '../eventActions';
import { formatDateDistance, makeChatTree } from '../../../app/util/util';
import { Link } from 'react-router-dom';

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

export default memo(function EventDetailedChat({ eventId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event);
  const { currentUser } = useSelector((state) => state.auth);
  const [reply, setReply] = useState({ open: false, target: null, type: null });
  const chatContainer = useRef(null);

  useEffect(() => {
    const unsubscribe = getEventChatRef(eventId).on('value', (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val())));
    });

    return () => {
      getEventChatRef(eventId).off('value', unsubscribe);
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
      {makeChatTree(comments)
        .reverse()
        .map((chat) => (
          <List key={chat.id} disablePadding>
            <ListItem alignItems='center'>
              <ListItemAvatar>
                <IconButton size='small' component={Link} to={`/profile/${chat?.uid}`}>
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
                    <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                      {chat.text.split('\n').map((chatTxt, i) => (
                        <span key={i}>
                          {chatTxt}
                          <br />
                        </span>
                      ))}
                    </Typography>
                    <Typography variant='caption' display='inline' onClick={() => setReply({ open: true, target: chat.id })}>
                      답글
                    </Typography>
                    {chat.uid === currentUser.uid && (
                      <>
                        <Typography variant='caption' display='inline' style={{ margin: '0 5px' }}>
                          삭제
                        </Typography>
                        <Typography variant='caption' display='inline'>
                          수정
                        </Typography>
                      </>
                    )}
                  </>
                }
              />
            </ListItem>
            {reply.open && reply.target === chat.id && (
              <ListItem>
                <EventDetailedChatForm eventId={eventId} parentId={chat.id} setReply={setReply} />
              </ListItem>
            )}

            {/* event chat child */}
            <Divider />
          </List>
        ))}
    </List>
  );
});

{
  /* <List disablePadding>
        <ListItem alignItems='center'>
          <ListItemAvatar>
            <IconButton size='small'>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            style={{ display: 'block' }}
            primary={
              <>
                <Typography component='span' variant='body2' className={classes.inline} color='textSecondary'>
                  이남권
                </Typography>{' '}
                <Typography component='span' variant='caption' color='textSecondary'>{`2021-03-10`}</Typography>
              </>
            }
            secondary={
              <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                to Scott, Alex, Jennifer
              </Typography>
            }
          />
        </ListItem>

        <List disablePadding className={classes.nested}>
          <ListItem alignItems='center' disableGutters>
            <ListItemAvatar>
              <IconButton size='small'>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography component='span' variant='body2' className={classes.inline} color='textSecondary'>
                    이남권
                  </Typography>{' '}
                  <Typography component='span' variant='caption' color='textSecondary'>{`2021-03-10`}</Typography>
                </>
              }
              secondary={
                <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                  to Scott, Alex, Jennifer
                </Typography>
              }
            />
          </ListItem>
          <EventDetailedChatForm parentId={1} />
          <ListItem alignItems='center' disableGutters>
            <ListItemAvatar>
              <IconButton size='small'>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography component='span' variant='body2' className={classes.inline} color='textSecondary'>
                    트레비스 스캇
                  </Typography>{' '}
                  <Typography component='span' variant='caption' color='textSecondary'>{`2021-03-10`}</Typography>
                </>
              }
              secondary={
                <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                  스캇!
                </Typography>
              }
            />
          </ListItem>
        </List>
      </List> */
}
