import React, { memo } from 'react';
import EventListItem from './EventListItem';
import { Grid } from '@material-ui/core';

export default memo(function EventList() {
  return (
    <Grid container>
      <EventListItem />
      <EventListItem />
    </Grid>
  );
});
