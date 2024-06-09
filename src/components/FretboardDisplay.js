
import React from 'react';
import classNames from 'classnames'; // Ensure you've installed and imported classNames
import guitar from '../config/guitar';

const FretboardDisplay = ({
  fretboards,
  onElementChange,
  getNoteIndex,
  toggleNote,
  handleFretboardSelect,
  choice
}) => {
  // Updated logic to render each fretboard with its rows and heads
  const fretboardElements = fretboards.map((fretboard, fretboardIndex) => {
    // Construct rows and heads for the fretboard
    const newRows = [...Array(fretboard.generalSettings.nostrs)].map((_, i) => (
      <tr key={`row-${fretboardIndex}-${i}`}>
        <td>
          Tuning
          <input
            value={guitar.notes.flats[fretboard.generalSettings.tuning[i]] || ''}
            onChange={(e) => {
              console.log(`for string ${i + 1}`, guitar.notes.flats[fretboard.generalSettings.tuning[i]])
              const newTuning = JSON.parse(JSON.stringify(fretboard.generalSettings.tuning));
              if(e.target.value !== ''){
                newTuning[i] = parseInt(guitar.notes.flats.indexOf(e.target.value));
                onElementChange(newTuning.join('-'), 'tuning');
              } 
            }}
            style={{ width: '50px' }}
          />
        </td>
        {[...Array(fretboard.generalSettings.nofrets)].map((_, j) => {
          const note = fretboard.fretboard[i][j];
          const displayedNoteIndex = (fretboard.generalSettings.tuning[i] + j) % 12;
          const displayedNote = guitar.notes.sharps[displayedNoteIndex];
          const isModalRequest = fretboard.modeSettings.mode >= 0;
          const newChoice = isModalRequest ? 'mode' : 'scale';
          const noteIndex = fretboard[newChoice + 'Settings'].notes.indexOf(note.current);
         
          console.log(fretboard)

          return (
            <td key={`note-${i}-${j}`} onClick={() => toggleNote(i, j)}>
              <span
                className={classNames({
                  'note': note.show === true,
                  'root': noteIndex === 0,
                  'third': noteIndex === 2,
                  'fifth': noteIndex === 4,
                  'seventh': noteIndex === 6
                })}
              >
                {note.show && displayedNote}
              </span>
              <hr />
            </td>
          );
        })}
      </tr>
    ));

    const newHeads = [...Array(fretboard.generalSettings.nofrets)].map((_, i) => (
      <th key={`head-${fretboardIndex}-${i}`} width={fretboard.generalSettings.nofrets - i + 30}>
        <span className="fretNumber">{i}</span>
      </th>
    ));

    // Construct the full fretboard element
    return (
      <div key={`fretboard-${fretboardIndex}`} onFocus={() => handleFretboardSelect(fretboardIndex)} onClick={() => handleFretboardSelect(fretboardIndex)}>
        <label>
          Number of Strings:
          <input type="number" key="strings-changer" value={fretboard.generalSettings.nostrs} onChange={(e) => onElementChange(e.target.value, 'nostrs')} min="4" max="12" />
        </label>
        <label>
          Number of Frets:
          <input type="number" key="frets-changer" value={fretboard.generalSettings.nofrets} onChange={(e) => onElementChange(e.target.value, 'nofrets')} min="12" max="24" />
        </label>
        <table>
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