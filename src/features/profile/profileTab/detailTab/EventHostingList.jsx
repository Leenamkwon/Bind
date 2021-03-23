import React, { useEffect, memo, useCallback, useRef } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// COMPONENT
import { listenToUserEvents } from '../../profileActions';
import { CLEAN_UP_EVENT } from '../../profileConstants';
import EventTabItem from '../detailTab/EventTabListItem';
import EventTabListItemSke from './EventTabListItemSke';

export default memo(function EventHostingList({ tabIdx, index, profile }) {
  const { retainTabIndex, profileEvents, eventLastDocRef, eventMoreEvents } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;

    dispatch(listenToUserEvents(tabIdx, profile, null));
    once.current = true;
  }, [dispatch, once, profile, retainTabIndex, tabIdx]);

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAN_UP_EVENT });
    };
  }, [dispatch]);

  const nextFetch = useCallback(() => {
    if (eventMoreEvents) {
      dispatch(listenToUserEvents(tabIdx, profile, eventLastDocRef));
    }
  }, [dispatch, eventLastDocRef, eventMoreEvents, profile, tabIdx]);

  return (
    <Box
      mt={4}
      p={2}
      role='tabpanel'
      hidden={tabIdx !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ minHeight: 370, overflowY: 'auto' }}
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={nextFetch}
        hasMore={!loading && eventMoreEvents}
        useWindow={false}
        initialLoad={true}
      >
        <Grid container spacing={4}>
          {loading && !once.current ? (
            <EventTabListItemSke />
          ) : (
            profileEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventTabItem event={event} />
              </Grid>
            ))
          )}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
});
