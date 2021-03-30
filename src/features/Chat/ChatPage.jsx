import React from 'react';
import { Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { Route, useLocation } from 'react-router';
import ChatList from './ChatList';
import ChatLogPage from './ChatLogPage';

const useStyles = makeStyles((theme) => ({
  rootItem: {
    height: '88vh',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ChatPage() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const isChat = location.pathname.split('/').filter((x) => x)[1];

  return (
    <Grid container>
      {matchesXS && !isChat && (
        <Grid className={classes.rootItem} style={{ overflowY: 'scroll' }} item xs={12} sm={12} md={4}>
          <ChatList />
        </Grid>
      )}
      {!matchesXS && (
        <Grid
          className={classes.rootItem}
          style={{ overflowY: 'scroll', borderRight: `1px solid ${theme.palette.divider}` }}
          item
          md={4}
        >
          <ChatList />
        </Grid>
      )}

      <Grid className={classes.rootItem} item xs={12} sm={12} md={8}>
        <Route exact path='/chat/:id' component={ChatLogPage} key={location.key} />
      </Grid>
    </Grid>
  );
}
