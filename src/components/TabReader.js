import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { toggleNote } from '../redux/actions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formElement: {
    flex: '1 0 21%',
    margin: '10px'
  },
}));

function TabReader({ toggleNote }) {
  const [tabs, setTabs] = useState(`e|--------------------------------------------------------------------|
B|-------10h12b15---10-12----------7----------------------------------|
G|--/11-------------------9----7-9---7--------------------------------|
D|-------------------------------------8----9h11p9p7b8----------------|
A|--------------------------------------------------------------------|
E|--------------------------------------------------------------------|`);

const [practiceRate, setPracticeRate] = useState(1000);
const [shouldReadTabs, setShouldReadTabs] = useState(true);
const classes = useStyles();

  const parseTabs = (tabs) => {
    const explodedStrings = tabs.split('\n');

    const notesFrets = explodedStrings.map((string) =>
      [...string.matchAll(/[0-9]{1,2}|-/g)].map((match) =>
        match[0] === '-' ? null : parseInt(match[0])
      )
    );

    const notes = [];
    for (let colIndex = 0; colIndex < notesFrets[0].length; colIndex++) {
      for (let rowIndex = 0; rowIndex < notesFrets.length; rowIndex++) {
        const note = notesFrets[rowIndex][colIndex];
        if (note !== null && note !== undefined) {
          notes.push({ string: rowIndex, fret: note });
        }
      }
    }
    return notes;
  };

  const readTabs = () => {

    if(shouldReadTabs === true){
      const notes = parseTabs(tabs);
      setShouldReadTabs(false);

      notes.forEach((note, noteIndex) => {
        setTimeout(() => {
          toggleNote(note.string, note.fret);
          setTimeout(() => {
            toggleNote(note.string, note.fret);
          }, practiceRate);
        }, practiceRate * noteIndex);
      });
      
      setTimeout(() => {
        setShouldReadTabs(true);
      }, practiceRate * notes.length);
    }
  };

  return (
    <section>
      <TextField
        multiline={true}
        id="filled-basic"
        label="Guitar Tabs"
        variant="filled"
        value={tabs}
        fullWidth={true}
        onChange={(e) => setTabs(e.target.value)}
      />
      <FormControl 
        className={classes.formElement}
        variant="outlined" margin="normal">
        <Button
          className={classes.formElement}
          variant="contained"
          color="primary"
          size="medium"
          onClick={readTabs}
        >
          Play Tabs
        </Button>
      </FormControl>
      <FormControl 
        className={classes.formElement}
        variant="outlined" margin="normal">
        <InputLabel htmlFor="practce-rate">Rate in ms :</InputLabel>
        <Select
        id="practce-rate"
        native
        value={practiceRate}
        onChange={(e) => {
          if(shouldReadTabs
            ){
            setPracticeRate(e.target.value)
          }
        }}
        label="Keys :"
        >
        {
          [
            1000,
            1500,
            2000,
            2500,
            3000
          ].map((value) => {
            return <option key={value} >{value}</option>
          })
        }
        </Select>
      </FormControl>
                    
    </section>
  );
}

export default connect(null, { toggleNote })(TabReader);
    