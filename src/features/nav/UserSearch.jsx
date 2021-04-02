import React, { useState, memo, useEffect } from 'react';
import { TextField, Grid, Typography, makeStyles, Avatar } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router';

// COMPONENT
import useDebounce from '../../app/hooks/useDebounce';
import { searchUserFirebase } from '../../app/firestore/firestoreService';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default memo(function UserSearch() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useDebounce('', 200);
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return;
    }

    (async () => {
      const results = await searchUserFirebase(inputValue);
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results.length > 0) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    })();

    return () => {
      active = false;
    };
  }, [value, inputValue]);

  return (
    <Autocomplete
      size='small'
      style={{ width: 200 }}
      getOptionLabel={(option) => option.displayName}
      filterOptions={(x) => x}
      options={options}
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : []);
        setValue(newValue);
        if (newValue?.uid) {
          history.push(`/profile/${newValue?.uid}`);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          color='secondary'
          label='유저 검색'
          variant='outlined'
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <React.Fragment>
                <SearchRounded color='action' />
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(option) => {
        return (
          <Grid container alignItems='center'>
            <Grid item>
              <Avatar src={option.photoURL} className={classes.icon} />
            </Grid>
            <Grid item xs>
              <Typography variant='body1' color='textPrimary' style={{ fontWeight: 500 }}>
                {option.displayName}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
});
