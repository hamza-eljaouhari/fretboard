import React, {useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Fretboard from './components/Fretboard';
import CircleOfFifths from './components/CircleOfFifths';
import {
  BrowserRouter as Router,
} from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  appBar: {
    display: 'flex',
    padding: '15px',  
    flexDirection: 'row',
    flexWrap: "no-wrap",
    justifyContent: 'space-between'
  },
  content: {
    margin: ' 100px auto'
  },
  circleOfFifths: {
    marginBottom: "25px"
  },
  title: {
    fontSize: '14px'
  },
  seperator: {
    width: '100%',
    fontSize: '14px',
    margin: '10px',
}
}));

export default function App(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={classes.appBar}
        position="fixed"
        >
        <Typography variant="h6">
          Interactive fretboard and circle of fifths
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<FavoriteIcon />}
        >
        Have fun
      </Button>
      </AppBar>
      <main className={classes.content}>
        <Router>
        <table className="content-table">
          <tbody>
            <tr>
              <th>Help :</th>
              <td>
                <Typography variant="h6" className={classes.title}>
                  <ol>
                    <li>You always need to choose a key</li>
                    <li>You can choose whether (1) a scale, (2) an arppegio or (3) a chord formula to display</li>
                    <li>If you choose a scale you can then choose on of its modes</li>
                    <li>You can restrict display by frets of 4 or by position according to the CAGED system</li>
                    <li>You can display intervals whenever you want and toggle notes whenever you want</li>
                    <li>There's a difficulty displapying the comming chord shapes but I'm gonna fix it, no worries</li>
                    <li>I'm going to the remaining arppegios and degrees in the future</li>
                    <li>Enjoy</li>
                  </ol>
                </Typography>
              </td>
            </tr>
            <tr>
              <th>Fretboard :</th>
              <td>
                <Fretboard></Fretboard>
              </td>
            </tr>
            <tr>
              <th>Circle of fifths :</th>
              <td>
                <Typography variant="h6" className={classes.seperator}>
                  Please change the key to point to the next scale.
                </Typography>
                <CircleOfFifths 
                  className={classes.circleOfFifths} 
                  ></CircleOfFifths>
              </td>
            </tr>
            <tr>
              <th>Also coming soon :</th>
              <td>
                <ol>
                  <li>Showing scale degrees on the circle of fifths</li>
                  <li>Composing chord progressions, store and share them via a simple link</li>
                  <li>Detecting chords and scales</li>
                  <li>A tabs reader that plays animation of the note on the fretboard ( why not? )</li>
                  <li>Allowing to customize the guitar tuning and maybe support of more than 6 strings</li>
                  <li>Adding sound to the fretboard</li>
                </ol>
              </td>
            </tr>
          </tbody>
        </table>
      </Router>
        
      </main>
    </div>
  );
};