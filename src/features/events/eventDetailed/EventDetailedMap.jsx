import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function EventDetailedMap() {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 14,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' />
      </GoogleMapReact>
    </div>
  );
}
