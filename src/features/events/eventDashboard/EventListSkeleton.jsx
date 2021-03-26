import React, { memo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';

export default memo(function EventListSkeleton() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card style={{ width: '100%' }}>
          <CardHeader
            avatar={<Skeleton animation='wave' variant='circle' width={40} height={40} />}
            title={<Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />}
            subheader={<Skeleton animation='wave' height={10} width='40%' />}
          />
          <Skeleton animation='wave' variant='rect' style={{ maxWidth: '100%', height: 230 }} />
          <CardContent>
            <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />
            <Skeleton animation='wave' height={10} width='80%' />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card style={{ width: '100%' }}>
          <CardHeader
            avatar={<Skeleton animation='wave' variant='circle' width={40} height={40} />}
            title={<Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />}
            subheader={<Skeleton animation='wave' height={10} width='40%' />}
          />
          <Skeleton animation='wave' variant='rect' style={{ maxWidth: '100%', height: 230 }} />
          <CardContent>
            <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />
            <Skeleton animation='wave' height={10} width='80%' />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card style={{ width: '100%' }}>
          <CardHeader
            avatar={<Skeleton animation='wave' variant='circle' width={40} height={40} />}
            title={<Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />}
            subheader={<Skeleton animation='wave' height={10} width='40%' />}
          />
          <Skeleton animation='wave' variant='rect' style={{ maxWidth: '100%', height: 230 }} />
          <CardContent>
            <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />
            <Skeleton animation='wave' height={10} width='80%' />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});
