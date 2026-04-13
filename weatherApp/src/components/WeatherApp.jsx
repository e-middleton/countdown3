import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Location from './Location';
import './../App.css';

// const tmp2 = '[{"name":"Minneapolis","local_names":{"oc":"Minneapòlis","he":"מיניאפוליס","pt":"Mineápolis","ja":"ミネアポリス","en":"Minneapolis","ar":"منيابولس","eo":"Mineapolo","kn":"ಮಿನ್ಯಾಪೋಲಿಸ್","oj":"Gakaabikaang","zh":"明尼阿波利斯","hi":"मिन्यापोलिस्","uk":"Міннеаполіс","ru":"Миннеаполис","fa":"مینیاپولیس"},"lat":44.9772995,"lon":-93.2654692,"country":"US","state":"Minnesota"}]'
// const obj2 = JSON.parse(tmp2)

const WeatherApp = () => {
  // const [locationData, setLocationData] = useState(obj2);

  // useEffect(() => {
  //   const fetchLocation = async() => {
  //     try {
  //       const API_KEY = import.meta.env.VITE_API_KEY
  //       let city = "Minneapolis"
  //       let state = "MN"
  //       let country = "US"
  //       let limit = 1
  //       const data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${API_KEY}`)
  //       const obj = await data.json();
  //       console.log(obj);
  //       setLocationData(obj);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchLocation();
  // }, [])
  const [locationData, setLocationData] = useState({ city: 'Minneapolis', state: 'MN', country: 'USA' });
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    console.log("Updating the weather!");
  }, [entered])

  return (
    <>
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
          onChange={(e) => {setLocationData({...locationData, city: e.target.value})} }
          />
          <TextField 
          label="State"
          name="state" 
          value={locationData.state} 
          onChange={(e) => setLocationData({...locationData, state: e.target.value})} 
          />
          <TextField 
          label="Country"
          name="country" 
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
      </div>
    </>
  );
}
export default WeatherApp