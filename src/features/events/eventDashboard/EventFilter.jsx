import React, { memo } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Card, CardActionArea, CardHeader, CardContent, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { Event, FilterList } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';

import { setFilter, setStartDate } from '../eventActions';

const useStyles = makeStyles((theme) => ({
  calendar: {
    display: 'flex',
    justifyContent: 'center',
    '.MuiPickersBasePicker-pickerView': {
      width: '100% !important',
      maxWidth: '1000px !important',
    },
    '& .MuiPickersToolbar-toolbar': {
      backgroundColor: 'red !important',
    },
  },
  active: {
    backgroundColor: theme.palette.grey['300'],
    color: 'rgba(0, 0, 0, 0.87)',
    cursor: 'default',
  },
}));

const EventFilter = ({ loadingInitial }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { startDate, filter } = useSelector((state) => state.event);
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
      <Grid container spacing={3}>
        {authenticated && (
          <Grid item xs>
            <Card elevation={3}>
              <CardHeader avatar={<FilterList color='primary' />} title='필터링' />
              <Divider variant='fullWidth' />

              <CardActionArea
                className={clsx({ [classes.active]: filter === 'all' })}
                onClick={() => dispatch(setFilter('all'))}
              >
                <CardContent>
                  <Typography gutterBottom variant='subtitle2' component='h4'>
                    모든 이벤트
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActionArea
                className={clsx({ [classes.active]: filter === 'isGoing' })}
                onClick={() => dispatch(setFilter('isGoing'))}
              >
                <CardContent>
                  <Typography gutterBottom variant='subtitle2' component='h4'>
                    내가 참가한 이벤트
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActionArea
                className={clsx({ [classes.active]: filter === 'isHosting' })}
                onClick={() => dispatch(setFilter('isHosting'))}
              >
                <CardContent>
                  <Typography gutterBottom variant='subtitle2' component='h4'>
                    내가 게시한 이벤트
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )}

        <Grid item xs={12}>
          <Card elevation={3}>
            <CardHeader avatar={<Event color='primary' />} title='캘린더' subheader='원하는 날을 선택해보세요' />
            <DatePicker
              className={classes.calendar}
              orientation='landscape'
              autoOk
              variant='static'
              openTo='date'
              value={startDate}
              disabled={loadingInitial}
              onChange={(date) => dispatch(setStartDate(date))}
            />
          </Card>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default memo(EventFilter);
