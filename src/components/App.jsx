import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import WeatherMainInfo from "./WeatherMainInfo.jsx";
import WeatherMap from "./WeatherMap.jsx";
import { weatherRequestByCoordinates } from "../actions";
import "../sass/main.sass"

class App extends Component{
  /**
   * @TODO checking url to know to make request or not
   */
  componentDidMount(){
    if(this.props.match.params.lat){
      this.props.getWeather(
        this.props.match.params.lat,
        this.props.match.params.lon
      );
    }
  };
  render(){
    return (
      <main className="main">
        <WeatherMainInfo />
        <WeatherMap history={this.props.history} />
      </main>
    );
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWeather: (lat, lon) => dispatch(weatherRequestByCoordinates(lat, lon))
  };
};

export default connect(
  null, 
  mapDispatchToProps
)(App);