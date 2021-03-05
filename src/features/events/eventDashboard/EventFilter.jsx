import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import koLocale from 'date-fns/locale/ko';
import { Card, CardHeader, Grid, makeStyles } from '@material-ui/core';

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
}));

const StaticDatePicker = () => {
  const classes = useStyles();
  const [date, changeDate] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Card elevation={3}>
            <CardHeader title='Shrimp and Chorizo paella' />
            <CardHeader title='Shrimp and Chorizo paella' />
            <CardHeader title='Shrimp and Chorizo paella' />
          </Card>
        </Grid>

        <Grid item xs>
          <Card elevation={3}>
            <CardHeader title='Calendar' />
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
