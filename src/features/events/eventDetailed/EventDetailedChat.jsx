import React from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import EventDetailedChatForm from './EventDetailedChatForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  nested: {
    paddingLeft: theme.spacing(4),
    width: '100%',
    display: 'block',
  },
}));

export default function EventDetailedChat() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <List disablePadding>
        <ListItem alignItems='center'>
          <ListItemAvatar>
            <IconButton size='small'>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            style={{ display: 'block' }}
            primary={
              <>
                <Typography component='span' variant='body2' className={classes.inline} color='textSecondary'>
                  이남권
                </Typography>{' '}
                <Typography component='span' variant='caption' color='textSecondary'>{`2021-03-10`}</Typography>
              </>
            }
            secondary={
              <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                to Scott, Alex, Jennifer
              </Typography>
            }
          />
        </ListItem>

        <List disablePadding className={classes.nested}>
          <ListItem alignItems='center' disableGutters>
            <ListItemAvatar>
              <IconButton size='small'>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography component='span' variant='body2' className={classes.inline} color='textSecondary'>
                    이남권
                  </Typography>{' '}
                  <Typography component='span' variant='caption' color='textSecondary'>{`2021-03-10`}</Typography>
                </>
              }
              secondary={
                <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                  to Scott, Alex, Jennifer
                </Typography>
              }
            />
          </ListItem>
          <EventDetailedChatForm parentId={1} />
          {/* Nested 2nd */}
          <ListItem alignItems='center' disableGutters>
            <ListItemAvatar>
              <IconButton size='small'>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography component='span' variant='body2' className={classes.inline} color='textSecondary'>
                    트레비스 스캇
                  </Typography>{' '}
                  <Typography component='span' variant='caption' color='textSecondary'>{`2021-03-10`}</Typography>
                </>
              }
              secondary={
                <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                  스캇!
                </Typography>
              }
            />
          </ListItem>
        </List>
      </List>
      <Divider />
      <List disablePadding>
        <ListItem alignItems='center'>
          <ListItemAvatar>
            <IconButton size='small'>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography component='span' variant='body2' className={classes.inline} color='textSecondary'>
                  이남권
                </Typography>{' '}
                <Typography component='span' variant='caption' color='textSecondary'>{`2021-03-10`}</Typography>
              </>
            }
            secondary={
              <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                to Scott, Alex, Jennifer
              </Typography>
            }
          />
        </ListItem>
      </List>
    </List>
  );
}
