import React from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { useField } from 'formik';

export default function MyTextArea(props) {
  const [field, meta] = useField(props);

  return (
    <FormControl error={meta.touched && !!meta.error} fullWidth={true} variant='outlined'>
      <InputLabel htmlFor={props.label}>{props.label}</InputLabel>

      <Input rows={2} multiline={true} id={props.label} {...field} {...props} />

      {meta.touched && meta.error ? <FormHelperText id={props.label}>{meta.error}</FormHelperText> : null}
      {meta.touched && !meta.error && <FormHelperText id={props.label}>Success</FormHelperText>}
    </FormControl>
  );
}
