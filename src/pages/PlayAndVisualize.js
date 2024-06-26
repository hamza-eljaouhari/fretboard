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

const PlayAndVisualize = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <MusicApp 
          showFretboardControls={true} 
          showCircleOfFifths={false} 
          showFretboard={true} 
          showChordComposer={false} 
          showProgressor={false} 
          showSongsSelector={false} />
    </div>
  );
};

export default PlayAndVisualize;
