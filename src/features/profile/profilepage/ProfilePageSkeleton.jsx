import React from 'react';
import { Box, Card, CardContent, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export default function ProfilePageSkeleton() {
  return (
    <Grid container spacing={2}>
      <Card style={{ width: '100%' }} raised={true}>
        <Skeleton variant='rect' animation='wave' height={350} />
        <CardContent>
          <Box display='flex'>
            <Skeleton variant='circle' animation='wave' height={180} width={180} style={{ margin: 10 }} />
            <Box display='flex' flexDirection='column' justifyContent='center'>
              <Skeleton variant='text' animation='wave' width={400} />
              <Skeleton variant='text' animation='wave' width={340} />
            </Box>
          </Box>
          <Skeleton variant='text' animation='wave' width={400} />
          <Skeleton variant='text' animation='wave' width={340} />
          <Skeleton variant='text' animation='wave' width={340} />

          <Skeleton variant='rect' animation='wave' height={50} style={{ marginTop: 40 }} />
          <Box mt={2} display='flex' justifyContent='space-between'>
            <Skeleton variant='rect' animation='wave' height={300} width='31.33%' />
            <Skeleton variant='rect' animation='wave' height={300} width='31.33%' />
            <Skeleton variant='rect' animation='wave' height={300} width='31.33%' />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
