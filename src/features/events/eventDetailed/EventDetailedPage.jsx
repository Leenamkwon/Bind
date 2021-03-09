import React from 'react';
import { Grid } from '@material-ui/core';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedSidebar from './EventDetailedSidebar';

export default function EventDetailedPage() {
  return (
    <Grid container spacing={2}>
      <Grid item container direction='column' xs={12} sm={9}>
        <EventDetailedHeader />
      </Grid>
      <Grid item xs={3}>
        <EventDetailedSidebar />
      </Grid>
    </Grid>
  );
}
