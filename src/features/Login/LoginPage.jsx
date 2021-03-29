import React, { useState } from 'react';
import { Card, Grid } from '@material-ui/core';
import Login from './Login';
import Register from './Register';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Grid container justify='center' alignItems='center' style={{ height: '100vh' }}>
      <Grid item>
        <Card style={{ height: 800, maxWidth: 1290 }} raised>
          {isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />}
        </Card>
      </Grid>
    </Grid>
  );
}
