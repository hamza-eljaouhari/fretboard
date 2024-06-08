import React, { useState } from 'react';
import { commonChordProgressions, keys } from '../config/commonChordProgressions';
import { Button, Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core';
import config from '../config/guitar';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  }
}));

const ProgressionSelector = ({ setChordProgression, playChordProgression }) => {
  const classes = useStyles();
  const [selectedProgression, setSelectedProgression] = useState('');
  const [selectedKey, setSelectedKey] = useState('');

  const handleProgressionChange = (event) => {
    setSelectedProgression(event.target.value);
  };

  const handleKeyChange = (event) => {
    setSelectedKey(event.target.value);
  };

  const handleApplyProgression = () => {
    if (selectedProgression && selectedKey) {
      const progression = commonChordProgressions.find(prog => prog.name === selectedProgression);
      console.log("progression selected", progression)

      if (progression) {
        const transposedChords = progression.chords.map((chord, index) => {
          const rootIndex = config.notes.sharps.indexOf(chord.rootNote);
          const transposedRootIndex = (rootIndex + keys.indexOf(selectedKey)) % 12;
          return {
            key: transposedRootIndex,
            chord: chord.quality,
            shape: chord.shape,
            fret: chord.cagedShape[0], // Assuming the fret value is stored in the first position
            highlighted: false,
            quality: chord.quality,
            id: index + 1
          };
        });

        console.log("transposed", transposedChords);
        setChordProgression(transposedChords);
      }
    }
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="key-select-label">Key</InputLabel>
        <Select
          labelId="key-select-label"
          value={selectedKey}
          onChange={handleKeyChange}
        >
          {keys.map((key, index) => (
            <MenuItem key={index} value={key}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="progression-select-label">Progression</InputLabel>
        <Select
          labelId="progression-select-label"
          value={selectedProgression}
          onChange={handleProgressionChange}
        >
          {commonChordProgressions.map((progression, index) => (
            <MenuItem key={index} value={progression.name}>{progression.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleApplyProgression}
      >
        Apply Progression
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={playChordProgression}
      >
        Play Progression
      </Button>
    </div>
  );
};

export default ProgressionSelector;
