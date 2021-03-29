import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

export default function PublicRoute({ component: Component, ...rest }) {
  const { authenticated } = useSelector((state) => state.auth);
  const { prevLocation } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => (authenticated ? <Redirect to={prevLocation?.pathname ?? '/events'} /> : <Component {...props} />)}
    />
  );
}
