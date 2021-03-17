import React, { memo } from 'react';
import GoogleMapReact from 'google-map-react';
import { IconButton, withStyles, makeStyles, Tooltip, Typography } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background.default,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    padding: theme.spacing(1),
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '32px !important',
  },
}));

const AnyReactComponent = ({ address }) => {
  const classes = useStyles();

  return (
    <HtmlTooltip
      title={
        <>
          <Typography color='inherit'>Tooltip with HTML</Typography>
          <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
        </>
      }
      arrow
    >
      <IconButton color='primary'>
        <RoomIcon className={classes.icon} color='error' />
      </IconButton>
    </HtmlTooltip>
  );
};

export default memo(function EventDetailedMap() {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 14,
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} address='My Marker' />
      </GoogleMapReact>
    </div>
  );
});
