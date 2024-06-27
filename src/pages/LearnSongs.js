import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fretboard from '../components/Fretboard';
import Progressor from '../components/Progressor';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const LearnSongs = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fretboard hideCircleOfFifths={true} hideChordComposer={true} hideFretboardControls={true} />
    </div>
  );
};

export default LearnSongs;
