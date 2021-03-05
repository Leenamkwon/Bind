import React, { useCallback } from 'react';
import { Box, Container, ThemeProvider } from '@material-ui/core';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import Navbar from '../../features/nav/Navbar';
import themeStyle from './useTheme';

export default function App() {
  const { key } = useLocation();
  const theme = themeStyle();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <>
              <Box
                style={{ background: theme.palette.background.default, width: '100vw', height: '100vh', overflow: 'scroll' }}
              >
                <Navbar />
                <Container maxWidth='lg' style={{ height: '100%', marginTop: '7em', padding: '0 10px' }}>
                  <Route exact path='/events' component={EventDashboard} />
                </Container>
              </Box>
            </>
          )}
        />
      </ThemeProvider>
    </>
  );
}
