import React from 'react';
import { Box, Container, ThemeProvider } from '@material-ui/core';
import { Route, useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import themeStyle from './useTheme';
import { useSelector } from 'react-redux';

// COMPONENT
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import Navbar from '../../features/nav/Navbar';
import EventForm from '../../features/events/eventForm/EventForm';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import ModalManager from '../common/modal/ModalManager';
import LoadingComponent from './LoadingComponent';
import AccountPage from '../../features/auth/AccountPage';

export default function App() {
  const theme = themeStyle();
  const { key } = useLocation();
  const { initialized } = useSelector((state) => state.async);

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider max={3}>
          {!initialized ? (
            <LoadingComponent />
          ) : (
            <>
              <ModalManager />
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
                      <Route path='/account' component={AccountPage} />
                    </Container>
                  </Box>
                )}
              />
            </>
          )}
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}
