import React, { memo } from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export default memo(function EventTabListItemSke() {
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Skeleton animation='wave' variant='rect' height={200} />
          <CardContent>
            <Skeleton animation='wave' />
            <Skeleton animation='wave' width='60%' />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Skeleton animation='wave' variant='rect' height={200} />
          <CardContent>
            <Skeleton animation='wave' />
            <Skeleton animation='wave' width='60%' />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Skeleton animation='wave' variant='rect' height={200} />
          <CardContent>
            <Skeleton animation='wave' />
            <Skeleton animation='wave' width='60%' />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
});
