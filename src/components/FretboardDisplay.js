import React, { useState, useEffect } from 'react';
import classNames from 'classnames'; // Ensure you've installed and imported classNames
import guitar from '../config/guitar';

// Assuming guitar, toggleNote, getNoteIndex, handleTuneChange are imported or defined elsewhere

const FretboardDisplay = ({ fretboards, onElementChange, getNoteIndex, numberOfFrets, toggleNote, handleFretboardSelect, chordProgression, selectedFretboardIndex}) => {
  // Updated logic to render each fretboard with its rows and heads
  const fretboardElements = fretboards.map((fretboard, fretboardIndex) => {
    // Construct rows and heads for the fretboard
    const newRows = [...Array(fretboard.nostr)].map((_, i) => (
      <tr key={`row-${fretboardIndex}-${i}`}>
        <td>
          Tuning
          <input
            value={fretboard.tuning.length > i ? guitar.notes.flats[fretboard.tuning[i]] : ''}
            onChange={(e) => {
                    const newTuning = [...fretboard.tuning];

                    newTuning[i] = guitar.notes.flats.indexOf(e.target.value);
                    onElementChange(newTuning.join('-'), 'tunes')
            }}
            style={{ width: '50px' }}
          />
        </td>
        {[...Array(fretboard.nofrets)].map((_, j) => {
          const note = fretboard.fretboard[i][j];
          return (
            <td key={`note-${i}-${j}`} onClick={() => toggleNote(i, j)}>
              <span className={classNames({
                'note': note.show === true,
                'root': getNoteIndex(note.current, fretboard) === 0,
                "third": getNoteIndex(note.current, fretboard) === 2,
                'fifth': getNoteIndex(note.current, fretboard) === 4,
                'seventh': getNoteIndex(note.current, fretboard) === 6
              })}>
                {note.show && note.current}
              </span>
              <hr />
            </td>
          );
        })}
      </tr>
    ));

    const newHeads = [...Array(fretboard.nofrets)].map((_, i) => (
      <th key={`head-${fretboardIndex}-${i}`} width={fretboard.nofrets - i + 30}>
        <span className="fretNumber">{i}</span>
      </th>
    ));

    // Construct the full fretboard element
    return (
      <div key={`fretboard-${fretboardIndex}`}  onFocus={() => {handleFretboardSelect(fretboardIndex)}}  onClick={() => {handleFretboardSelect(fretboardIndex)}}>
        <label>
            Number of Strings:
            <input type="number" key="strings-changer" value={fretboard.nostr} onChange={(e) => onElementChange(e.target.value, 'nostr')} min="4" max="12" />
        </label>
        <label>
            Number of Frets:
            <input type="number" key="frets-changer" value={fretboard.nofrets} onChange={(e) => onElementChange(e.target.value, 'nofrets')} min="12" max="24" />
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
