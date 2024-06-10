
import React from 'react';
import classNames from 'classnames'; // Ensure you've installed and imported classNames
import guitar from '../config/guitar';

const FretboardDisplay = ({
  boards,
  onElementChange,
  handleFretboardSelect,
}) => {
  // Updated logic to render each fretboard with its rows and heads
  const fretboardElements = boards.map((fretboard, fretboardIndex) => {
    // Construct rows and heads for the fretboard
    const newRows = [...Array(fretboard.generalSettings.nostrs)].map((_, i) => (
      <tr key={`row-${fretboardIndex}-${i}`}>
        <td>
          <input
            value={guitar.notes.flats[fretboard.generalSettings.tuning[i]] || ''}
            onChange={(e) => {
              const newTuning = JSON.parse(JSON.stringify(fretboard.generalSettings.tuning));
              if(e.target.value !== ''){
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
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)'
            }}
          />
        </td>

        {[...Array(fretboard.generalSettings.nofrets)].map((_, j) => {
          const note = fretboard[fretboard.generalSettings.choice + 'Settings'].fretboard[i][j];
          const displayedNoteIndex = (fretboard.generalSettings.tuning[i] + j) % 12;
          const displayedNote = guitar.notes.sharps[displayedNoteIndex];
          
          let newChoice = fretboard.generalSettings.choice;
          let noteIndex = '';

          if(fretboard.generalSettings.choice === 'scale' && fretboard.scaleSettings.scale) {
            const isModalRequest = guitar.scales[fretboard.scaleSettings.scale].isModal;
            newChoice = isModalRequest ? 'mode' : 'scale';
            noteIndex = fretboard[newChoice + 'Settings'].notes.indexOf(note.current);
          } 

         
          return (
            // <td key={`note-${i}-${j}`} onClick={() => toggleNote(i, j)}>
            <td key={`note-${i}-${j}`}>
              <span
                className={classNames({
                  'note': note.show === true,
                  'root': noteIndex === 0 || note.interval === '1',
                  'third': noteIndex === 2 || ["3", "b3"].includes(note.interval) === true,
                  'fifth': noteIndex === 4 || note.interval === '5',
                  'seventh': noteIndex === 6 || ["7", "b7"].includes(note.interval) === true
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

    const newHeads = [
      (
      <th key="tuner" width={fretboard.generalSettings.nofrets + 30}>
        <span className="fretNumber">tuner</span>
      </th>
      ),
      [...Array(fretboard.generalSettings.nofrets)].map((_, i) => (
        <th key={`head-${fretboardIndex}-${i}`} width={fretboard.generalSettings.nofrets - i + 30}>
          <span className="fretNumber">{i}</span>
        </th>
      ))
    ];

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
        <table className="fretboard-table">
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