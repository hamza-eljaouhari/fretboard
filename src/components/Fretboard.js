import React, { useEffect, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles, IconButton, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FretboardControls from './FretboardControls';
import Progressor from './Progressor';
import CircleOfFifths from './CircleOfFifths';
import FretboardDisplay from './FretboardDisplay';
import guitar from '../config/guitar';
import Soundfont from 'soundfont-player';
import {
    newFretboard, newLayout, updateStateProperty, setProgression, addFretboard, setProgressionKey
} from '../redux/actions';
import { getNoteFromFretboard } from '../redux/helpers';
import './guitar-neck.css';
import { useDispatch } from 'react-redux';
import { NotInterestedOutlined } from '@material-ui/icons';
import ChordComposer from './ChordComposer';
const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '65%', // Adjusted width for desktop screens
        [theme.breakpoints.up('xs')]: {
            width: '90%', // For desktop screens
        },
        [theme.breakpoints.up('sm')]: {
            width: '65%', // For desktop screens
        },
        margin: '0 auto', // Center the content horizontally
    },
    fretboardContainer: {
        width: '100%',
        overflowX: 'auto',
        maxWidth: '100vw'
    },
    fretboardArea: {
        flex: 1,
        overflowY: 'auto',
    },
    shadowyContainer: {
        backgroundColor: '#ffffff',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1000,
    },
    selectControl: {
        minWidth: '120px',
    },
    formControl: {
        margin: '8px',
        width: '100vw'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
    },
    chordPressionDisplay: {},
}));

const defaultTuning = [4, 11, 7, 2, 9, 4];

