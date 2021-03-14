import React from 'react';
import { FormControl, FormHelperText, IconButton, Input, InputLabel } from '@material-ui/core';
import { useField } from 'formik';
import { Cancel } from '@material-ui/icons';

export default function MytextInput(props) {
  const [field, meta, helper] = useField(props);

  return (
    <FormControl error={meta.touched && !!meta.error} variant='outlined' fullWidth={true} size='medium'>
      <InputLabel htmlFor={field.name}>{props.label}</InputLabel>
      <Input
        id={field.name}
        aria-describedby='my-helper-text'
        {...field}
        {...props}
        endAdornment={
          field.value ? (
            <IconButton onClick={() => helper.setValue('')}>
              <Cancel />
            </IconButton>
          ) : null
        }
      />
      {meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
      {meta.touched && !meta.error && <FormHelperText>Success</FormHelperText>}
    </FormControl>
  );
}
