import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TabReader from './components/TabReader';
import Fretboard from './components/Fretboard';
import Partitions from './components/Partitions';
import CircleOfFifths from './components/CircleOfFifths';
import {
  BrowserRouter as Router,
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appBar: {
    display: 'flex',
    padding: '15px',  
    flexDirection: 'row',
    flexWrap: "no-wrap",
    justifyContent: 'space-between'
  },
 
  controlsContainer: {
    flex: 1, // Adjust based on your layout needs
    overflowY: 'auto', // Make only this container scrollable
    maxHeight: 'calc(100vh - 64px)', // Adjust the height to prevent controls from going under the AppBar. Assumes AppBar height is 64px.
  },
  fixedSection: {
    display: 'flex',
    flexDirection: 'row', // Layout the fretboard and Circle of Fifths side by side
    justifyContent: 'flex-start',
    alignItems: 'start',
    flex: 3, // Adjust based on your layout needs
  },
  circleOfFifths: {
    // Your existing circleOfFifths styles
    flex: 1, // Make the Circle of Fifths take up 1/4 of the fixed section
  },
  // You might need additional styles for the fretboard section to adjust its width
}));

export default function App(props) {
  const classes = useStyles();
  const [title, setTitle] = useState('Choose something to display...');

  function onSetTitle(title){
    setTitle(title);
  }

  return (
    <main className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar className={classes.appBar} position="fixed">
          <Typography variant="h6">Interactive fretboard and circle of fifths</Typography>
          <Button variant="contained" color="secondary" startIcon={<FavoriteIcon />}>Have fun</Button>
        </AppBar>
        <Fretboard onSetTitle={onSetTitle} />
      </Router>
    </main>
  );
};