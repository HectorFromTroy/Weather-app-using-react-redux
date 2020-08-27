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
  }
}, action) => {
  if(action.type === RECEIVE_WEATHER){
    const weatherData = action.payload;
    console.log(weatherData);
    const { name, country, coord } = weatherData.city;
    const list = weatherData.list;
    const date = list[0].dt_txt;
    const temp = list[0].main.temp;
    const description = list[0].weather[0].description;
    return {
      name,
      country,
      date,
      list,
      temp,
      description,
      coord
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