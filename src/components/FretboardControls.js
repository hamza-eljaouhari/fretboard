import React from 'react';
import { Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import guitar from '../config/guitar.js';

const FretboardControls = ({
    classes,
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
    addChordToProgression,
    saveProgression,
    playChordProgression,
    chordProgression,
}) => {
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    const handleButtonClick = (newChoice) => {
        handleChoiceChange(newChoice);
    };

    return (
        <footer className={classes.footer}>
            <div className={classes.buttonGroup}>
                <Button
                    size="small"
                    variant={choice === 'scales' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleButtonClick('scales')}
                    className={classes.choiceButton}
                >
                    Scales
                </Button>
                <Button
                    size="small"
                    variant={choice === 'chords' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleButtonClick('chords')}
                    className={classes.choiceButton}
                >
                    Chords
                </Button>
                <Button
                    size="small"
                    variant={choice === 'arpeggios' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleButtonClick('arpeggios')}
                    className={classes.choiceButton}
                >
                    Arpeggios
                </Button>
            </div>

            {choice === 'scales' && (
                <>
                    <KeySelector choice={choice} keySignature={keySignature} onElementChange={onElementChange} classes={classes}  />
                    <FormControl className={`${classes.formControl} ${classes.fixedWidth}`}>
                        <InputLabel id="scale-name-label">Choose Scale</InputLabel>
                        <Select
                            labelId="scale-name-label"
                            id="scale-name-select"
                            value={selectedScale}
                            onChange={(e) => onElementChange(e.target.value, 'scale')}
                            displayEmpty
                        >
                            {Object.keys(guitar.scales).map((scaleName, index) => (
                                <MenuItem key={index} value={scaleName}>{capitalize(scaleName)}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {scaleModes.length > 0 && (
                        <FormControl className={`${classes.formControl} ${classes.fixedWidth}`}>
                            <InputLabel id="scale-mode-label">Choose Mode</InputLabel>
                            <Select
                                labelId="scale-mode-label"
                                id="scale-mode-select"
                                value={selectedMode}
                                onChange={(e) => onElementChange(e.target.value, 'mode')}
                                displayEmpty
                            >
                                {scaleModes.map((mode, index) => (
                                    <MenuItem key={index} value={index}>{mode.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </>
            )}

            {choice === 'chords' && (
                <>
                    <KeySelector choice={choice} keySignature={keySignature} onElementChange={onElementChange} classes={classes} />
                    <FormControl className={`${classes.formControl} ${classes.fixedWidth}`}>
                        <InputLabel id="chord-name-label">Choose Chord</InputLabel>
                        <Select
                            labelId="chord-name-label"
                            id="chord-name-select"
                            value={selectedChord}
                            onChange={(e) => onElementChange(e.target.value, 'chord')}
                            displayEmpty
                        >
                            {Object.keys(guitar.arppegios).map((chordName, index) => (
                                <MenuItem key={index} value={chordName}>{chordName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            )}

            {choice === 'arpeggios' && (
                <>
                    <KeySelector choice={choice} keySignature={keySignature} onElementChange={onElementChange} classes={classes} />
                    <FormControl className={`${classes.formControl} ${classes.fixedWidth}`}>
                        <InputLabel id="arpeggio-name-label">Choose Arpeggio</InputLabel>
                        <Select
                            labelId="arpeggio-name-label"
                            id="arpeggio-name-select"
                            value={selectedArppegio}
                            onChange={(e) => onElementChange(e.target.value, 'arppegio')}
                            displayEmpty
                        >
                            {arppegiosNames.map((arppegioName, index) => (
                                <MenuItem key={index} value={arppegioName}>{arppegioName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            )}

            {choice === 'chords' && (
                <FormControl className={`${classes.formControl} ${classes.fixedWidth}`}>
                    <InputLabel id="shape-label">Choose Shape</InputLabel>
                    <Select
                        labelId="shape-label"
                        id="shape-select"
                        value={selectedShape}
                        onChange={(e) => onElementChange(e.target.value, 'shape')}
                        displayEmpty
                    >
                        {guitar.shapes.names.map((shapeName, index) => (
                            <MenuItem key={index} value={shapeName}>{shapeName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {choice === 'chords' && (
                <FormControl className={`${classes.formControl} ${classes.fixedWidth}`}>
                    <InputLabel id="fret-label">Choose Fret</InputLabel>
                    <Select
                        labelId="fret-label"
                        id="fret-select"
                        value={selectedFret}
                        onChange={(e) => onElementChange(e.target.value, 'fret')}
                        displayEmpty
                    >
                        {Array.from({ length: guitar.numberOfFrets }, (_, i) => i + 1).map((fretNumber, index) => (
                            <MenuItem key={index} value={fretNumber}>{fretNumber}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <Button
                className={`${classes.formControl} ${classes.fixedWidth}`}
                variant="contained"
                color="primary"
                size="medium"
                onClick={onCleanFretboard}
            >
                Clean
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={addChordToProgression}
                disabled={!selectedChord || (!selectedShape && !selectedFret)}
            >
                Add Chord
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={saveProgression}
                disabled={chordProgression && chordProgression.length === 0}
            >
                Save
            </Button>

            <Button
                variant="contained"
                color="default"
                onClick={playChordProgression}
                disabled={!chordProgression || chordProgression.length === 0}
            >
                Play
            </Button>

        </footer>
    );
};

const KeySelector = ({ choice, keySignature, onElementChange, classes }) => {

    console.log("CHOICE KEY SIGNATURE", choice)
    console.log("CHOICE KEY SIGNATURE", keySignature)
    return (
        choice && (
            <FormControl className={`${classes.formControl} ${classes.fixedWidth}`}>
                <InputLabel id="key-signature-label">Choose Key</InputLabel>
                <Select
                    labelId="key-signature-label"
                    id="key-signature-select"
                    value={keySignature[choice]}
                    onChange={(e) => onElementChange(e.target.value, 'key')}
                    displayEmpty
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
