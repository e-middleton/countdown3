import './../App.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import imageName from './imageName.json' with {type:'json'}

const SevenDayWeather = ( {weeklyData} ) => {
  return (
    <>
      <div>
        <h3>6 day forcast</h3>
        <Box sx={{ flexGrow: 1,
          bgcolor: '#6a7275',
          borderRadius: 2,
          maxWidth: 550,
        }}>
          <List sx={{
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            '& ul': { padding: 0 },
          }} >
          {weeklyData.map((weather, index) => (
              <ListItem key={index}>
                <div className="weeklyEntry">
                  <ListItemText sx={{'color':'white'}}>
                    {weather.date}
                  </ListItemText>
                  <img style={{maxWidth:'30%'}} 
                    src={imageName[weather.weatherCode] ? `./src/assets/tomorrow-weather-codes/V2_icons/small/png/${weather.weatherCode}0_${imageName[weather.weatherCode]}_small.png` : 
                    null} 
                    alt="weather symbol" 
                  />
                  <ListItemText sx={{'color':'white'}}>
                    {"H: "+Math.ciel(weather.H) + "\u00B0" + "F" + " L: " + Math.floor(weather.L) +"\u00B0" + "F" }
                  </ListItemText>
                </div>
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    </>
  );
}
export default SevenDayWeather