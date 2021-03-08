import React, { useState } from 'react';
import { useField } from 'formik';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { FormControl, FormHelperText, Grid, Input, InputLabel } from '@material-ui/core';

export default function MyPlaceInput(props) {
  const [address, setAddress] = useState('');
  const [field, meta, helper] = useField(props);

  function handleChange(address) {
    setAddress(address);
  }

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  }

  return (
    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormControl error={meta.touched && !!meta.error} variant='outlined' fullWidth={true} size='medium' required>
          <InputLabel>{props.label}</InputLabel>
          <Input
            {...getInputProps({
              className: 'location-search-input',
            })}
          />
          <Grid container alignItems='center'>
            {suggestions.map((suggestion) => {
              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={suggestion.id}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </Grid>
        </FormControl>
      )}
    </PlacesAutocomplete>
  );
}

{
  /* <div className='autocomplete-dropdown-container'>
{loading && <div>Loading...</div>}
{suggestions.map((suggestion) => {
  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
  // inline style for demonstration purpose
  const style = suggestion.active
    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
    : { backgroundColor: '#ffffff', cursor: 'pointer' };
  return (
    <div
      {...getSuggestionItemProps(suggestion, {
        className,
        style,
      })}
    >
      <span>{suggestion.description}</span>
    </div>
  );
})}
</div> */
}
