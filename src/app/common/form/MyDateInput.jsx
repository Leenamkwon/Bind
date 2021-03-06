import React from 'react';
import { useField } from 'formik';
import { FormControl, FormHelperText } from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ko } from 'date-fns/locale';

export default function MyDateInput(props) {
  const [field, meta, helper] = useField(props);

  return (
    <FormControl error={meta.touched && !!meta.error} variant='outlined' fullWidth={true} size='medium'>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
        <DateTimePicker
          variant='block'
          format='yyyy년 MM월 d일, h:mm aa'
          margin='normal'
          label='날짜'
          value={field.value}
          onChange={(date) => helper.setValue(date)}
        />
      </MuiPickersUtilsProvider>
      {meta.touched && meta.error ? <FormHelperText id={props.label}>{meta.error}</FormHelperText> : null}
    </FormControl>
  );
}
