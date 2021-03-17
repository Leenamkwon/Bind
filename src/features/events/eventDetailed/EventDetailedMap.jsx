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
          <Typography color='inherit'>장소 위치</Typography>
          {address}
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

export default memo(function EventDetailedMap({ latlng }) {
  const { address, latLng } = latlng;
  const defaultProps = {
    center: {
      lat: latLng.lat,
      lng: latLng.lng,
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
        <AnyReactComponent lat={latLng.lat} lng={latLng.lng} address={address} />
      </GoogleMapReact>
    </div>
  );
});
