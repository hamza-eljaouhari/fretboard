import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MusicApp from '../parent/MusicApp';

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
      <MusicApp 
        showFretboardControls={false} 
        showCircleOfFifths={false} 
        showFretboard={true} 
        showChordComposer={false} 
        showProgressor={true} 
        showSongsSelector={true} />
    </div>
  );
};

export default LearnSongs;
