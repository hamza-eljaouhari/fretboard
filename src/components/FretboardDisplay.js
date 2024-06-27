import React from 'react';
import PropTypes from 'prop-types';
import './FretboardDisplay.css'; // Ensure you have the appropriate CSS for styling
import classNames from 'classnames';
import guitar from '../config/guitar';
import { makeStyles } from '@material-ui/core';
import * as Tone from 'tone';
import './guitar-neck.css'

const useStyles = makeStyles((theme) => ({
  fretboardContainer: {
    width: '100%',
    overflowX: 'auto',
    maxWidth: '100vw',
    '&::-webkit-scrollbar': {
      width: '8px',
      borderRadius: '10px',
      height: '8px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
      borderRadius: '10px',
      height: '8px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'grey',
      height: '8px'
    },
  },
  fretboardTable: {
    maxWidth: '1240px',
    width: '1240px',
    minWidth: '1000px',
  },
  table: {
    borderSpacing: 0,
    width: '100%',
  },
  tableRow: {
    margin: 0,
    padding: 0,
  },
  tableData: {
    height: '50px',
    padding: 0,
    borderRight: '1px solid black',
    verticalAlign: 'middle',
    position: 'relative',
    cursor: 'pointer',
    textAlign: 'center', // Center the content horizontally
  },
  note: {
    display: 'inline-block',
    position: 'relative',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid black',
    backgroundColor: 'teal',
    cursor: 'pointer',
    lineHeight: '36px',
    zIndex: 1000,
    transition: 'transform 0.1s ease-in-out', // Add transition for scaling effect
  },
  noteContent: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center', // Center the text inside the note
  },
  noteLine: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: 0,
    margin: 0,
    padding: 0,
    border: 'none',
    borderTop: '1px solid black',
    transform: 'translateY(-50%)',
  },
  root: {
    backgroundColor: 'orange',
  },
  third: {
    backgroundColor: 'red',
  },
  fifth: {
    backgroundColor: 'blue',
  },
  seventh: {
    backgroundColor: 'purple',
  },
  playing: {
    transform: 'scale(1.3)', // Scale up the note when playing
    backgroundColor: 'yellow',
  }
}));

const FretboardDisplay = ({
  boards, 
  handleFretboardSelect, 
  onElementChange 
}) => {
  const classes = useStyles();

  const playNote = (note, octave, stringIndex, fretIndex, fretboardIndex) => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(`${note}${octave}`, '8n');

    const noteElement = document.getElementById(`note-${fretboardIndex}-${stringIndex}-${fretIndex}`);
    if (noteElement) {
      noteElement.classList.add(classes.playing);
      setTimeout(() => {
        noteElement.classList.remove(classes.playing);
      }, 500); // Adjust the timeout duration as needed
    }
  };

  const fretboardElements = boards.map((fretboard, fretboardIndex) => {
    const newRows = [...Array(fretboard.generalSettings.nostrs)].map((_, i) => (
      <tr key={`row-${fretboardIndex}-${i}`} className={classes.tableRow}>
        <td width="20px">
          <input
            value={guitar.notes.flats[fretboard.generalSettings.tuning[i]] || ''}
            onChange={(e) => {
              const newTuning = [...fretboard.generalSettings.tuning];
              if (e.target.value !== '') {
                newTuning[i] = guitar.notes.flats.indexOf(e.target.value);
                onElementChange(newTuning.join('-'), 'tuning');
              }
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #ccc',
              textAlign: 'center',
              outline: 'none',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
            }}
          />
        </td>

        {[...Array(fretboard.generalSettings.nofrets)].map((_, j) => {
          const note = fretboard[fretboard.generalSettings.choice + 'Settings'].fretboard[i][j];
          const displayedNoteIndex = (fretboard.generalSettings.tuning[i] + j) % 12;
          const displayedNote = guitar.notes.sharps[displayedNoteIndex];
          const octave = Math.floor((fretboard.generalSettings.tuning[i] + j) / 12) + 4;

          let newChoice = fretboard.generalSettings.choice;
          let noteIndex = '';

          if (fretboard.generalSettings.choice === 'scale' && fretboard.scaleSettings.scale) {
            const isModalRequest = guitar.scales[fretboard.scaleSettings.scale].isModal;
            newChoice = isModalRequest ? 'mode' : 'scale';
            noteIndex = fretboard[newChoice + 'Settings'].notes.indexOf(note.current);
          }

          return (
            <td key={`note-${fretboardIndex}-${i}-${j}`} className={classes.tableData} onClick={() => playNote(displayedNote, octave, i, j, fretboardIndex)}>
              <div id={`note-${fretboardIndex}-${i}-${j}`} className={classNames({
                [classes.note]: note.show,
                [classes.root]: note.show && (noteIndex === 0 || note.interval === '1'),
                [classes.third]: note.show && (noteIndex === 2 || ["3", "b3"].includes(note.interval)),
                [classes.fifth]: note.show && (noteIndex === 4 || note.interval === '5'),
                [classes.seventh]: note.show && (noteIndex === 6 || ["7", "b7"].includes(note.interval)),
              })}>
                {note.show && (
                  <>
                    <span className={classes.noteContent}>{displayedNote}</span>
                  </>
                )}
              </div>
              <hr className={classes.noteLine} />
            </td>
          );
        })}
      </tr>
    ));

    const newHeads = [
      <th key="tuner"><span className="fretNumber">tuner</span></th>,
      [...Array(fretboard.generalSettings.nofrets)].map((_, i) => (
        <th key={`head-${fretboardIndex}-${i}`} width={fretboard.generalSettings.nofrets - i + 30}>
          <span className="fretNumber">{i}</span>
        </th>
      )),
    ];

    return (
      <div key={`fretboard-${fretboardIndex}`} onFocus={() => handleFretboardSelect(fretboardIndex)} onClick={() => handleFretboardSelect(fretboardIndex)} className={classes.fretboardContainer}>
        <label style={{ fontWeight: "bold" }}>
          #Strings:
          <input type="number" key="strings-changer" style={{ margin: "6px" }} value={fretboard.generalSettings.nostrs} onChange={(e) => onElementChange(e.target.value, 'nostrs')} min="4" max="7" />
        </label>
        <label style={{ fontWeight: "bold" }}>
          #Frets:
          <input type="number" key="frets-changer" style={{ margin: "6px" }} value={fretboard.generalSettings.nofrets} onChange={(e) => onElementChange(e.target.value, 'nofrets')} min="12" max="24" />
        </label>
        <table className={classes.fretboardTable}>
          <tbody>{newRows}</tbody>
          <tfoot>
            <tr>{newHeads}</tr>
          </tfoot>
        </table>
      </div>
    );
  });

  return (
    <div>
      {fretboardElements}
    </div>
  );
};

FretboardDisplay.propTypes = {
  boards: PropTypes.array,
  handleFretboardSelect: PropTypes.func.isRequired,
  onElementChange: PropTypes.func.isRequired,
};

export default FretboardDisplay;
