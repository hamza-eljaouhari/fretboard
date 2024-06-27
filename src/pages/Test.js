import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MusicApp from '../components/MusicApp';

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
        <MusicApp />
    </div>
  );
};

export default PlayAndVisualize;