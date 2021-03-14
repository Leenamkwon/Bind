import React from 'react';
import { FormControl, FormHelperText, IconButton, Input, InputLabel } from '@material-ui/core';
import { useField } from 'formik';
import { Cancel } from '@material-ui/icons';

export default function MyTextArea(props) {
  const [field, meta, helper] = useField(props);

  return (
    <FormControl error={meta.touched && !!meta.error} fullWidth={true} variant='outlined'>
      <InputLabel htmlFor={props.label}>{props.label}</InputLabel>

      <Input
        id={props.label}
        {...field}
        {...props}
        multiline={true}
        inputComponent='textarea'
        endAdornment={
          field.value ? (
            <IconButton onClick={() => helper.setValue('')}>
              <Cancel />
            </IconButton>
          ) : null
        }
      />

      {meta.touched && meta.error ? <FormHelperText id={props.label}>{meta.error}</FormHelperText> : null}
      {meta.touched && !meta.error && <FormHelperText id={props.label}>Success</FormHelperText>}
    </FormControl>
  );
}
