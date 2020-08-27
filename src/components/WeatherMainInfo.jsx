import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoadingIcon from "./LoadingIcon";
import "../sass/weatherMainInfo.sass";
import "../sass/loadingIcon.sass";

const WeatherMainInfo = props => {
  return (
    <div className="weatherMainInfo">
      {
        props.isFetching ?
        <LoadingIcon />
        :
        <h2>{props.name} {props.temp}</h2>
      }
    </div>
  );
};

WeatherMainInfo.propTypes = {
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  temp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  description: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {
    weatherData,
    isFetching,
    error
  } = state;
  const {
    name,
    country,
    date,
    temp,
    description
  } = weatherData;
  return {
    name,
    country,
    date,
    temp,
    description,
    isFetching,
    error
  };
};

export default connect(
  mapStateToProps
)(WeatherMainInfo);