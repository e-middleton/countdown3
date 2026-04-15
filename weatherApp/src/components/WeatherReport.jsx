import { useEffect, useState } from 'react';
import HourlyReport from './HourlyReport';

// const tmp = '{"data":{"timelines":[{"timestep":"1d","endTime":"2026-04-19T11:00:00Z","startTime":"2026-04-14T11:00:00Z","intervals":[{"startTime":"2026-04-14T11:00:00Z","values":{"precipitationProbability":0,"temperature":62.35,"temperatureApparent":62.3,"weatherCode":1000}},{"startTime":"2026-04-15T11:00:00Z","values":{"precipitationProbability":0,"temperature":66.61,"temperatureApparent":66.6,"weatherCode":1001}},{"startTime":"2026-04-16T11:00:00Z","values":{"precipitationProbability":0,"temperature":72.86,"temperatureApparent":72.9,"weatherCode":1000}},{"startTime":"2026-04-17T11:00:00Z","values":{"precipitationProbability":35,"temperature":73.02,"temperatureApparent":73,"weatherCode":1001}},{"startTime":"2026-04-18T11:00:00Z","values":{"precipitationProbability":0,"temperature":40.06,"temperatureApparent":40.1,"weatherCode":1001}},{"startTime":"2026-04-19T11:00:00Z","values":{"precipitationProbability":0,"temperature":55.67,"temperatureApparent":55.7,"weatherCode":1000}}]}]}}'
// const obj = JSON.parse(tmp);
import weather from './weather.json' with { type: 'json' };

const WeatherReport = ( {locationData, city, state, country} ) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null); // for the next day

  useEffect(() => {
    console.log(currentWeather);
    const apiKey = import.meta.env.VITE_API_KEY;
    const lat = locationData.lat;
    const lon = locationData.lon;
    const location = `${lat},${lon}` ; // Lat/Long
    const units = 'imperial';
    const fields = "temperature,temperatureApparent,precipitationProbability,weatherCode,";
    const timesteps = "1h"; // 1h, 1d, 1m  # get hourly data ?

    const url = `https://api.tomorrow.io/v4/timelines?location=${location}&units=${units}&fields=${fields}&timesteps=${timesteps}&apikey=${apiKey}`;

    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(url, options)
      .then(response => response.json())
      .then(output => {
        console.log(output);
        const jsonString = JSON.stringify(output);
        console.log(jsonString);
        setCurrentWeather(output.data.timelines[0].intervals[0].values); // current weather 
        // next 12 hours
        setHourlyWeather([output.data.timelines[0].intervals[1],
          output.data.timelines[0].intervals[2],
          output.data.timelines[0].intervals[3],
          output.data.timelines[0].intervals[4],
          output.data.timelines[0].intervals[5],
          output.data.timelines[0].intervals[6],
          output.data.timelines[0].intervals[7],
          output.data.timelines[0].intervals[8],
          output.data.timelines[0].intervals[9],
          output.data.timelines[0].intervals[10],
          output.data.timelines[0].intervals[11],
          output.data.timelines[0].intervals[12],
        ])
      })
      .catch(err => console.error(err));
  }, [locationData])

  return (
    <>
      <h3> {city}, {state} {country} </h3>
      <p>Latitude of {locationData.lat}</p>
      <p>Longitude of {locationData.lon}</p>
      <h4>The current weather is: </h4>
      <div>
        {/* <p>The main report for this location is: {weatherData.values.}</p> */}
        <p> {currentWeather ? `The temperature is ${currentWeather.temperature} degrees Fahrenheit` : null }</p>
        <p> {currentWeather ? `though it feels like ${currentWeather.temperatureApparent}` : null }</p>
        <p> {currentWeather ? `There is a ${currentWeather.precipitationProbability + "\u0025"} chance of rain` : null }</p>
      </div>
      <div>
        <h3>The temperature over the next 12 hours: </h3>
        {hourlyWeather? <HourlyReport hourlyData={hourlyWeather} /> : null}
      </div>
    </>
  );
}
export default WeatherReport