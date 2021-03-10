import React from 'react';
import {
  makeStyles,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  CardHeader,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <Card raised={true}>
      <CardHeader title={<div>이벤트 참가자</div>} />
      <Divider />
      <List className={classes.root}>
        <ListItem alignItems='center'>
          <ListItemAvatar>
            <IconButton size='small'>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
            </IconButton>
          </ListItemAvatar>
          <ListItemText primary='이남권' />
        </ListItem>
        <Divider variant='inset' component='li' />
      </List>
    </Card>
  );
}
