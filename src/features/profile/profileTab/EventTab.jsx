import React, { useState, memo } from 'react';
import { Box, Tabs, makeStyles, Tab } from '@material-ui/core';
import { a11yProps } from '../../../app/util/util';

// COMPONENT
import EventHostingList from './detailTab/EventHostingList';
import EventAttendeeList from './detailTab/EventAttendeeList';

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    '& .MuiTabs-indicator': {
      display: 'none',
    },
  },
}));

export default memo(function EventTab({ value, index, profile }) {
  const classes = useStyles();
  const [tabIdx, setTabIdx] = useState(0);

  const handleChange = (_, newValue) => {
    setTabIdx(newValue);
  };

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box>
          <Tabs
            className={classes.tabs}
            value={tabIdx}
            onChange={handleChange}
            variant='fullWidth'
            indicatorColor='primary'
            textColor='primary'
            aria-label='icon tabs example'
          >
            <Tab label='호스팅한 이벤트' {...a11yProps(0)} />
            <Tab label='참여한 이벤트' {...a11yProps(1)} />
            <Tab label='좋아한 이벤트' {...a11yProps(2)} />
          </Tabs>
          {Array.from({ length: 3 }, (_, i) => {
            return tabIdx === i && <EventHostingList tabIdx={tabIdx} index={i} profile={profile} key={i} />;
          })}
        </Box>
      )}
    </div>
  );
});

// {tabIdx === 0 && <EventHostingList tabIdx={tabIdx} index={0} profile={profile} />}
//           {tabIdx === 1 && <EventAttendeeList tabIdx={tabIdx} index={1} profile={profile} />}
