import React, { memo } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export default memo(function NotificationSkeleton() {
  return (
    <List style={{ height: 380 }}>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Skeleton variant='circle' width={45} height={45} />
        </ListItemAvatar>
        <ListItemText primary={<Skeleton width='50%' />} secondary={<Skeleton width='10%' />} />
      </ListItem>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Skeleton variant='circle' width={45} height={45} />
        </ListItemAvatar>
        <ListItemText primary={<Skeleton width='50%' />} secondary={<Skeleton width='10%' />} />
      </ListItem>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Skeleton variant='circle' width={45} height={45} />
        </ListItemAvatar>
        <ListItemText primary={<Skeleton width='50%' />} secondary={<Skeleton width='10%' />} />
      </ListItem>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Skeleton variant='circle' width={45} height={45} />
        </ListItemAvatar>
        <ListItemText primary={<Skeleton width='50%' />} secondary={<Skeleton width='10%' />} />
      </ListItem>
    </List>
  );
});
