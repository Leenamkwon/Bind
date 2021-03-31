import React, { useCallback } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Box, Typography } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ChatList({ chatList }) {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();
  const matchParams = location.pathname.split('/').filter((x) => x)[1];

  const anotherUser = useCallback(
    (list) => {
      return list.filter((item) => item.id !== currentUser.uid)[0];
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
                <Avatar src={anotherUser(list.chatUsers).photoURL || null} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant='subtitle1' color='textPrimary'>
                    {anotherUser(list.chatUsers).displayName}
                  </Typography>
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
}

// async function testChat() {
//   try {
//     createChat(
//       {
//         id: 'T0F7ZpMIbORSJWZLiTdloGFk2Pl1',
//         displayName: '이남권',
//         photoURL:
//           'https://firebasestorage.googleapis.com/v0/b/bind-5d6a6.appspot.com/o/T0F7ZpMIbORSJWZLiTdloGFk2Pl1%2Fuser_image%2Fckmo08lwq00003f6ai0qijvmu.jpg?alt=media&token=9051e31b-b035-44b4-9ede-44715d1dcdf0',
//       },
//       history
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }
