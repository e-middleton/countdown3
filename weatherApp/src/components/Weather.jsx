import { useEffect, useState } from 'react'
import WeatherReport from './WeatherReport';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async() => {
      try {
        // request a json of trivia questions from the API
        // const url = new URL(http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key})
        const API_KEY = import.meta.env.VITE_API_KEY
        let lat = 44.98
        let lon = 93.26
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        // const question = await fetch("https://opentdb.com/api.php?amount=1")
        const obj = await data.json();
        console.log(obj);
        setWeatherData(obj);

      } catch (error) {
        console.log(error);
      }
    }
    fetchWeather();
  }, [])

  return (
    <>
      <div>
        <p>Weather data</p>
        {weatherData.weather ? <WeatherReport main={weatherData.weather[0].main}/> : null} 
      </div>
    </>
  );
}
export default Weather