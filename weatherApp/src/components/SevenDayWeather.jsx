import './../App.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';

const SevenDayWeather = ( {weeklyData} ) => {
  return (
    <>
      <div className="weeklyForcast">
        <Box sx={{ flexGrow: 1,
          bgcolor: '#147ba0',
          borderRadius: 2,
          minWidth: '100%',
        }}>
          <h3 style={{color:'white',textAlign:'center', maxHeight:'0.45em'}}>
            6 day forcast
          </h3>
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
                  <ListItemText sx={{'color':'white'}}>
                  {"H: "+ Math.floor(weather.H) + "\u00B0" + "F" + " L: " + Math.floor(weather.L) +"\u00B0" + "F" }
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