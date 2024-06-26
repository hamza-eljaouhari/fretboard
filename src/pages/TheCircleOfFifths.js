import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MusicApp from '../parent/MusicApp';

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
      <MusicApp 
        showFretboardControls={false} 
        showCircleOfFifths={true} 
        showFretboard={false} 
        showChordComposer={false} 
        showProgressor={false} 
        showSongsSelector={false} />
    </div>
  );
};

export default TheCircleOfFifths;
