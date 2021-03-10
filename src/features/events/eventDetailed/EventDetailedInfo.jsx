import React, { useState } from 'react';
import { Avatar, Card, Collapse, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { LocationOn, EventAvailable, Description, People, ExpandMore, ExpandLess } from '@material-ui/icons';
import EventDetailedMap from './EventDetailedMap';

export default function EventDetailedInfo() {
  const [mapOpen, setMapOpen] = useState(false);

  function handleMapOpen() {
    setMapOpen(!mapOpen);
  }

  return (
    <Grid item style={{ margin: '30px 0 15px 0' }}>
      <Card raised>
        <List disablePadding>
          <ListItem button onClick={handleMapOpen}>
            <ListItemAvatar>
              <Avatar>
                <LocationOn />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='위치' secondary={`서울특별시 서초1동 카페베네`} />
            {mapOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={mapOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem>
                <EventDetailedMap />
              </ListItem>
            </List>
          </Collapse>
          <Divider variant='inset' component='li' />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EventAvailable />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={'날짜'} secondary={`2011-21-12 01:15 AM`} />
          </ListItem>
          <Divider variant='inset' component='li' />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Description />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint expedita maxime iure perferendis ullam
              voluptatum tenetur exercitationem debitis enim nam tempore quod nesciunt officia totam, quibusdam consectetur,
              excepturi similique, itaque impedit sed dolor aliquid quos? Vel sunt tempora nisi pariatur aliquam! Eligendi
              qui veritatis velit sunt veniam autem maiores? Ipsum.
            </ListItemText>
          </ListItem>
          <Divider variant='inset' component='li' />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <People />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='최대 인원' secondary={'5명'}></ListItemText>
          </ListItem>
        </List>
      </Card>
    </Grid>
  );
}
