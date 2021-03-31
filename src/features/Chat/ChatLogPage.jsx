import React, { useLayoutEffect, useRef } from 'react';
import { Avatar, Box, ListSubheader, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ChatLogForm from './ChatLogForm';
import { useDispatch, useSelector } from 'react-redux';

import { getChatMessageList } from '../../app/firestore/firebaseRealChat';
import useFirestoreCollection from '../../app/hooks/useFirestoreCollection';
import { fetchChatMessageList } from './chatAction';
import formatDate from '../../app/util/util';

const useStyles = makeStyles(() => ({
  root: { display: 'flex', height: '88vh', flexDirection: 'column', justifyContent: 'space-between' },
  ul: {
    overflowY: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  li: { display: 'flex', margin: '5px 5px 0 5px' },
  avatar: ({ matchesXS }) => ({
    width: matchesXS ? 30 : 40,
    height: matchesXS ? 30 : 40,
  }),
}));

export default function ChatLogPage({ match }) {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles(matchesXS);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { chatMessageLog } = useSelector((state) => state.chat);
  const containerEl = useRef();

  useLayoutEffect(() => {}, []);

  useFirestoreCollection({
    query: () => getChatMessageList(match.params.id),
    data: (data) => dispatch(fetchChatMessageList(data)),
    deps: [dispatch, match.params.id],
  });

  function lastNode(node) {
    if (!node || !containerEl.current) return;
    containerEl.current.scroll({
      top: node.offsetTop,
    });
  }

  return (
    <Box className={classes.root}>
      <ul ref={containerEl} className={classes.ul}>
        <ListSubheader disableGutters>
          <Box py={1} style={{ backgroundColor: theme.palette.background.default, opacity: 0.8 }}>
            <Typography variant='subtitle1' align='center' color='textPrimary'>
              이승후
            </Typography>
          </Box>
        </ListSubheader>

        {chatMessageLog.map((message, i) => (
          <li
            ref={chatMessageLog.length - 1 === i ? (node) => lastNode(node) : null}
            className={classes.li}
            key={i}
            style={{ flexDirection: currentUser.uid !== message.uid ? 'row' : 'row-reverse' }}
          >
            {currentUser.uid !== message.uid && (
              <Avatar className={classes.avatar} component={Link} to={`/profile/${message.uid}`} />
            )}

            <Box display='inline' ml={1}>
              {currentUser.uid !== message.uid && (
                <Typography color='textSecondary' variant='subtitle2'>
                  {message.displayName}
                </Typography>
              )}
              <Box
                borderRadius={10}
                p={1}
                mt={1}
                bgcolor={currentUser.uid !== message.uid ? 'background.default' : 'success.main'}
              >
                <Typography
                  align={currentUser.uid !== message.uid ? 'left' : 'right'}
                  variant='subtitle1'
                  color='textPrimary'
                >
                  {message.text}
                </Typography>
              </Box>
              <Typography variant='caption' color='textSecondary'>
                {formatDate(message.createdAt, 'HH:MM')}
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
}
