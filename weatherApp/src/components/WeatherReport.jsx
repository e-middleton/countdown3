import { useEffect, useState, useRef } from 'react';
import HourlyReport from './HourlyReport';
import SevenDayWeather from './SevenDayWeather';
import description from './weatherDescription.json' with { type : 'json' };
import imageName from './imageName.json' with {type:'json'}

const WeatherReport = ( {locationData} ) => {
  const isMounted = useRef(false); // prevent initial api call until the location has been grabbed
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null); // for the next day
  const [weatherDescription, setWeatherDescription] = useState(null);
  const [weeklyWeather, setWeeklyWeather] = useState(null);

  useEffect(() => {
    if (isMounted.current) {
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
          // const jsonString = JSON.stringify(output);
          // console.log(jsonString);
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
          setWeatherDescription(description["weatherCode"][output.data.timelines[0].intervals[0].values.weatherCode].toLowerCase());

          const weekData = [];
          for (let j = 0; j < 5; j++) {   // loop through 6 day
            let high = output.data.timelines[0].intervals[24*j].values.temperature;
            let low = output.data.timelines[0].intervals[24*j].values.temperature;
            let date = output.data.timelines[0].intervals[24*j].startTime.split("T")[0];

            for (let i = 0; i < 24; i++){   // loop through 24 hours
              // console.log(weather.data.timelines[0].intervals[(24*j)+i].values.temperature);
              let currTemp = output.data.timelines[0].intervals[(24*j) + i].values.temperature;
              if (currTemp > high)  high = currTemp;
              if (currTemp < low) low = currTemp;
            }
            weekData.push({date: date, H:high, L:low})
          }
          setWeeklyWeather(weekData);
        })
        .catch(err => console.error(err));
    } else {
      isMounted.current = true;
    }
  }, [locationData])

  return (
    <>
      <div className="weatherDashboard">
        <div className="currentWeather">

          <div className="mainWeather">
            <h3> { weatherDescription ? `The current weather is ${weatherDescription}` : "Please enter a valid location" }</h3>
            <figure className='weatherImage'>
              <img style={{maxWidth:'30%'}} 
                src={currentWeather ? `./src/assets/tomorrow-weather-codes/V2_icons/large/png/${currentWeather.weatherCode}0_${imageName[currentWeather.weatherCode]}_large.png` : 
                null} 
                alt="weather symbol" 
              />
              <figcaption className='caption'>
                powered by
                <a href="https://www.tomorrow.io/weather-api/"> Tomorrow.io</a>
              </figcaption>
            </figure>
            <div style={{fontSize:'17px'}}>
              {/* <p>The main report for this location is: {weatherData.values.}</p> */}
              <p> {currentWeather ? `The temperature is ${currentWeather.temperature} degrees Fahrenheit` : null }</p>
              <p> {currentWeather ? `though it feels like ${currentWeather.temperatureApparent}` : null }</p>
              <p> {currentWeather ? `There is a ${currentWeather.precipitationProbability + "\u0025"} chance of rain` : null }</p>
            </div>
          </div>

          <h3>The temperature over the next 12 hours: </h3>
          {hourlyWeather? <HourlyReport hourlyData={hourlyWeather} /> : null}
        </div>
        {weeklyWeather ? <SevenDayWeather weeklyData={weeklyWeather}/> : null}
      </div>
    </>
  );
}
export default WeatherReport