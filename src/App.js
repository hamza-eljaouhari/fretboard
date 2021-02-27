import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Mood from '@material-ui/icons/Mood';

import Fretboard from './components/Fretboard';
import CircleOfFifths from './components/CircleOfFifths';

const leftDrawerWidth = 240;
const rightDrawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    display: 'flex',
    padding: '15px',  
    flexDirection: 'row',
    flexWrap: "no-wrap",
    justifyContent: 'space-between',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);
  const [circleOfFifthsRotation, setCircleOfFifthsRotation] = React.useState(221.5);
  const [dashesRotation, setDashesRotation] = React.useState(10);

  const handleLeftDrawerClose = () => {
    setLeftOpen(false);
  };

  const handleRightDrawerClose = () => {
    setRightOpen(false);
  };

  const handleLeftDrawerOpen = () => {
    setLeftOpen(true);
  };

  const handleRightDrawerOpen = () => {
    setRightOpen(true);
  };

  const onKeyChange = (key) => {
    var k = parseInt(key);
    var orderOfNote = k;

    if(k % 2 !== 0){
      orderOfNote = k > 6 ? k - 6 : k + 6;
    }

    var value = (((orderOfNote / 12 ) * 360) + 221.5) % 360;

    setCircleOfFifthsRotation(value);
    setDashesRotation(((orderOfNote + 1) * 30) + 10);
  }

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
        <table className="content-table">
            <tr>
              <th>Help :</th>
              <td>
                <Typography variant="h6" className={classes.title}>
                  <ol>
                    <li>Choose a key</li>
                    <li>Then choose a scale and a mode if given the option</li>
                    <li>Or choose an arppegio or a chord</li>
                    <li>Then choose one of the five positions on the fretboard</li>
                    <li>Practice makes perfect <Mood/></li>
                  </ol>
                </Typography>
              </td>
            </tr>
            <tr>
              <th>Fretboard :</th>
              <td>
                <Fretboard 
                  onKeyChange={onKeyChange}
                  ></Fretboard>
              </td>
            </tr>
            <tr>
              <th>Circle of fifth :</th>
              <td>
                <CircleOfFifths 
                  className={classes.circleOfFifths} 
                  circleOfFifthsRotation={circleOfFifthsRotation} 
                  dashesRotation={dashesRotation}
                  ></CircleOfFifths>
              </td>
            </tr>
        </table>
        
      </main>
    </div>
  );
}
