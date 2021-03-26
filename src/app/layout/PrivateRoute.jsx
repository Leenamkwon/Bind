import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';

export default function PrivateRoute({ Component, ...props }) {
  const { authenticated } = useSelector((state) => state.auth);

  return <Route {...props} render={(prop) => (authenticated ? <Component {...prop} /> : null)} />;
}
