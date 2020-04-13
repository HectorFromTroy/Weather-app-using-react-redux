import { combineReducers } from "redux";
import {
  REQUEST_WEATHER_START,
  RECEIVE_WEATHER,
  REQUEST_ERROR
} from "../actions";

const fetchingStatus = (state=false, action) => action.type === REQUEST_WEATHER_START;

const receivedData = (state={
  name: "",
  country: "",
  date: "",
  temp: "",
  description: "",
  coord: {
    lat: "",
    lon: ""
  },
  isPositionChosen: false
}, action) => {
  if(action.type === RECEIVE_WEATHER){
    const weatherData = action.payload;
    const { name, country, coord } = weatherData.city;
    const date = weatherData.list[0].dt_txt;
    const temp = weatherData.list[0].main.temp;
    const description = weatherData.list[0].weather[0].description;
    return {
      name,
      country,
      date,
      temp,
      description,
      coord,
      isPositionChosen: true
    };
  }
  else{
    return state;
  }
};

const requestError = (
  state={
    message: "",
    isError: false
  },
  action
) => {
  if(action.type === REQUEST_ERROR){
    return {
      message: action.payload.message,
      isError: true
    };
  }
  else{
    return state;
  }
};

export default combineReducers({
  weatherData: receivedData,
  isFetching: fetchingStatus,
  error: requestError
});