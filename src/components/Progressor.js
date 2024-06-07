import React, { useState } from 'react';
import ChordProgressionSelector from './ChordProgressionSelector';
import ChordProgressionDisplay from './ChordProgressionDisplay';

const Progressor = ({ chordProgression, setChordProgression, playChordProgression }) => {

    return (
        <div>
            <ChordProgressionSelector setChordProgression={setChordProgression} playChordProgression={playChordProgression} />
            <ChordProgressionDisplay chordProgression={chordProgression} setChordProgression={setChordProgression} />
        </div>
    );
};

export default Progressor;
