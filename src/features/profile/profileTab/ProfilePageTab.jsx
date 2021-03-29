import React, { memo } from 'react';
import { makeStyles, Paper, Tabs, Tab } from '@material-ui/core';

// COMPONENT
import EventTab from './EventTab';
import GalleryTab from './GalleryTab';
import FollowingTab from './FollowingTab';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTab } from '../profileActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
    overflowY: 'auto',
  },
  tabs: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default memo(function ProfilePageTab({ profile, userIsMe }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentTabIndex } = useSelector((state) => state.profile);

  const handleChange = (event, newValue) => {
    dispatch(selectCurrentTab(newValue));
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={currentTabIndex}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
        variant='fullWidth'
        className={classes.tabs}
      >
        <Tab label='피드' />
        <Tab label='갤러리' />
        <Tab label='팔로워' />
        <Tab label='팔로잉' />
      </Tabs>
      {currentTabIndex === 0 && <EventTab value={currentTabIndex} index={0} profile={profile} />}
      {currentTabIndex === 1 && (
        <GalleryTab key={profile.id} value={currentTabIndex} index={1} profile={profile} userIsMe={userIsMe} />
      )}
      {currentTabIndex === 2 && <FollowingTab value={currentTabIndex} index={2} profile={profile} />}
      {currentTabIndex === 3 && <FollowingTab value={currentTabIndex} index={3} profile={profile} />}
    </Paper>
  );
});
