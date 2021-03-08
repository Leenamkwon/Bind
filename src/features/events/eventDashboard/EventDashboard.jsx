import { Grid, Hidden } from '@material-ui/core';
import React from 'react';
import EventFilter from './EventFilter';
import EventList from './EventList';
import EventProfile from './EventProfile';
// import EventListSkeleton from './EventListSkeleton';

export default function EventDashboard() {
  return (
    <Grid container spacing={2}>
      <Hidden mdDown>
        <Grid item lg={3}>
          <EventProfile />
        </Grid>
      </Hidden>
      <Grid item sm={7} md={8} lg={5}>
        {/* <EventListSkeleton /> */}
        <EventList />
      </Grid>
      <Hidden xsDown>
        <Grid item sm={5} md={4} lg={4}>
          <EventFilter />
        </Grid>
      </Hidden>
    </Grid>
  );
}
