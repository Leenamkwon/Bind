import { Grid, Hidden } from '@material-ui/core';
import React from 'react';
import EventFilter from './EventFilter';
import EventList from './EventList';

export default function EventDashboard() {
  return (
    <Grid container spacing={2}>
      <Hidden mdDown>
        <Grid item lg>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis numquam harum non quisquam explicabo deserunt nemo
          dolorum eligendi rem in.
        </Grid>
      </Hidden>
      <Grid item sm={7} md={8} lg={5}>
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
