import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fretboard from '../components/Fretboard';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const PlayAndVisualize = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fretboard hideCircleOfFifths={true} hideChordComposer={true} hideChordProgressor={true} />
    </div>
  );
};

export default PlayAndVisualize;
