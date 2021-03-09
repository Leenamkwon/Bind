import React from 'react';
import { FormControl, FormHelperText, Grid, Input, InputLabel, Typography, makeStyles } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useField } from 'formik';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  autocompleteContainer: {
    background: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  autocompleteItem: {
    padding: '10px 5px',
  },
  autocompleteItemActive: {
    background: theme.palette.background.paper,
  },
}));

export default function MyPlaceInput({ options, ...props }) {
  const classes = useStyles();
  const [field, meta, helper] = useField(props);

  function handleChange(address) {
    helper.setValue({ address });
  }

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => helper.setValue({ address, latLng }))
      .catch((error) => helper.setError({ noResult: '좌표를 반환하지 못하였습니다. 다시 시도해주세요.' }));
  }

  function handleBlur(e) {
    if (field.value.latLng == null) {
      field.onBlur(e);
      helper.setValue({ address: '', latLng: null });
    }
  }

  function handleError(e) {
    helper.setError({ noResult: '구글 맵 한도초과...' });
  }

  return (
    <PlacesAutocomplete
      searchOptions={options || null}
      value={field.value['address']}
      onChange={handleChange}
      onSelect={handleSelect}
      onError={handleError}
      debounce={300}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormControl error={meta.touched && !!meta.error} variant='outlined' fullWidth={true} size='medium' required>
          <InputLabel>{props.label}</InputLabel>
          <Input
            {...getInputProps({
              name: field.name,
              ...props,
              onBlur: (e) => handleBlur(e),
            })}
          />

          {suggestions?.length > 0 && (
            <Grid container alignItems='center' className={classes.autocompleteContainer}>
              {suggestions.map((suggestion) => {
                return (
                  <Grid
                    item
                    container
                    key={suggestion.placeId}
                    alignItems='center'
                    className={clsx(classes.autocompleteItem, {
                      [classes.autocompleteItemActive]: suggestion.active,
                    })}
                    {...getSuggestionItemProps(suggestion)}
                  >
                    <Grid item>
                      <LocationOnIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant='body1' style={{ fontWeight: suggestion.active ? 700 : 400 }}>
                        {suggestion.formattedSuggestion.mainText}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {suggestion.formattedSuggestion.secondaryText}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          )}
          {meta.touched && meta.error ? (
            <FormHelperText id={props.label}>
              {meta.error['address'] || meta.error['latLng'] || meta.error['noResult']}
            </FormHelperText>
          ) : null}
        </FormControl>
      )}
    </PlacesAutocomplete>
  );
}
