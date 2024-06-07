import React, { useState } from 'react';
import ChordProgressionSelector from './ChordProgressionSelector';
import ChordProgressionDisplay from './ChordProgressionDisplay';

const Progressor = ({ chordProgression, setChordProgression }) => {

    return (
        <div>
            <ChordProgressionSelector setChordProgression={setChordProgression} />
            <ChordProgressionDisplay chordProgression={chordProgression} setChordProgression={setChordProgression} />
        </div>
    );
};

export default Progressor;
