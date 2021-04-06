import React, { useCallback, useEffect, useLayoutEffect, useRef, memo } from 'react';
import { Avatar, Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import ChatLogForm from './ChatLogForm';
import { useDispatch, useSelector } from 'react-redux';

import { getChatMessageList, particapateChat } from '../../app/firestore/firebaseRealChat';
import { fetchChatMessageList } from './chatAction';
import formatDate from '../../app/util/util';
import { firebaseObjectToArray } from '../../app/firestore/firebaseEventChat';

const useStyles = makeStyles(() => ({
  root: { display: 'flex', height: '88vh', flexDirection: 'column', justifyContent: 'space-between' },
  ul: {
    overflowY: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    padding: 10,
  },
  li: { display: 'flex', margin: '5px 5px 0 5px' },
  avatar: ({ matchesXS }) => ({
    width: matchesXS ? 30 : 40,
    height: matchesXS ? 30 : 40,
  }),
}));

export default memo(function ChatLogList({ match }) {
  const history = useHistory();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles(matchesXS);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { chatMessageLog } = useSelector((state) => state.chat);
  const containerEl = useRef();

  useLayoutEffect(() => {
    async function participate(id, type) {
      await particapateChat(id, type, history);
    }
    participate(match.params.id, 'participate');

    return () => participate(match.params.id, 'chat-out');
  }, [match.params.id, history]);

  useEffect(() => {
    const unsubscribe = getChatMessageList(match.params.id).on('value', (snapshot) => {
      dispatch(fetchChatMessageList(firebaseObjectToArray(snapshot.val())));
    });

    return () => {
      getChatMessageList(match.params.id).off('value', unsubscribe);
    };
  }, [dispatch, match.params.id]);

  const lastNode = useCallback((node) => {
    if (!node || !containerEl.current) return;
    containerEl.current.scroll({
      top: node.offsetTop,
    });
  }, []);

  return (
    <Box className={classes.root}>
      <ul ref={containerEl} className={classes.ul}>
        {chatMessageLog?.map((message, i) => (
          <li
            ref={chatMessageLog.length - 1 === i ? (node) => lastNode(node) : null}
            className={classes.li}
            key={i}
            style={{ flexDirection: currentUser.uid !== message.uid ? 'row' : 'row-reverse' }}
          >
            {currentUser.uid !== message.uid && (
              <Avatar src={message.photoURL} className={classes.avatar} component={Link} to={`/profile/${message.uid}`} />
            )}

            <Box display='flex' flexDirection='column' ml={1}>
              {currentUser.uid !== message.uid && (
                <Typography color='textSecondary' variant='subtitle2'>
                  {message.displayName}
                </Typography>
              )}
              <Box
                display='inline-block'
                borderRadius={10}
                p={1}
                bgcolor={currentUser.uid !== message.uid ? 'background.default' : 'success.main'}
                alignSelf={currentUser.uid !== message.uid ? 'flex-start' : 'flex-end'}
              >
                <Typography variant='subtitle1' component='p' color='textPrimary' display='block'>
                  {message.text.split('\n').map((chatTxt, i) => (
                    <span key={i}>
                      {chatTxt}
                      <br />
                    </span>
                  ))}
                </Typography>
              </Box>
              <Typography
                display='block'
                variant='caption'
                color='textSecondary'
                align={currentUser.uid !== message.uid ? 'right' : 'left'}
              >
                {formatDate(message.createdAt, 'M월d일 hh:mm aaa')}
              </Typography>
            </Box>
          </li>
        ))}
      </ul>
      <Box p={1} width='100%'>
        <ChatLogForm chatId={match.params.id} />
      </Box>
    </Box>
  );
});
