import React, { useState, memo } from 'react';
import { Avatar, Card, Collapse, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { LocationOn, EventAvailable, Description, People, ExpandMore, ExpandLess } from '@material-ui/icons';
import EventDetailedMap from './EventDetailedMap';
import formatDate from '../../../app/util/util';

export default memo(function EventDetailedInfo({ event }) {
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
            <ListItemText primary='장소' secondary={event.city.address} />
            {mapOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={mapOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem>
                <EventDetailedMap latlng={event.city} />
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
            <ListItemText primary={'날짜'} secondary={formatDate(event.date)} />
          </ListItem>
          <Divider variant='inset' component='li' />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <People />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='인원' secondary={event.member}></ListItemText>
          </ListItem>
          <Divider variant='inset' component='li' />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Description />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>{event.description}</ListItemText>
          </ListItem>
        </List>
      </Card>
    </Grid>
  );
});
