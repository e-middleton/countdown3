import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import './../App.css';


const HourlyReport = ( {hourlyData} ) => {
  return (
    <Box sx={{ flexGrow: 1,
        bgcolor: '#39a4cf',
        borderRadius: 2,
        maxWidth: 550,
     }}>
      <List sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: 500,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }} >
        {hourlyData.map((weather, index) => (
          <ListItem key={index}>
            <div className="hourlyEntry">
              <ListItemText sx={{'color':'white'}}>
                {`${weather.startTime.split("T").pop().split(":")[0]}:00`}
              </ListItemText>
              <ListItemText sx={{'color':'white'}}>
                {Math.floor(weather.values.temperature) + "\u00B0" + "F"}
              </ListItemText>
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
export default HourlyReport;