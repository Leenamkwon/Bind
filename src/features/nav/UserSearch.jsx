import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { searchUserFirebase } from '../../app/firestore/firestoreService';
import { Avatar } from '@material-ui/core';
import useDebounce from '../../app/hooks/useDebounce';
import { useHistory } from 'react-router';
import { SearchRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function UserSearch() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useDebounce('');
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const history = useHistory();

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
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
                <SearchRounded />
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
}
