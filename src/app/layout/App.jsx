import React from 'react';
import { Box, Container, ThemeProvider } from '@material-ui/core';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import Navbar from '../../features/nav/Navbar';
import themeStyle from './useTheme';
import EventForm from '../../features/events/eventForm/EventForm';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';

export default function App() {
  const theme = themeStyle();
  const { key } = useLocation();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <Box
              style={{
                background: theme.palette.background.default,
                width: '100vw',
                height: '100vh',
                overflow: 'scroll',
              }}
            >
              <Navbar />
              <Container maxWidth='lg' style={{ height: 'auto', marginTop: '7em', padding: '0 10px' }}>
                <Route exact path='/events' component={EventDashboard} />
                <Route path='/events/:id' component={EventDetailedPage} />
                <Route exact path={['/createEvent', '/manage/:id']} key={key} component={EventForm} />
              </Container>
            </Box>
          )}
        />
      </ThemeProvider>
    </>
  );
}
