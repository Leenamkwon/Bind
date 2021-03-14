import React from 'react';
import { FormControl, FormHelperText, InputLabel, Select, MenuItem, Typography } from '@material-ui/core';
import { LocalHospital } from '@material-ui/icons';
import { useField } from 'formik';

export default function MySelectInput(props) {
  const [field, meta] = useField(props);
  const menuItemStyle = { display: 'flex', alignItems: 'center' };

  return (
    <FormControl error={meta.touched && !!meta.error} variant='filled' fullWidth={true} size='medium'>
      <InputLabel>{props.label}</InputLabel>

      <Select {...field} {...props} value={field.value}>
        {field.name === 'member' && (
          <MenuItem disabled value='' style={menuItemStyle}>
            <LocalHospital size='small' />
            <Typography>COVID-19로 인하여 최대 인원이 5명으로 감소하였습니다.</Typography>
          </MenuItem>
        )}
        {props.option.map((category) => (
          <MenuItem value={category.value} key={category.key} style={menuItemStyle}>
            {category.text}
          </MenuItem>
        ))}
      </Select>

      {meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
    </FormControl>
  );
}
