import React from 'react';
import { useField } from 'formik';
import { FormControl, FormHelperText } from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function MyDateInput(props) {
  const [field, meta, helper] = useField(props);

  return (
    <FormControl error={meta.touched && !!meta.error} variant='outlined' fullWidth={true} size='medium' required>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          variant='block'
          format='yyyy MM d, h:mm a'
          margin='normal'
          label='날짜'
          value={field.value}
          onChange={(date) => helper.setValue(date)}
        />
      </MuiPickersUtilsProvider>
      {meta.touched && meta.error ? <FormHelperText id={props.label}>{meta.error}</FormHelperText> : null}
      {meta.touched && !meta.error && <FormHelperText id={props.label}>Success</FormHelperText>}
    </FormControl>
  );
}
