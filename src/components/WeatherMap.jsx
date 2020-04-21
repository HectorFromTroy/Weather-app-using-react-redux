import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "../sass/weatherMap.sass";
import { weatherRequestByCoordinates } from "../actions";
const mapStyle = {
  width: "100%",
  height: "100%"
};
const WeatherMap = props => {
  const position = props.isPositionChosen ? [props.lat, props.lon] : [50, 50];
  return (
    <div className="weatherMap">
      <Map
        center={position} 
        zoom={7}
        style={mapStyle}
        onClick={
          event => {
            props.history.push(`/${event.latlng.lat}/${event.latlng.lng}`);
            props.onMapClick(event);
          }
        }
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. br  Easily customizable.
          </Popup>
        </Marker>
      </Map> 
    </div>
    
  );
};

WeatherMap.propTypes = {
  lat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  lon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

const mapStateToProps = state => {
  const { lat, lon } = state.weatherData.coord;
  return {
    lat,
    lon,
    isPositionChosen: state.weatherData.isPositionChosen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMapClick: ({ latlng }) => dispatch(weatherRequestByCoordinates(latlng.lat, latlng.lng))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherMap);