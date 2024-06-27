import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MusicApp from '../components/MusicApp';

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
      <MusicApp />
    </div>
  );
};

export default TheCircleOfFifths;
