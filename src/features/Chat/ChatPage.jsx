import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ChatList from './ChatList';
import { Route } from 'react-router';
import ChatLogPage from './ChatLogPage';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '88vh',
  },
  rootItem: {
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ChatPage() {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.rootItem} style={{ overflowY: 'scroll' }} item sm={4}>
        <ChatList />
      </Grid>
      <Grid className={classes.rootItem} item sm={8}>
        <Route exact path='/chat/:id' component={ChatLogPage} />
      </Grid>
    </Grid>
  );
}
