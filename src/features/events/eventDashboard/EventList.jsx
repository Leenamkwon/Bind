import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import InfinitScroll from 'react-infinite-scroller';

import EventListItem from './EventListItem';

export default memo(function EventList({ events, getNextEvents, loading, moreEvents }) {
  return (
    <Grid container>
      {events.length > 0 ? (
        <InfinitScroll
          pageStart={0}
          loadMore={() => getNextEvents()}
          hasMore={!loading && moreEvents}
          initialLoad={true}
          style={{ width: '100%' }}
        >
          {events.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))}
        </InfinitScroll>
      ) : null}
    </Grid>
  );
});
