import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircleOfFifths from '../components/CircleOfFifths';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const TheCircleOfFifths = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircleOfFifths />
    </div>
  );
};

export default TheCircleOfFifths;
