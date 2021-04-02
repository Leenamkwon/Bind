import React, { useCallback, memo, useMemo } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Box, Typography, Badge } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import formatDate from '../../app/util/util';

export default memo(function ChatList({ chatList }) {
  const location = useLocation();
  const matchParams = useMemo(() => location.pathname.split('/').filter((x) => x)[1], [location.pathname]);
  const { currentUser } = useSelector((state) => state.auth);

  const anotherUser = useCallback(
    (list) => {
      const anotherUser = list.filter((item) => item.id !== currentUser.uid)[0];
      return anotherUser;
    },
    [currentUser.uid]
  );

  const BadgeCount = useCallback(
    (list) => {
      return list.find((user) => user.id === currentUser.uid);
    },
    [currentUser.uid]
  );

  return (
    <Box>
      <List>
        {chatList.map((list, index) => (
          <div key={list.id}>
            <ListItem
              button
              alignItems='flex-start'
              component={Link}
              to={`/chat/${list.id}`}
              selected={matchParams === list.id}
            >
              <ListItemAvatar>
                <Badge badgeContent={BadgeCount(list.chatUsers).isRead} color='error'>
                  <Avatar src={anotherUser(list.chatUsers).photoURL || null} />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1' color='textPrimary'>
                      {anotherUser(list.chatUsers).displayName}
                    </Typography>
                    <Typography variant='caption' color='textSecondary'>
                      {formatDate(list?.lastMessageTime ?? new Date())}
                    </Typography>
                  </Box>
                }
                secondary={<React.Fragment>{list?.lastMessage}</React.Fragment>}
              />
            </ListItem>
            {chatList.length - 1 !== index && <Divider variant='inset' component='li' />}
          </div>
        ))}
      </List>
    </Box>
  );
});
