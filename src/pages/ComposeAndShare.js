import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fretboard from '../components/Fretboard';
import ChordComposer from '../components/ChordComposer';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ComposeAndShare = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ChordComposer />
    </div>
  );
};

export default ComposeAndShare;
