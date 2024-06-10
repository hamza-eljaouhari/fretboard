import React, { useState } from 'react';
import SongsSelector from './SongsSelector';

const Progressor = ({ progression, setProgression, playProgression, setProgressionKey, selectedKey, getScaleNotes}) => {

    return (
        <div>
            <SongsSelector 
            getScaleNotes={getScaleNotes} 
            setProgression={setProgression} 
            progression={progression} 
            playProgression={playProgression} 
            setProgressionKey={setProgressionKey} 
            selectedkey={selectedKey} />
        </div>
    );
};

export default Progressor;
