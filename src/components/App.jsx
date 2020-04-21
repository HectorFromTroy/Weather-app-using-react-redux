import React, { Component } from "react";
import { connect } from "react-redux";
import RightSide from "./RightSide.jsx";
import WeatherMainInfo from "./WeatherMainInfo.jsx";
import { weatherRequestByCoordinates } from "../actions";
import "../sass/main.sass"

class App extends Component{
  /**
   * @TODO checking url to know to make request or not
   */
  componentDidMount(){

    const {lat, lon} = this.props.match.params;

    if(lat && lon){
      this.props.getWeather(
        lat,
        lon
      );
    }
  };
  render(){
    return (
      <main className="main">
        <WeatherMainInfo />
        <RightSide history={this.props.history} />
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