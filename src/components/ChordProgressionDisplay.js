import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';

const ChordProgressionDisplay = ({ chordProgression }) => {
    if (!chordProgression || chordProgression.length === 0) {
        return <Typography>No chord progression to display.</Typography>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', padding: '20px' }}>
            {chordProgression.map((chord, index) => (
                <Card key={index} style={{ minWidth: '120px', textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h6">{chord.name}</Typography>
                        {/* Additional chord details here */}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ChordProgressionDisplay;
