import { useCallback, useMemo } from 'react';
import { createMuiTheme, useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';

export default function useTheme() {
  const { isThemeMode } = useSelector((state) => state.theme);
  const matches = useMediaQuery('(max-width:1190px)');

  const isDarkMode = useCallback(() => {
    if (!localStorage.getItem('theme') && isThemeMode === 'dark') {
      return 'dark';
    }
    if (!localStorage.getItem('theme') && isThemeMode === 'light') {
      return 'light';
    }
    if (localStorage.getItem('theme') === 'dark') {
      return 'dark';
    }
    if (localStorage.getItem('theme') === 'light') {
      return 'light';
    }
  }, [isThemeMode]);

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkMode(),
          primary: {
            main: '#d02a6c',
          },
          secondary: {
            main: '#fafafa',
          },
          gradient: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        },
        overrides: {
          MuiPickersToolbar: {
            toolbar: {
              backgroundColor: '#d02a6c',
              display: matches ? 'none' : 'block',
            },
          },
        },
      }),
    [isDarkMode, matches]
  );

  return theme;
}
