import React, { useEffect } from 'react';
import { Box, Container, ThemeProvider } from '@material-ui/core';
import { Route, Switch, useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';

// Mui Custom Theme
import themeStyle from './useTheme';

// COMPONENT
import HomePage from '../../features/home/HomePage';
import Navbar from '../../features/nav/Navbar';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import NotificationPage from '../../features/Notification/NotificationPage';
import PrivateRoute from './PrivateRoute';
import ModalManager from '../common/modal/ModalManager';
import EventForm from '../../features/events/eventForm/EventForm';
import AccountPage from '../../features/auth/AccountPage';
import ProfilePage from '../../features/profile/profilepage/ProfilePage';
import LightBox from './LightBox';
import LoadingComponent from './LoadingComponent';
import Login from '../../features/Login/Login';
import Error from '../../app/common/errors/Error';
import GalleryLightBox from './GalleryLightBox';

export default function App() {
  const theme = themeStyle();
  const location = useLocation();
  const { initialized } = useSelector((state) => state.async);
  let background = location.state && location.state.background;
  let gallery = location.state && location.state.gallery;

  useEffect(() => {
    document.querySelector('body').style.backgroundColor = theme.palette.background.default;
  }, [theme.palette.background.default]);

  if (!initialized) return <LoadingComponent theme={theme} />;

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
                    <Route exact path='/login' component={Login} />
                    <PrivateRoute path='/account' component={AccountPage} />
                    <Route exact path='/events' component={EventDashboard} />
                    <Route path='/events/:id' component={EventDetailedPage} />
                    <PrivateRoute exact path={['/createEvent', '/manage/:id']} key={location.key} component={EventForm} />
                    <PrivateRoute path='/profile/:id' component={ProfilePage} key={location.key} />
                    <PrivateRoute path='/notification' component={NotificationPage} />
                    <Route path='/error' component={Error} />
                    {/* <Route path='/*' component={Error} /> */}
                  </Switch>
                </Container>

                {background && <Route exact path='/img/:id' children={<LightBox />} />}
                {gallery && <Route exact path='/gallery/:id' children={<GalleryLightBox />} />}
              </Box>
            )}
          />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}