const Fretboard = withRouter((props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedFretboardIndex, setSelectedFretboardIndex] = useState(0);
    const [restrainDisplay, setRestrainDisplay] = useState(false);
    const { setFretboards, boards, progressions, setProgression, setProgressionKey } = props;
    const selectedFretboard = selectedFretboardIndex >= 0 ? boards[selectedFretboardIndex] : newFretboard();

    useEffect(() => {
        const restoredChordProgression = JSON.parse(localStorage.getItem('progression'));
        if (restoredChordProgression?.length) {
            dispatch(setProgression(restoredChordProgression));
        }
    }, [setProgression]);

    const handleFretboardSelect = (index) => {
        setSelectedFretboardIndex(index);
    };

    const handleChoiceChange = (newChoice) => {
        dispatch(updateStateProperty(selectedFretboardIndex, 'generalSettings.choice', newChoice));
        const storedURL = selectedFretboard.urlSettings[newChoice];
        props.history.push('/fretboard' + storedURL);
    };


    const createNewBoardDisplay = () => {
        const newBoard = newFretboard();
        dispatch(addFretboard(newBoard));
        setSelectedFretboardIndex(boards.length);
    };

    const cleanFretboard = () => {
        if (selectedFretboardIndex === -1) return;

        const choice = selectedFretboard.generalSettings.choice;

        const newBoard = newLayout(selectedFretboard.generalSettings.nostrs, selectedFretboard.generalSettings.nofrets, selectedFretboard.generalSettings.tuning);

        dispatch(updateStateProperty(selectedFretboardIndex, `keySettings.${choice}`, ''));
        dispatch(updateStateProperty(selectedFretboardIndex, `${choice}Settings.${choice}`, ''));
        if (choice === 'chord') {
            dispatch(updateStateProperty(selectedFretboardIndex, `${choice}Settings.shape`, ''));
        }
        dispatch(updateStateProperty(selectedFretboardIndex, `${choice}Settings.${choice}`, ''));
        dispatch(updateStateProperty(selectedFretboardIndex, `${selectedFretboard.generalSettings.choice}Settings.fretboard`, newBoard));
    }

    const onElementChange = (value, element) => {
        const newElement = getNewElementValue(value, element);
        updateUrl(element, newElement);
        const propertiesUpdate = getPropertiesUpdate(element, value, newElement);
        dispatchPropertiesUpdate(propertiesUpdate);
        updateUrlSettings('');
    };

    const getNewElementValue = (value, element) => {
        return element === 'notesDisplay' ? !selectedFretboard.generalSettings.notesDisplay : value;
    };

    const updateUrl = (element, newElement) => {
        const search = queryString.parse(props.history.location.search);
        search[element] = newElement;
        const newUrl = `/fretboard?${queryString.stringify(search)}`;
        props.history.push(newUrl);
    };

    const getPropertiesUpdate = (element, value, newElement) => {
        switch (element) {
            case 'key':
                return [
                    { property: `keySettings.${selectedFretboard.generalSettings.choice}`, value }
                ];
            case 'scale':
                return [
                    { property: 'scaleSettings.scale', value: guitar.scales[value] ? value : '' }
                ];
            case 'mode':
                return [
                    { property: 'modeSettings.mode', value: value >= 0 && value <= 6 ? value : '' }
                ];
            case 'arppegio':
                return [
                    { property: 'arppegioSettings.arppegio', value: guitar.arppegios[value] ? value : '' }
                ];
            case 'chord':
                return [
                    { property: 'chordSettings.chord', value: guitar.arppegios[value] ? value : '' }
                ];
            case 'shape':
                return [
                    { property: `${selectedFretboard.generalSettings.choice}Settings.shape`, value: value || '' }
                ]
            case 'fret':
                return [
                    { property: 'chordSettings.fret', value: value > 0 && value < 22 ? value : '' }
                ];
            case 'notesDisplay':
                return [
                    { property: 'generalSettings.notesDisplay', value: newElement }
                ];
            case 'tuning':
                return [
                    { property: 'generalSettings.tuning', value: value.split('-').map(num => parseInt(num, 10)) || defaultTuning }
                ];
            case 'nostrs':
                const newBoardForStr = newLayout(parseInt(value), selectedFretboard.generalSettings.nofrets, selectedFretboard.generalSettings.tuning);

                let baseOctaves = selectedFretboard.generalSettings.baseOctaves;

                if(parseInt(value) === 6){
                    baseOctaves = [...selectedFretboard.generalSettings.baseOctaves, 2]
                } else if (parseInt(value) === 7) {
                    baseOctaves = [...selectedFretboard.generalSettings.baseOctaves, 1]
                }
                
                return [
                    { property: 'generalSettings.baseOctaves', value: baseOctaves},
                    { property: 'generalSettings.nostrs', value: parseInt(value) || 6 },
                    { property: 'scaleSettings.fretboard', value: newBoardForStr },
                    { property: 'chordSettings.fretboard', value: newBoardForStr },
                    { property: 'modeSettings.fretboard', value: newBoardForStr },
                    { property: 'arppegioSettings.fretboard', value: newBoardForStr }
                ]
            case 'nofrets':
                const newBordForFrets = newLayout(selectedFretboard.generalSettings.nostrs, parseInt(value), selectedFretboard.generalSettings.tuning);
                return [
                    { property: 'generalSettings.nofrets', value: parseInt(value) || 22 },
                    { property: 'scaleSettings.fretboard', value: newBordForFrets },
                    { property: 'chordSettings.fretboard', value: newBordForFrets },
                    { property: 'modeSettings.fretboard', value: newBordForFrets },
                    { property: 'arppegioSettings.fretboard', value: newBordForFrets }
                ];
            case 'arppegio':
                return [
                    { property: 'arppegioSettings.arppegio', value: value },
                    { property: `arppegioSettings.fretboard`, value: newLayout(selectedFretboard.generalSettings.nostrs, parseInt(value), selectedFretboard.generalSettings.tuning) }
                ];
            default:
                return null;
        }
    };

    const dispatchPropertiesUpdate = (updates) => {
        if (updates !== null && updates.length > 0) {
            for (let i = 0; i < updates.length; i++) {
                dispatch(updateStateProperty(selectedFretboardIndex, updates[i].property, updates[i].value));
            }
        }
    };

    const updateUrlSettings = (choice) => {
        dispatch(updateStateProperty(selectedFretboardIndex, `urlSettings.${choice || 'scale'}`, props.history.location.search, choice));
    };

    const onCleanFretboard = () => {
        props.history.push('/fretboard');
        cleanFretboard();
    };

    const onCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => alert("The link has been copied successfully."), () => alert("Oops, something went wrong. You can copy the link directly."));
    };

    const getArppegioNotes = (arppegio) => {
        const formula = guitar.arppegios[arppegio]?.formula;
        const keyIndex = parseInt(selectedFretboard.keySettings['arppegio']); // Ensure the key is correctly interpreted

        if (!formula || isNaN(keyIndex)) {
            return [];
        }

        let currentIndex = keyIndex;
        const arppegioNotes = [guitar.notes.sharps[currentIndex]]; // Include the root note

        formula.forEach(step => {
            currentIndex = (currentIndex + step) % 12;
            arppegioNotes.push(guitar.notes.sharps[currentIndex]);
        });

        return arppegioNotes;
    }

    const getArppegioIntervals = (arppegio) => {
        const formula = guitar.arppegios[arppegio]?.intervals;
        return formula;
    }


    const getScaleNotes = (scale, key) => {
        if (scale === '' || key === '') return [];

        const { formula } = guitar.scales[scale];
        const keyIndex = parseInt(key);

        let currentNoteIndex = keyIndex;
        let scaleNotes = [guitar.notes.sharps[currentNoteIndex]];

        formula.forEach(step => {
            currentNoteIndex = (currentNoteIndex + step) % 12;
            scaleNotes.push(guitar.notes.sharps[currentNoteIndex]);
        });

        scaleNotes = scaleNotes.slice(0, -1);

        return scaleNotes;
    };

    // Get Mode notes
    const getModeNotes = (scaleNotes, mode) => {
        const modeNotes = scaleNotes.length ? scaleNotes.slice(parseInt(mode)).concat(scaleNotes.slice(0, parseInt(mode)))
            : [];

        return modeNotes;
    }

    const getScaleIntervals = (scale) => {
        return guitar.scales[scale]?.intervals || [];
    }

    const displayChordPortion = (chordObject, player) => {
        const { key, chord, shape, notes } = chordObject;
        const { choice } = selectedFretboard.generalSettings;
        const cagedShape = JSON.parse(JSON.stringify(guitar.arppegios[chord]?.cagedShapes[shape]));

        if (!cagedShape) return;

        const { formula } = guitar.arppegios[chord];

        // Calculate chord notes
        let currentNoteIndex = key;
        const chordNotes = [guitar.notes.sharps[currentNoteIndex]];

        formula.forEach(step => {
            currentNoteIndex = (currentNoteIndex + step) % 12;
            chordNotes.push(guitar.notes.sharps[currentNoteIndex]);
        });

        chordNotes.pop(); // Remove the last note which is a duplicate of the first

        const chordIntervals = guitar.arppegios[chord].intervals;
        const newComponent = JSON.parse(JSON.stringify(selectedFretboard));
        const newBoard = newComponent[(player ? 'chord' : choice) + 'Settings'].fretboard;

        newBoard.forEach(string => string.forEach(note => {
            note.show = false;
            note.interval = null;  // Reset interval
        }));

        newBoard.forEach((string, stringIndex) => {
            string.forEach((note, fretIndex) => {
                const shapeIndex = guitar.shapes.names.indexOf(shape);
                const shapeIntervals = guitar.shapes.indexes[shapeIndex];

                const noteIndex = (selectedFretboard.generalSettings.tuning[stringIndex] + fretIndex) % 12;
                const noteName = guitar.notes.sharps[noteIndex];

                if (chordNotes.includes(noteName) && fretIndex <= shapeIntervals.end + key && fretIndex >= shapeIntervals.start + key) {
                    newBoard[stringIndex][fretIndex].show = true;
                    newBoard[stringIndex][fretIndex].interval = chordIntervals[chordNotes.indexOf(noteName)];
                }
            });
        });

        const oldFretboardSettings = selectedFretboard['chordSettings'].fretboard;

        if (JSON.stringify(oldFretboardSettings) !== JSON.stringify(newBoard)) {
            dispatch(updateStateProperty(selectedFretboardIndex, 'chordSettings.fretboard', newBoard));
        }
    }

    useEffect(() => {
        if (selectedFretboardIndex === -1) return;
        const { chordSettings, keySettings, scaleSettings, generalSettings, modeSettings, arppegioSettings } = selectedFretboard;
        if (keySettings[selectedFretboard.generalSettings.choice] === "") return;

        const { chord } = chordSettings;
        const { choice } = generalSettings;

        let shape = null;

        if (choice === 'chord') {
            shape = chordSettings.shape;
        } else if (choice === 'scale') {
            shape = scaleSettings.shape;
        } else if (choice === 'arppegio') {
            shape = arppegioSettings.shape;
        }

        const { scale } = scaleSettings;
        const { mode } = modeSettings;
        const { arppegio } = arppegioSettings;

        let notes = [];
        let intervals = [];

        if (choice === 'chord' && chord !== '' && shape !== '') {
            displayChordPortion({ key: keySettings[choice], chord, shape: shape });
            return;
        } else if (choice === 'arppegio' && arppegio !== '') {
            notes = getArppegioNotes(arppegio);
            intervals = getArppegioIntervals(arppegio);
        } else if (choice === 'scale' && scale !== '') {
            const isModalRequest = guitar.scales[scale].isModal;

            notes = getScaleNotes(scale, keySettings.scale);
            intervals = getScaleIntervals(scale);

            if (isModalRequest) {
                notes = getModeNotes(notes, mode);
            }
        }

        const fretboardClone = JSON.parse(JSON.stringify(selectedFretboard));

        fretboardClone[choice + 'Settings'].fretboard.forEach(string => string.forEach((note) => {
            note.show = false;
            note.interval = undefined;
            return note;
        }));

        if (shape) {
            const shapeIndex = guitar.shapes.names.indexOf(shape);
            const rootNoteIndex = keySettings[choice];
            let shapeIntervals = null;

            if(choice === 'arppegio'){
                shapeIntervals = guitar.shapes.indexes[shapeIndex];
            } 

            if(choice === 'scale'){
                shapeIntervals = guitar.scales[scale].indexes[shapeIndex];
            } 
            
            console.log(shapeIntervals)
            fretboardClone[choice + 'Settings'].fretboard.forEach((string, stringIndex) => {
                for (let fretIndex = rootNoteIndex; fretIndex < fretboardClone.generalSettings.nofrets; fretIndex++) {
                    const currentNote = getNoteFromFretboard(stringIndex, fretIndex, fretboardClone.generalSettings.tuning);
                    if (notes.includes(currentNote)) {
                        const fretPosition = fretIndex;
                        if (fretPosition >= (shapeIntervals.start + rootNoteIndex) && fretPosition <= (shapeIntervals.end + rootNoteIndex)) {
                            fretboardClone[choice + 'Settings'].fretboard[stringIndex][fretIndex].show = true;
                            fretboardClone[choice + 'Settings'].fretboard[stringIndex][fretIndex].current = selectedFretboard.generalSettings.notesDisplay ? currentNote : intervals[notes.indexOf(currentNote)];
                            fretboardClone[choice + 'Settings'].fretboard[stringIndex][fretIndex].interval = intervals[notes.indexOf(currentNote)];
                        }
                    }
                }
            });
        } else {
            fretboardClone[choice + 'Settings'].fretboard.forEach((string, stringIndex) => {
                for (let fretIndex = 0; fretIndex < fretboardClone.generalSettings.nofrets; fretIndex++) {
                    const currentNote = getNoteFromFretboard(stringIndex, fretIndex, fretboardClone.generalSettings.tuning);
                    if (notes.includes(currentNote)) {
                        fretboardClone[choice + 'Settings'].fretboard[stringIndex][fretIndex].show = true;
                        fretboardClone[choice + 'Settings'].fretboard[stringIndex][fretIndex].current = selectedFretboard.generalSettings.notesDisplay ? currentNote : intervals[notes.indexOf(currentNote)];
                        fretboardClone[choice + 'Settings'].fretboard[stringIndex][fretIndex].interval = intervals[notes.indexOf(currentNote)];
                    }
                }
            });
        }

        if (JSON.stringify(selectedFretboard[choice + 'Settings']) !== JSON.stringify(fretboardClone[choice + 'Settings'])) {
            dispatch(updateStateProperty(selectedFretboardIndex, `${choice}Settings.fretboard`, fretboardClone[choice + 'Settings'].fretboard));
        }
    }, [selectedFretboard]);

    console.log(selectedFretboard)
    const addChordToProgression = () => {
        const { keySignature, chord, shape, fret } = selectedFretboard;
        if (!keySignature || !chord || (!shape && !fret)) return;
        const chordObject = {
            key: keySignature,
            chord,
            shape,
            fret: parseInt(fret, 10),
            highlighted: false,
            id: progressions.length + 1
        };
        const newChordProgression = [...progressions, chordObject];
        dispatch(setProgression(newChordProgression));
        localStorage.setItem('progression', JSON.stringify(newChordProgression));
    };

    const saveProgression = () => {
        if (progressions.length) {
            localStorage.setItem("progression", JSON.stringify(progressions));
        }
    };

    const playProgression = useCallback(async (progression) => {

        for (let i = 0; i < progression.length; i++) {
            const { chord, shape, key, notes } = progression[i];
            dispatch(updateStateProperty(selectedFretboardIndex, 'generalSettings.choice', 'chord'));
            dispatch(updateStateProperty(selectedFretboardIndex, 'chordSettings.chord', chord));
            dispatch(updateStateProperty(selectedFretboardIndex, 'chordSettings.shape', shape));
            dispatch(updateStateProperty(selectedFretboardIndex, 'chordSettings.notes', notes));
            dispatch(updateStateProperty(selectedFretboardIndex, 'keySettings.chord', key));
            displayChordPortion({ key, chord, shape });
            await new Promise(r => setTimeout(r, 4000));
        }
    }, [progressions, selectedFretboardIndex]);


    const getDegree = (choice) => {
        const defaultDegree = 'Major';
        if (!choice || selectedFretboardIndex === -1 || !boards.length) return defaultDegree;
        const selectedKey = selectedFretboard.keySettings[choice];
        if (choice === 'scale') {
            const scale = guitar.scales[selectedFretboard.scaleSettings.scale];
            return scale ? scale.degree : defaultDegree;
        } else if (choice === 'chord' || choice === 'arppegio') {
            const chord = guitar.arppegios[selectedFretboard[choice + 'Settings'][choice]];
            return chord ? chord.quality : defaultDegree;
        }
        return defaultDegree;
    };

    const getCircleData = () => {
        const defaultPoint = { tone: 'C', degree: 'Major' };
        if (selectedFretboardIndex === -1) return defaultPoint;
        const selectedKey = selectedFretboard.keySettings[selectedFretboard.generalSettings.choice];
        const selectedTone = guitar.notes.flats[selectedKey];
        return { tone: selectedTone, degree: getDegree(selectedFretboard.generalSettings.choice) };
    };

    const playChordNotes = async () => {
        if (selectedFretboardIndex === -1) return;

        const guitarSound = await Soundfont.instrument(new AudioContext(), 'acoustic_guitar_nylon');

        const chordNotes = [];

        selectedFretboard.chordSettings.fretboard.forEach((string, stringIndex) => {
            string.forEach((note, fretIndex) => {
                if (note.show) {
                    const noteIndex = (selectedFretboard.generalSettings.tuning[stringIndex] + fretIndex) % 12;
                    const displayedNote = guitar.notes.sharps[noteIndex];
                    const octave = calculateOctave(stringIndex, fretIndex, displayedNote);
                    const noteWithOctave = `${displayedNote}${octave}`;
                    chordNotes.push({ note: noteWithOctave, stringIndex, fretIndex });
                }
            });
        });

        // Sort the notes by stringIndex and fretIndex
        chordNotes.sort((a, b) => {
            if (a.stringIndex === b.stringIndex) {
                return a.fretIndex - b.fretIndex;
            }
            return a.stringIndex - b.stringIndex;
        });

        // Play each note individually
        for (let i = chordNotes.length - 1; i >= 0; i--) {
            const { note, stringIndex, fretIndex } = chordNotes[i];
            highlightNoteForDuration(stringIndex, fretIndex, 500);
            guitarSound.play(note);
            await new Promise(r => setTimeout(r, 500)); // Adjust delay as needed
        }

        // Play all notes together
        chordNotes.forEach(chordNote => guitarSound.play(chordNote.note));
    };

    const playSelectedNotes = async () => {
        const choice = selectedFretboard.generalSettings.choice;
        const choiceSettings = selectedFretboard[choice + 'Settings'];
        const selectedScale = selectedFretboard.scaleSettings.scale;
        const shape = selectedFretboard[choice + 'Settings'].shape;
        const scale = selectedFretboard[choice + 'Settings'].scale;
        let rootNoteIndex = 0;
        // Function to compute the cumulative intervals for each mode
        const computeModeOffsets = (formula) => {
            let offsets = [0];
            for (let i = 1; i < formula.length; i++) {
                offsets.push((offsets[i - 1] + formula[i - 1]) % 12);
            }
            return offsets;
        };

        if (choice === 'scale') {
            const modeIndex = selectedFretboard.modeSettings.mode || 0;
            const selectedMode = guitar.scales[selectedScale].modes[modeIndex]// Default to Ionian if no mode is selected
            const scaleInfo = guitar.scales[selectedScale.toLowerCase()];
            const modeOffsets = computeModeOffsets(scaleInfo.formula);
            const modeOffset = modeOffsets[modeIndex];
            rootNoteIndex = (selectedFretboard.keySettings[selectedFretboard.generalSettings.choice] + modeOffset) % 12;
        } else if (choice === 'arppegio') {
            const arppegiokey = selectedFretboard.keySettings[choice];
            rootNoteIndex = arppegiokey
        }

        if (choice === 'chord') {
            await playChordNotes();
        } else {
            const isArpeggio = choice === 'arppegio';

            let selectedCagedShapes = [];
            if (!shape == choice == 'scale') {
                selectedCagedShapes = guitar.scales[scale].indexes;
            } else if (!shape == choice == 'arppegio') {
                selectedCagedShapes = guitar.shapes.indexes;
            } else if (shape && choice === 'scale') {
                const shapeIndex = guitar.shapes.names.indexOf(shape);
                const scaleIndexes = guitar.scales[scale].indexes;
                selectedCagedShapes = [scaleIndexes[shapeIndex]];
            } else if (shape && choice === 'arppegio') {
                const shapeIndex = guitar.shapes.names.indexOf(shape);
                const arppegioIndexes = guitar.shapes.indexes[shapeIndex];
                selectedCagedShapes = [arppegioIndexes];
            }

            let notesForShape = [];

            selectedCagedShapes.forEach((caged) => {
                const notesInShape = [];

                choiceSettings.fretboard.forEach((string, stringIndex) => {
                    for (let fretIndex = 0; fretIndex < string.length; fretIndex++) {
                        const note = string[fretIndex];
                        if (note.show) {
                            const displayedNote = note.current;
                            const octave = calculateOctave(stringIndex, fretIndex);
                            const noteWithOctave = `${displayedNote}${octave}`;

                            if (!isArpeggio && caged) {
                                const fretPosition = (fretIndex + rootNoteIndex);

                                if (fretPosition >= caged.start + rootNoteIndex && fretPosition <= caged.end + rootNoteIndex) {
                                    notesInShape.push({ note: noteWithOctave, stringIndex, fretIndex });
                                }
                            } else {
                                notesInShape.push({ note: noteWithOctave, stringIndex, fretIndex });
                            }
                        }
                    }
                });

                notesForShape.push(notesInShape);
            });

            for (const scopedNotes of notesForShape) {
                if (scopedNotes.length > 0) {
                    // Find the lowest root note
                    const rootNote = scopedNotes.filter(n => n.note.startsWith(guitar.notes.sharps[rootNoteIndex]))
                        .sort((a, b) => b.stringIndex - a.stringIndex || a.fretIndex - b.fretIndex)[0];

                    // Sort notes by stringIndex descending and fretIndex ascending
                    scopedNotes.sort((a, b) => b.stringIndex - a.stringIndex || a.fretIndex - b.fretIndex);

                    const startNoteIndex = scopedNotes.indexOf(rootNote);

                    // Create the desired sequence starting and ending with the lowest root note
                    const downAfterRoot = scopedNotes.slice(startNoteIndex + 1);
                    const upScale = scopedNotes.slice().reverse();
                    const downBeforeRoot = scopedNotes.slice(0, startNoteIndex);
                    const fullSequence = [rootNote, ...downAfterRoot, ...upScale, ...downBeforeRoot, rootNote];

                    await playNotesWithinInterval(fullSequence);
                }
            }
        }
    };


    const playNotesWithinInterval = async (notes) => {
        const guitarSound = await Soundfont.instrument(new AudioContext(), 'acoustic_guitar_nylon');

        // Play each note in sequence
        for (let i = 0; i < notes.length; i++) {
            const { note, stringIndex, fretIndex } = notes[i];
            highlightNoteForDuration(stringIndex, fretIndex, 500);
            guitarSound.play(note);
            await new Promise(r => setTimeout(r, 500)); // Adjust delay as needed
        }
    };

    const highlightNoteForDuration = (stringIndex, fretIndex, duration) => {
        const noteElement = document.getElementById(`note-${selectedFretboardIndex}-${stringIndex}-${fretIndex}`);
        if (noteElement) {
            noteElement.classList.add('note-playing');
            setTimeout(() => {
                noteElement.classList.remove('note-playing');
            }, duration);
        }
    };

    const calculateOctave = (stringIndex, fretIndex) => {
        const baseOctaves = selectedFretboard.generalSettings.baseOctaves // Initial octaves for open strings: E4, B3, G3, D3, A2, E2
        let octave = baseOctaves[stringIndex];
        const tuning = selectedFretboard.generalSettings.tuning;
        const notes = guitar.notes.sharps;

        // Calculate the number of half steps from the open string
        let halfSteps = (tuning[stringIndex] + fretIndex) % 12;
        let currentNoteIndex = tuning[stringIndex] % 12;

        // Loop through each fret and determine if we pass a B note
        for (let i = 0; i <= fretIndex; i++) {
            const note = notes[(currentNoteIndex + i) % 12];
            if (note === 'B') {
                octave++;
            }
        }

        return octave;
    };

    const circleData = getCircleData();

    const currentScale = selectedFretboardIndex >= 0 && selectedFretboard ? guitar.scales[selectedFretboard.scaleSettings.scale] : 'major';
    const scaleModes = currentScale?.isModal ? currentScale.modes : [];

    return (
        <div className={classes.root}>
            <div>
                <IconButton onClick={createNewBoardDisplay}>
                    <AddCircleOutlineIcon />
                </IconButton>
                <FretboardDisplay
                    progressions={progressions}
                    selectedFretboardIndex={selectedFretboardIndex}
                    boards={boards}
                    numberOfStrings={selectedFretboard.generalSettings.nostrs || 6}
                    numberOfFrets={selectedFretboard.generalSettings.nofrets || 22}
                    handleFretboardSelect={handleFretboardSelect}
                    onElementChange={onElementChange}
                />
            </div>
            <div >
                <section className="controls">
                    <FretboardControls
                        playSelectedNotes={playSelectedNotes}
                        handleChoiceChange={handleChoiceChange}
                        scaleModes={scaleModes}
                        arppegiosNames={Object.keys(guitar.arppegios)}
                        choice={selectedFretboard.generalSettings.choice}
                        onCleanFretboard={onCleanFretboard}
                        keySignature={selectedFretboard.keySettings}
                        onCopyLink={onCopyLink}
                        selectedMode={selectedFretboard.modeSettings.mode}
                        selectedScale={selectedFretboard.scaleSettings.scale}
                        selectedChord={selectedFretboard.chordSettings.chord}
                        selectedShape={selectedFretboard[selectedFretboard.generalSettings.choice + 'Settings'].shape}
                        selectedArppegio={selectedFretboard.arppegioSettings.arppegio}
                        selectedFret={selectedFretboard.chordSettings.fret}
                        addChordToProgression={addChordToProgression}
                        saveProgression={saveProgression}
                        playProgression={playProgression}
                        progressions={progressions}
                        onElementChange={onElementChange}
                        restrainDisplay={restrainDisplay}
                        setRestrainDisplay={setRestrainDisplay}
                    />
                </section>
                <section>
                    <CircleOfFifths
                        className={classes.circleOfFifths}
                        selectedTone={circleData.tone}
                        onElementChange={onElementChange}
                        selectedFretboardIndex={selectedFretboardIndex}
                        quality={circleData.degree}
                    />
                    <ChordComposer
                        addChordToProgression={addChordToProgression}
                        playProgression={playProgression}
                        saveProgression={saveProgression}
                    />
                </section>
                <section>
                    <Progressor
                        className={classes.chordPressionDisplay}
                        progression={progressions.progression}
                        setProgression={setProgression}
                        playProgression={playProgression}
                        setProgressionKey={setProgressionKey}
                        selectedKey={progressions.key}
                        getScaleNotes={getScaleNotes}
                    />
                </section>
            </div>
        </div>
    );
});

const mapStateToProps = state => {
    return { boards: state.fretboard.components, progressions: state.partitions };
};

export default connect(
    mapStateToProps,
    {
        addFretboard, updateStateProperty, setProgression, setProgressionKey
    }
)(Fretboard);
