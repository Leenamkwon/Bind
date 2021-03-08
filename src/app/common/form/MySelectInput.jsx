import React from 'react';
import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useField } from 'formik';

export default function MySelectInput(props) {
  const [field, meta] = useField(props);

  return (
    <FormControl error={meta.touched && !!meta.error} variant='filled' fullWidth={true} size='medium' required>
      <InputLabel>{props.label}</InputLabel>

      <Select {...field} {...props} value={field.value}>
        {props.option.map((category) => (
          <MenuItem value={category.value} key={category.key}>
            {category.text}
          </MenuItem>
        ))}
      </Select>

      {meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
    </FormControl>
  );
}
