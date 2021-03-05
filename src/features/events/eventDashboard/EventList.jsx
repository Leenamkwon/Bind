import React from 'react';
import EventListItem from './EventListItem';
import { Grid } from '@material-ui/core';

export default function EventList() {
  return (
    <Grid container>
      <EventListItem />
      <EventListItem />
    </Grid>
  );
}
