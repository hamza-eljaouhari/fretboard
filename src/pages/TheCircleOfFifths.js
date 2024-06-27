import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fretboard from '../components/Fretboard';

const useStyles = makeStyles(() => ({
  root: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));

const TheCircleOfFifths = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fretboard  hideFretboard={true} hideChordProgressor={true} hideFretboardControls={true} hideAddMoreFretboards={true} hideChordComposer={true} />
    </div>
  );
};

export default TheCircleOfFifths;
