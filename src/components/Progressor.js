import React, { useState } from 'react';
import SongsSelector from './SongsSelector';

const Progressor = ({ progression, setProgression, playProgression, setProgressionKey, selectedKey, getScaleNotes}) => {

    return (
        <SongsSelector 
        getScaleNotes={getScaleNotes} 
        setProgression={setProgression} 
        progression={progression} 
        playProgression={playProgression} 
        setProgressionKey={setProgressionKey} 
        selectedkey={selectedKey} />
    );
};

export default Progressor;
