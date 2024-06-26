import React from 'react';
import { Typography, Button, Select, MenuItem, FormControl, makeStyles, InputLabel, Grid } from '@material-ui/core';
import guitar from '../config/guitar.js';

const useStyles = makeStyles((theme) => ({
    choiceButton: {
        margin: 10
    },
    button: {
        width: '100%'
    },
    selectContainer: {
        width: '100%', // For mobile screens
        [theme.breakpoints.up('sm')]: {
            width: '100%', // For desktop screens
        },
    },
    chordSelect: {
        width: '50%', // 50% width for both mobile and desktop screens
    },
}));

const FretboardControls = ({
    choice,
    handleChoiceChange,
    keySignature,
    onElementChange,
    buttonText,
    scaleModes,
    arppegiosNames,
    onCleanFretboard,
    onCopyLink,
    selectedMode,
    selectedScale,
    selectedChord,
    selectedArppegio,
    selectedFret,
    selectedShape,
    addToProgression,
    saveProgression,
    playProgression,
    progression,
    playSelectedNotes
}) => {
    const classes = useStyles();

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    const handleButtonClick = (newChoice) => {
        handleChoiceChange(newChoice);
    };

    return (
        <footer>
            <div className={classes.buttonGroup}>
                <Button
                    size="small"
                    variant={choice === 'scale' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleButtonClick('scale')}
                    className={classes.choiceButton}
                >
                    Scales
                </Button>
                <Button
                    size="small"
                    variant={choice === 'chord' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleButtonClick('chord')}
                    className={classes.choiceButton}
                >
                    Chords
                </Button>
                <Button
                    size="small"
                    variant={choice === 'arppegio' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleButtonClick('arppegio')}
                    className={classes.choiceButton}
                >
                    arppegios
                </Button>
            </div>

            <Grid container spacing={2}>
                {choice === 'scale' && (
                    <>
                        <Grid item xs={12}>
                            <KeySelector choice={choice} keySignature={keySignature} onElementChange={onElementChange} classes={classes}  />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.selectContainer}>
                                <InputLabel id="scale-name-label">Choose Scale</InputLabel>
                                <Select
                                    labelId="scale-name-label"
                                    id="scale-name-select"
                                    value={selectedScale}
                                    onChange={(e) => onElementChange(e.target.value, 'scale')}
                                    displayEmpty
                                    className={classes.selectContainer}
                                >
                                    {Object.keys(guitar.scales).map((scaleName, index) => (
                                        <MenuItem key={index} value={scaleName}>{capitalize(scaleName)}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {scaleModes.length > 0 && (
                            <Grid item xs={12}>
                                <FormControl className={classes.selectContainer}>
                                    <InputLabel id="scale-mode-label">Choose Mode</InputLabel>
                                    <Select
                                        labelId="scale-mode-label"
                                        id="scale-mode-select"
                                        value={selectedMode}
                                        onChange={(e) => onElementChange(e.target.value, 'mode')}
                                        displayEmpty
                                        className={classes.selectContainer}
                                    >
                                        {scaleModes.map((mode, index) => (
                                            <MenuItem key={index} value={index}>{mode.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                    </>
                )}

                {choice === 'chord' && (
                    <>
                        <Grid item xs={12}>
                            <KeySelector choice={choice} keySignature={keySignature} onElementChange={onElementChange} classes={classes} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.selectContainer}>
                                <InputLabel id="chord-name-label">Choose Chord</InputLabel>
                                <Select
                                    labelId="chord-name-label"
                                    id="chord-name-select"
                                    value={selectedChord}
                                    onChange={(e) => onElementChange(e.target.value, 'chord')}
                                    displayEmpty
                                    className={classes.select}
                                >
                                    {Object.keys(guitar.arppegios).map((chordName, index) => (
                                        <MenuItem key={index} value={chordName}>{chordName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.selectContainer}>
                                <InputLabel id="shape-label">Choose Shape</InputLabel>
                                <Select
                                    labelId="shape-label"
                                    id="shape-select"
                                    value={selectedShape}
                                    onChange={(e) => onElementChange(e.target.value, 'shape')}
                                    displayEmpty
                                    className={classes.select}
                                >
                                    {guitar.shapes.names.map((shapeName, index) => (
                                        <MenuItem key={index} value={shapeName}>{shapeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.selectContainer}>
                                <InputLabel id="fret-label">Choose Fret</InputLabel>
                                <Select
                                    labelId="fret-label"
                                    id="fret-select"
                                    value={selectedFret}
                                    onChange={(e) => onElementChange(e.target.value, 'fret')}
                                    displayEmpty
                                    className={classes.select}
                                >
                                    {Array.from({ length: guitar.numberOfFrets }, (_, i) => i + 1).map((fretNumber, index) => (
                                        <MenuItem key={index} value={fretNumber}>{fretNumber}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </>
                )}

                {choice === 'arppegio' && (
                    <>
                        <Grid item xs={12}>
                            <KeySelector choice={choice} keySignature={keySignature} onElementChange={onElementChange} classes={classes} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.selectContainer}>
                                <InputLabel id="arppegio-name-label">Choose arppegio</InputLabel>
                                <Select
                                    labelId="arppegio-name-label"
                                    id="arppegio-name-select"
                                    value={selectedArppegio}
                                    onChange={(e) => onElementChange(e.target.value, 'arppegio')}
                                    displayEmpty
                                    className={classes.select}
                                >
                                    {arppegiosNames.map((arppegioName, index) => (
                                        <MenuItem key={index} value={arppegioName}>{arppegioName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </>
                )}

                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        className={classes.button}
                        onClick={onCleanFretboard}
                    >
                        Clean
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addToProgression}
                        className={classes.button}
                        disabled={!selectedChord || (!selectedShape && !selectedFret)}
                    >
                        Add Chord
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={saveProgression}
                        className={classes.button}
                        disabled={progression && progression.length === 0}
                    >
                        Save
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="default"
                        onClick={playProgression}
                        className={classes.button}
                        disabled={!progression || progression.length === 0}
                    >
                        Play
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        className={classes.button}
                        onClick={playSelectedNotes} 
                        variant="contained" 
                        color="primary">
                        Play Sound
                    </Button>
                </Grid>
            </Grid>
        </footer>
    );
};

const KeySelector = ({ choice, keySignature, onElementChange, classes }) => {
    const effectiveKeySignature = keySignature || {};

    return (
        choice && (
            <FormControl className={classes.selectContainer}>
                <InputLabel id="key-signature-label">Choose Key</InputLabel>
                <Select
                    labelId="key-signature-label"
                    id="key-signature-select"
                    value={effectiveKeySignature[choice] !== undefined ? effectiveKeySignature[choice] : ''}
                    onChange={(e) => onElementChange(e.target.value, 'key')}
                    displayEmpty
                    className={classes.selectContainer}
                >
                    {guitar.notes.sharps.map((key, index) => (
                        <MenuItem key={index} value={index}>{key}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    );
};

export default FretboardControls;
