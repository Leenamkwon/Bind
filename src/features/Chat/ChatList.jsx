import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function ChatList() {
  return (
    <Box>
      <List>
        {new Array(30).fill(false).map((_, i) => (
          <div key={i}>
            <ListItem button alignItems='flex-start' component={Link} to='/chat/dasdad'>
              <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant='subtitle1' color='textPrimary'>
                    이남권
                  </Typography>
                }
                secondary={<React.Fragment>{"I'll be in your neighborhood doing errands this…"}</React.Fragment>}
              />
            </ListItem>
            <Divider variant='inset' component='li' />
          </div>
        ))}
      </List>
    </Box>
  );
}
