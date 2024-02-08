import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import guitar from '../config/guitar';

const ChordProgressionDisplay = ({ chordProgression }) => {
    if (!chordProgression || chordProgression.length === 0) {
        return <Typography>No chord progression to display.</Typography>;
    }

    console.log(chordProgression)
    return (
        <div style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap', gap: '16px', padding: '20px' }}>
            {chordProgression.map((object, index) => (
                <Card key={index} style={{ minWidth: '120px', textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h6">{ guitar.notes.sharps[object.key] }{ object.chord }</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ChordProgressionDisplay;
