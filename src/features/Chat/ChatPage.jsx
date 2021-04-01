import React, { useEffect, useMemo, useState } from 'react';
import { Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENT
import ChatList from './ChatList';
import ChatLogPage from './ChatLogPage';
import { getChatList } from '../../app/firestore/firebaseRealChat';
import { fetchChatList2 } from './chatAction';
import { dataFromSnapshot } from '../../app/firestore/firestoreService';
import PrivateRoute from '../../app/layout/PrivateRoute';

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
  const dispatch = useDispatch();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));
  const { chatList } = useSelector((state) => state.chat);
  const isChat = useMemo(() => location.pathname.split('/').filter((x) => x)[1], [location.pathname]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const unsubsribe = getChatList().onSnapshot(
      (snapshot) => {
        const EventsData = snapshot.docs?.map(dataFromSnapshot);
        dispatch(fetchChatList2(EventsData));
        setInitialLoading(false);
      },
      (error) => {}
    );

    return unsubsribe;
  }, [dispatch]);

  if (initialLoading) return <div></div>;

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
        <PrivateRoute exact path='/chat/:id' component={ChatLogPage} key={location.key} />
      </Grid>
    </Grid>
  );
}
