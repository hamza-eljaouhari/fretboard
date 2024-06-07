import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { commonChordProgressions, keys } from '../config/commonChordProgressions';
import guitar from '../config/guitar';

const ChordProgressionSelector = ({ setChordProgression }) => {
    const [selectedProgression, setSelectedProgression] = useState(commonChordProgressions[0].name);
    const [selectedKey, setSelectedKey] = useState(keys[0]);

    const handleProgressionChange = (e) => {
        setSelectedProgression(e.target.value);
    };

    const handleKeyChange = (e) => {
        setSelectedKey(e.target.value);
    };

    const generateChordProgression = () => {
        const progression = commonChordProgressions.find(prog => prog.name === selectedProgression);
        const keyIndex = guitar.notes.sharps.indexOf(selectedKey);
        const chordProgression = progression.chords.map((chord, index) => {
            const [degree, chordName, shape] = chord.split('-');
            const chordDegreeIndex = (parseInt(degree) + keyIndex) % 12;
            let chordQuality = '';
            switch (chordName) {
                case 'M':
                    chordQuality = 'Major';
                    break;
                case 'm':
                    chordQuality = 'Minor';
                    break;
                case 'dim':
                    chordQuality = 'Diminished';
                    break;
                default:
                    break;
            }
            return {
                key: chordDegreeIndex,
                chord: chordName,
                shape,
                fret: null,
                highlighted: false,
                quality: chordQuality,
                id: index + 1
            };
        });
        setChordProgression(chordProgression);
    };

    return (
        <div>
            <FormControl>
                <InputLabel id="progression-label">Chord Progression</InputLabel>
                <Select
                    labelId="progression-label"
                    value={selectedProgression}
                    onChange={handleProgressionChange}
                >
                    {commonChordProgressions.map((progression, index) => (
                        <MenuItem key={index} value={progression.name}>{progression.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="key-label">Key</InputLabel>
                <Select
                    labelId="key-label"
                    value={selectedKey}
                    onChange={handleKeyChange}
                >
                    {keys.map((key, index) => (
                        <MenuItem key={index} value={key}>{key}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button onClick={generateChordProgression} variant="contained" color="primary">
                Generate Chord Progression
            </Button>
        </div>
    );
};

export default ChordProgressionSelector;
