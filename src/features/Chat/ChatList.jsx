import React, { useCallback, memo, useState } from 'react';
import { List, Divider, Box, IconButton, makeStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ChatDeletePrompt from '../../app/common/dialog/ChatDeletePrompt';
import ChatListItem from './ChatListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    '&:hover .icon': {
      opacity: 1,
      display: 'block',
    },
  },
  iconButton: {
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    bottom: 0,
    opacity: 0,
    display: 'none',
    transition: `all .3s ease-in-out`,
  },
}));

export default memo(function ChatList({ chatList }) {
  const classes = useStyles();
  const [deleteTarget, setDeleteTarget] = useState({ open: false, id: null });

  const handleTarget = useCallback(
    (id) => () => {
      setDeleteTarget({ open: true, id });
    },
    []
  );

  return (
    <Box>
      <List>
        {chatList.map((list, index) => (
          <div className={classes.root} key={list.id}>
            <ChatListItem list={list} />
            <Box className={`${classes.iconButton} icon`}>
              <IconButton onClick={handleTarget(list.id)}>
                <CancelIcon />
              </IconButton>
            </Box>
            {chatList.length - 1 !== index && <Divider variant='inset' component='li' />}
          </div>
        ))}
      </List>
      <ChatDeletePrompt deleteTarget={deleteTarget} setDeleteTarget={setDeleteTarget} />
    </Box>
  );
});
