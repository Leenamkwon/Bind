import React, { useState, memo } from 'react';
import { makeStyles, Paper, Tabs, Tab } from '@material-ui/core';
import EventTab from './EventTab';
import GalleryTab from './GalleryTab';
import FollowingTab from './FollowingTab';
import FollowerTab from './FollowerTab';

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
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
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
      {value === 0 && <EventTab value={value} index={0} profile={profile} />}
      {value === 1 && <GalleryTab value={value} index={1} profile={profile} userIsMe={userIsMe} />}
      {value === 2 && <FollowerTab value={value} index={2} profile={profile} />}
      {value === 3 && <FollowingTab value={value} index={3} profile={profile} />}
    </Paper>
  );
});
