import axios from "axios";

export const REQUEST_WEATHER_START = "REQUEST_WEATHER_START";
export const RECEIVE_WEATHER = "RECEIVE_WEATHER";
export const REQUEST_ERROR = "REQUEST_ERROR";

const API_KEY = "20bc06bce37015211bb134b11207254b";
const API_request = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`,
  params: {
    units: "metric"
  }
});

const weatherRequestStartSignal = () => ({
  type: REQUEST_WEATHER_START
});

const weatherReceived = payload => ({
  type: RECEIVE_WEATHER,
  payload
});

const requestError = payload => ({
  type: REQUEST_ERROR,
  payload
});

export const weatherRequestByCoordinates = (lat, lon) => async dispatch => {
  dispatch(weatherRequestStartSignal());
  try{
    const { data } = await API_request.get(`forecast?appid=${API_KEY}&lat=${lat}&lon=${lon}&units=metric`);
    dispatch(weatherReceived(data));
  } catch(error){
    console.log(error);
    dispatch(requestError(error));
  }
}; 