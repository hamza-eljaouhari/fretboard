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
    padding: '100px 0'
  },
  appBar: {
    display: 'flex',
    padding: '15px',  
    flexDirection: 'row',
    flexWrap: "no-wrap",
    justifyContent: 'space-between'
  }
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