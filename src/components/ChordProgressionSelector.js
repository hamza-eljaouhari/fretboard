import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, makeStyles } from '@material-ui/core';
import { commonChordProgressions, keys } from '../config/commonChordProgressions';
import guitar from '../config/guitar';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 200,
        margin: theme.spacing(2),
    },
    buttonGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const ChordProgressionSelector = ({ chordProgression, setChordProgression, playChordProgression}) => {
    const classes = useStyles();
    const history = useHistory();
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
            <FormControl className={classes.formControl}>
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

            <FormControl className={classes.formControl}>
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

            <div className={classes.buttonGroup}>
                <Button onClick={generateChordProgression} variant="contained" color="primary" className={classes.button}>
                    Generate Chord Progression
                </Button>
                <Button onClick={playChordProgression} variant="contained" color="secondary" className={classes.button}>
                    Play Chord Progression
                </Button>
            </div>
        </div>
    );
};

export default ChordProgressionSelector;
