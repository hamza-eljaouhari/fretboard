import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { toggleNote } from '../redux/actions'; // Ensure this action is properly defined to handle note toggling

const useStyles = makeStyles((theme) => ({
  formElement: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function TabReader({ toggleNote }) {
  const [tabs, setTabs] = useState('');
  const [practiceRate, setPracticeRate] = useState(1000);
  const classes = useStyles();

  function splitTabSections(pastedContent) {
    // This regex looks for sections that start with string indicators (e.g., "e|")
    // and continues until it hits a line that doesn't start with a guitar string indicator or whitespace.
    // It assumes tab sections are separated by non-tab text or empty lines.
    const tabSectionRegex = /((?:e\|.*\n)|(?:B\|.*\n)|(?:G\|.*\n)|(?:D\|.*\n)|(?:A\|.*\n)|(?:E\|.*\n))+/g;
    
    const sections = [];
    let match;
    while ((match = tabSectionRegex.exec(pastedContent)) !== null) {
      sections.push(match[0]);
    }
    return sections;
  }
  

  function parseNotesFromSection(tabSection) {
    const regex = /\b(\d{1,2}([bhp\/r]\d{1,2})?)\b/g;
    let notes = [];
  
    tabSection.split('\n').forEach((string, stringIndex) => {
      let match;
      while ((match = regex.exec(string)) !== null) {
        // Extract and separate notes and techniques
        const noteDetail = match[0].match(/(\d+)([bhp\/r]?)(\d*)/);
        const fret = noteDetail[1];
        const technique = noteDetail[2];
        const targetFret = noteDetail[3];
  
        // Adjust stringIndex based on your application's string numbering
        notes.push({
          string: stringIndex, // Assuming 6-string guitar, EADGBE
          fret: parseInt(fret),
          technique,
          targetFret: targetFret ? parseInt(targetFret) : null,
          position: match.index
        });
      }
    });
  
    return notes;
  }
  
  function playTabSectionsSequentially(sections) {
    let totalDelay = 0;
    const noteDuration = 500; // Duration for how long a note should be shown, adjust as needed
  
    sections.forEach((section, sectionIndex) => {
      const notes = parseNotesFromSection(section);
  
      notes.forEach((note, noteIndex) => {
        // Schedule to toggle the note on
        setTimeout(() => {
          // Toggle the note on
          toggleNote(note.string, note.fret, true); // Assuming toggleNote accepts a parameter to toggle on/off
        }, totalDelay + noteIndex * practiceRate);
  
        // Schedule to toggle the note off after `noteDuration`
        setTimeout(() => {
          // Toggle the note off
          toggleNote(note.string, note.fret, false); // Adjust this call based on your toggleNote implementation
        }, totalDelay + noteIndex * practiceRate + noteDuration);
      });
  
      // Adjust totalDelay for the next section, including the time to show the last note
      totalDelay += notes.length * practiceRate + noteDuration;
    });
  }
  

  const handlePlayTabs = () => {
    const sections = splitTabSections(tabs);
    playTabSectionsSequentially(sections);
  };

  return (
    <section>
      <TextField
        multiline
        id="tab-input"
        label="Guitar Tabs"
        variant="filled"
        value={tabs}
        fullWidth
        onChange={(e) => setTabs(e.target.value)}
      />
      <FormControl className={classes.formElement}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlayTabs}
        >
          Play Tabs
        </Button>
      </FormControl>
      <FormControl className={classes.formElement}>
        <InputLabel htmlFor="practice-rate">Rate in ms:</InputLabel>
        <Select
          native
          value={practiceRate}
          onChange={(e) => setPracticeRate(Number(e.target.value))}
          inputProps={{
            name: 'practiceRate',
            id: 'practice-rate',
          }}
        >
          {[1000, 1500, 2000, 2500, 3000].map((rate) => (
            <option key={rate} value={rate}>{rate}</option>
          ))}
        </Select>
      </FormControl>
    </section>
  );
}

export default connect(null, { toggleNote })(TabReader);
