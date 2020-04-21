import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import "../sass/weatherGraphic.sass";

const WeatherGraphic = props => {

  if(!props.list){
    return (
      <p>Choose area first</p>
    );
  }

  

  return (
    <Line 
      data={getDataForGraphic(props)}
      width={500}
      height={500}
    />
  );
};


function getDataForGraphic(props){

  const maxMinTempsOf5dayForecast = getMaxMinTempsOf5dayForecast(props.list);

  const labels = [];
  const tempMin = [];
  const tempMax = [];

  for(let [key, temps] of maxMinTempsOf5dayForecast){
    labels.push(key);
    tempMin.push(temps[0]);
    tempMax.push(temps[1]);
  }

  return {
    labels: labels,
    datasets: [
      {
        label: "min temp",
        data: tempMin
      },
      {
        label: "max temp",
        data: tempMax
      }
    ]
  };

};


function getMaxMinTempsOf5dayForecast(list){
  //map has data: "mm-dd": [min_temp, max_temp]
  const resultMap = new Map();

  for(let i = 0; i < list.length; i++){
    //gets mm-dd from dt_txt
    const Xdate = list[i].dt_txt.slice(5, 10);
    const { temp } = list[i].main;

    if(!resultMap.has(Xdate)){
      resultMap.set(Xdate, [temp, temp]);
      continue;
    }

    const mapDate = resultMap.get(Xdate);
    if(temp < mapDate[0]){
      resultMap.set(Xdate, [temp, mapDate[1]]);
      continue;
    }

    if(temp > mapDate[1]){
      resultMap.set(Xdate, [mapDate[0], temp]);
      continue;
    }
    
  }

  return resultMap;

};

const mapStateToProps = state => {
  return {
    list: state.weatherData.list
  };
};

WeatherGraphic.propType = {
  list: PropTypes.array
};

export default connect(
  mapStateToProps,
  null
)(WeatherGraphic);