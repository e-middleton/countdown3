import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import WeatherReport from './WeatherReport';
import News from './News';
import './../App.css';

// const tmp2 = '[{"name":"Minneapolis","local_names":{"oc":"Minneapòlis","he":"מיניאפוליס","pt":"Mineápolis","ja":"ミネアポリス","en":"Minneapolis","ar":"منيابولس","eo":"Mineapolo","kn":"ಮಿನ್ಯಾಪೋಲಿಸ್","oj":"Gakaabikaang","zh":"明尼阿波利斯","hi":"मिन्यापोलिस्","uk":"Міннеаполіс","ru":"Миннеаполис","fa":"مینیاپولیس"},"lat":44.9772995,"lon":-93.2654692,"country":"US","state":"Minnesota"}]'
// const obj2 = JSON.parse(tmp2)

const WeatherApp = () => {
  const [locationData, setLocationData] = useState({ city: 'Boston', state: 'MA', country: 'USA' });
  const [latLon, setLatLon] = useState({lat: null, lon: null});
  const [entered, setEntered] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    const fetchLocation = async() => {
      try {
        const API_KEY = import.meta.env.VITE_API_KEY_GEO
        let city = locationData.city;
        let state = locationData.state;
        let country = locationData.country;
        let limit = 1
        const data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${API_KEY}`)
        const obj = await data.json();

        if (obj !== null) { 
          console.log(obj[0].lat);
          console.log(obj[0].lon);
          setLatLon({lat: obj[0].lat, lon: obj[0].lon}); // unpack into lat/lon pair
        }
        setErrMessage("");

      } catch (error) {
        console.log(error);
        setErrMessage("Invalid [city, state, country], please try again")
      }
    }
    fetchLocation();
  }, [entered])

  return (
    <>
      <div className='weatherAppBody'>
        <div className='weatherAppContent'>
          <div className="locationForm">
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField 
                label="City"
                name="city" 
                value={locationData.city} 
                error={errMessage}
                helperText={errMessage}
                onChange={(e) => {setLocationData({...locationData, city: e.target.value})} }
                />
                <TextField 
                label="State"
                name="state" 
                error={errMessage}
                value={locationData.state} 
                onChange={(e) => setLocationData({...locationData, state: e.target.value})} 
                />
                <TextField 
                label="Country"
                name="country" 
                error={errMessage}
                value={locationData.country} 
                onChange={(e) => setLocationData({...locationData, country: e.target.value})} 
                />
              </div>
            </Box>
            <Button 
              variant="contained"
              onClick={() => setEntered(prevState => !prevState)}
              >
              Enter
            </Button>
            <div className="latLon">
              {latLon.lat ? <div> Lat: {latLon.lat.toFixed(2)} </div> : null}
              {latLon.lon ? <div> Lon: {latLon.lon.toFixed(2)} </div> : null}
            </div>
          </div>
          {locationData? <WeatherReport locationData={latLon}/> : null}
          <News />
        </div>
      </div>
    </>
  );
}
export default WeatherApp