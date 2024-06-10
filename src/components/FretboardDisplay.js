import React from 'react';
import classNames from 'classnames';
import guitar from '../config/guitar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  fretboardContainer: {
    width: '100%',
    overflowX: 'auto',
    maxWidth: '100vw',
  },
  fretboardTable: {
    maxWidth: '1550px',
    width: '1550px',
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
    zIndex: 1000
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
}));

const FretboardDisplay = ({
  boards,
  onElementChange,
  handleFretboardSelect,
}) => {
  const classes = useStyles();
  // Updated logic to render each fretboard with its rows and heads
  const fretboardElements = boards.map((fretboard, fretboardIndex) => {
    // Construct rows and heads for the fretboard
    const newRows = [...Array(fretboard.generalSettings.nostrs)].map((_, i) => (
      <tr key={`row-${fretboardIndex}-${i}`} className={classes.tableRow}>
        <td width="20px">
          <input
            value={guitar.notes.flats[fretboard.generalSettings.tuning[i]] || ''}
            onChange={(e) => {
              const newTuning = JSON.parse(JSON.stringify(fretboard.generalSettings.tuning));
              if (e.target.value !== '') {
                newTuning[i] = parseInt(guitar.notes.flats.indexOf(e.target.value));
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

          let newChoice = fretboard.generalSettings.choice;
          let noteIndex = '';

          if (fretboard.generalSettings.choice === 'scale' && fretboard.scaleSettings.scale) {
            const isModalRequest = guitar.scales[fretboard.scaleSettings.scale].isModal;
            newChoice = isModalRequest ? 'mode' : 'scale';
            noteIndex = fretboard[newChoice + 'Settings'].notes.indexOf(note.current);
          }

          return (
            // <td key={`note-${i}-${j}`} onClick={() => toggleNote(i, j)}>
            <td key={`note-${i}-${j}`} className={classes.tableData}>
              <div className={classNames({
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
      (
        <th key="tuner">
          <span className="fretNumber">tuner</span>
        </th>
      ),
      [...Array(fretboard.generalSettings.nofrets)].map((_, i) => (
        <th key={`head-${fretboardIndex}-${i}`} width={fretboard.generalSettings.nofrets - i + 30}>
          <span className="fretNumber">{i}</span>
        </th>
      )),
    ];

    // Construct the full fretboard element
    return (
      <div key={`fretboard-${fretboardIndex}`} onFocus={() => handleFretboardSelect(fretboardIndex)} onClick={() => handleFretboardSelect(fretboardIndex)} className={classes.fretboardContainer}>
        <label style={{
          fontWeight: "bold",
        }}>
          #Strings:
          <input type="number" key="strings-changer" style={{
            margin: "6px",
          }} value={fretboard.generalSettings.nostrs} onChange={(e) => onElementChange(e.target.value, 'nostrs')} min="4" max="12" />
        </label>
        <label style={{
          fontWeight: "bold",
        }}>
          #Frets:
          <input type="number" key="frets-changer" style={{
            margin: "6px"
          }} value={fretboard.generalSettings.nofrets} onChange={(e) => onElementChange(e.target.value, 'nofrets')} min="12" max="24" />
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

export default FretboardDisplay;
