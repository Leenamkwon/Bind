import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Card, CardActionArea, CardHeader, CardContent, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { Event, FilterList } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';

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

const StaticDatePicker = () => {
  const classes = useStyles();
  const [date, changeDate] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Card elevation={3}>
            <CardHeader avatar={<FilterList color='primary' />} title='필터링' />
            <Divider variant='fullWidth' />

            <CardActionArea className={classes.active}>
              <CardContent>
                <Typography gutterBottom variant='subtitle2' component='h4'>
                  모든 이벤트
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='subtitle2' component='h4'>
                  내가 참가한 이벤트
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='subtitle2' component='h4'>
                  내가 게시한 이벤트
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs>
          <Card elevation={3}>
            <CardHeader avatar={<Event color='primary' />} title='캘린더' subheader='원하는 날을 선택해보세요' />
            <DatePicker
              className={classes.calendar}
              orientation='landscape'
              autoOk
              variant='static'
              openTo='date'
              value={date}
              onChange={changeDate}
            />
          </Card>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default StaticDatePicker;
