import React from 'react';
import { Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { Route, useLocation } from 'react-router';
import ChatList from './ChatList';
import ChatLogPage from './ChatLogPage';
import useFirestoreCollection from '../../app/hooks/useFirestoreCollection';
import { getChatList } from '../../app/firestore/firebaseRealChat';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatList2 } from './chatAction';

const useStyles = makeStyles((theme) => ({
  rootItem: {
    height: '88vh',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ChatPage() {
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { chatList } = useSelector((state) => state.chat);
  const isChat = location.pathname.split('/').filter((x) => x)[1];

  useFirestoreCollection({
    query: () => getChatList(),
    data: (data) => dispatch(fetchChatList2(data)),
    deps: [location.pathname],
  });

  return (
    <Grid container>
      {matchesXS && !isChat && (
        <Grid className={classes.rootItem} style={{ overflowY: 'scroll' }} item xs={12} sm={12} md={4}>
          <ChatList chatList={chatList} />
        </Grid>
      )}
      {!matchesXS && (
        <Grid
          className={classes.rootItem}
          style={{ overflowY: 'scroll', borderRight: `1px solid ${theme.palette.divider}` }}
          item
          md={4}
        >
          <ChatList chatList={chatList} />
        </Grid>
      )}

      <Grid className={classes.rootItem} item xs={12} sm={12} md={8}>
        <Route exact path='/chat/:id' component={ChatLogPage} key={location.key} />
      </Grid>
    </Grid>
  );
}
