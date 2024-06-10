import React, { useState } from 'react';
import ChordProgressionSelector from './ChordProgressionSelector';
import ChordProgressionDisplay from './ChordProgressionDisplay';

const Progressor = ({ progression, setProgression, playProgression }) => {

    return (
        <div>
            <ChordProgressionSelector setProgression={setProgression} playProgression={playProgression} />
            <ChordProgressionDisplay progression={progression} setProgression={setProgression} />
        </div>
    );
};

export default Progressor;
