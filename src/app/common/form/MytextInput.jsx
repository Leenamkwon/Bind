import React from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { useField } from 'formik';

export default function MytextInput(props) {
  const [field, meta] = useField(props);

  return (
    <FormControl error={meta.touched && !!meta.error} variant='outlined' fullWidth={true} size='medium' required>
      <InputLabel htmlFor={field.name}>{props.label}</InputLabel>
      <Input id={field.name} aria-describedby='my-helper-text' {...field} {...props} />
      {meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
      {meta.touched && !meta.error && <FormHelperText>Success</FormHelperText>}
    </FormControl>
  );
}
