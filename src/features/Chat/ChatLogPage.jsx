import React from 'react';
import { Avatar, Box, ListSubheader, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ChatLogForm from './ChatLogForm';

const useStyles = makeStyles(() => ({
  root: { display: 'flex', height: '88vh', flexDirection: 'column', justifyContent: 'space-between' },
  ul: {
    overflowY: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  li: { display: 'flex', margin: '20px 5px 0 5px' },
  avatar: ({ matchesXS }) => ({
    width: matchesXS ? 30 : 40,
    height: matchesXS ? 30 : 40,
  }),
}));

export default function ChatLogPage({ match }) {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles(matchesXS);

  return (
    <Box className={classes.root}>
      <ul className={classes.ul}>
        <ListSubheader disableGutters>
          <Box py={1} style={{ backgroundColor: theme.palette.background.default, opacity: 0.8 }}>
            <Typography variant='subtitle1' align='center' color='textPrimary'>
              이승후
            </Typography>
          </Box>
        </ListSubheader>

        {new Array(30).fill(false).map((_, i) => (
          <li className={classes.li} key={i}>
            <Avatar className={classes.avatar} component={Link} to='/events' />
            <Box display='inline' ml={1}>
              <Typography color='textSecondary' variant='subtitle2'>
                이승후
              </Typography>
              <Box borderRadius={10} p={1} mt={1} bgcolor='background.default'>
                <Typography align='left' variant='subtitle1' color='textPrimary'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi facere non quia aliquam, magnam esse
                  tempora labore laudantium vel vero? Delectus cum corrupti, iusto nesciunt temporibus blanditiis qui
                  consequuntur impedit?
                </Typography>
              </Box>
              <Typography variant='caption' color='textSecondary'>
                2012-12:123
              </Typography>
            </Box>
          </li>
        ))}
      </ul>
      <Box p={1} width='100%'>
        <ChatLogForm chatId={match.params.id} />
      </Box>
    </Box>
  );
}

/* 

           <li className={classes.li} key={i}>
            <Avatar component={Link} to='/events' />
            <Box display='inline' ml={1}>
              <Typography color='textSecondary' variant='subtitle2'>
                이승후
              </Typography>
              <Box borderRadius={10} p={1} mt={1} bgcolor='background.default'>
                <Typography align='left' variant='subtitle1' color='textPrimary'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi facere non quia aliquam, magnam esse
                  tempora labore laudantium vel vero? Delectus cum corrupti, iusto nesciunt temporibus blanditiis qui
                  consequuntur impedit?
                </Typography>
              </Box>
              <Typography variant='caption' color='textSecondary'>
                2012-12:123
              </Typography>
            </Box>
          </li>


<li style={{ display: 'flex', marginTop: 10, flexDirection: 'row-reverse' }}>
          <Box display='inline' ml={1}>
            <Box borderRadius={10} p={1} mt={1} bgcolor='success.main'>
              <Typography align='right' variant='subtitle1' color='textPrimary'>
                집?ㅋㅋㅋㅋㅋ
              </Typography>
            </Box>
          </Box>
</li>

*/
