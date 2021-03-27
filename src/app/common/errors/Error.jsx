import React from 'react';
import { Box, Button, Card, CardContent, Hidden, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { firebaseTest } from '../../firestore/firebaseService';

export default function Error() {
  return (
    <Card>
      <CardContent>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <div>
            <Typography variant='h1' style={{ fontWeight: 600 }} gutterBottom color='textSecondary'>
              Oops!
            </Typography>
            <Typography variant='h5' gutterBottom color='textSecondary'>
              페이지를 찾을 수 없습니다.
            </Typography>
            <Typography variant='subtitle1' gutterBottom color='textSecondary'>
              Error Code: 404
            </Typography>

            <Button component={Link} to='/events' color='primary' variant='contained' style={{ margin: '30px auto 0' }}>
              메인페이지로 이동
            </Button>
          </div>

          <Hidden smDown>
            <div>
              <img src='/assets/svgImages/faq.svg' alt='404' />
            </div>
          </Hidden>
        </Box>

        <div onClick={firebaseTest}>test</div>
      </CardContent>
    </Card>
  );
}
