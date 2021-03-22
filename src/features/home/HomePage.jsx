import React from 'react';
import {
  Button,
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
  Box,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DonutSmallOutlinedIcon from '@material-ui/icons/DonutSmall';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.gradient,
    width: '100vw',
    height: '100vh',
  },
  grid: {
    height: '100%',
  },
  cardRoot: {
    width: '600px',
    boxShadow: theme.shadows[22],
  },
  cardLogoBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '7px',
  },
  cardMedia: {
    '& .MuiCardMedia-img': {
      objectFit: 'cover',
    },
  },
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid className={classes.grid} container justify='center' alignItems='center'>
        <Grid item>
          <Card className={classes.cardRoot}>
            <CardActionArea component={Link} to='/events'>
              <CardMedia className={classes.cardMedia} component='img' image='/assets/categoryImages/play.jpg' />
              <CardContent>
                <Box className={classes.cardLogoBox}>
                  <DonutSmallOutlinedIcon color='primary' fontSize='large' />
                  <Typography variant='h5' component='h2' color='primary'>
                    BIND
                  </Typography>
                </Box>
                <Typography variant='body2' color='textSecondary' component='p'>
                  바인드는 커뮤니티를 이루어 모두가 더욱 가까워지는 세상을 만듭니다.
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  지인 혹은 익명의 사람들과 장소를 정하여 직접 만나 추억을 남겨보세요.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='large' color='primary' style={{ marginLeft: 'auto' }} component={Link} to='/events'>
                시작하기
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
