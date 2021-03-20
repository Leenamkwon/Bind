import React, { useEffect } from 'react';
import { Box, Container, ThemeProvider } from '@material-ui/core';
import { Route, Switch, useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// Mui Custom Theme
import themeStyle from './useTheme';

// COMPONENT
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import Navbar from '../../features/nav/Navbar';
import EventForm from '../../features/events/eventForm/EventForm';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import ModalManager from '../common/modal/ModalManager';
import AccountPage from '../../features/auth/AccountPage';
import ProfilePage from '../../features/profile/profilepage/ProfilePage';
import LightBox from './LightBox';

export default function App() {
  const theme = themeStyle();
  const location = useLocation();
  let background = location.state && location.state.background;

  useEffect(() => {
    document.querySelector('body').style.backgroundColor = theme.palette.background.default;
  }, [theme.palette.background.default]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider max={3}>
          <ModalManager />
          <Route exact path='/' component={HomePage} />
          <Route
            path={'/(.+)'}
            render={() => (
              <Box
                style={{
                  background: theme.palette.background.default,
                  width: '100vw',
                  minHeight: '100vh',
                }}
              >
                <Navbar />
                <Container maxWidth='lg' style={{ height: '100%', paddingTop: '6rem', marginBottom: '3rem' }}>
                  <Switch location={background || location}>
                    <Route exact path='/events' component={EventDashboard} />
                    <Route path='/events/:id' component={EventDetailedPage} />
                    <Route exact path={['/createEvent', '/manage/:id']} key={location.key} component={EventForm} />
                    <Route path='/profile/:id' component={ProfilePage} />
                    <Route path='/account' component={AccountPage} />
                  </Switch>
                </Container>

                {background && <Route path='/img/:id' children={<LightBox />} />}
              </Box>
            )}
          />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}
