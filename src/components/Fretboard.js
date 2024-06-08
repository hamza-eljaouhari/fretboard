import guitar from '../config/guitar';
import React, { useEffect, useCallback, useState } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import FretboardControls from './FretboardControls';
import CircleOfFifths from './CircleOfFifths';
import Progressor from './Progressor';
import TabReader from './TabReader';
import { newFretboard, newLayout } from '../redux/reducers/fretboard';
import { IconButton, Button, InputLabel, FormControl, Select, Typography, makeStyles } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FretboardDisplay from './FretboardDisplay';
import { 
    setFretboard, setFretboards, toggleNote, setKey, setScale, setScaleFormula, setScaleNotes, 
    setScaleIntervals, setMode, setModeNotes, setModeIntervals, setArppegio, setArppegioNotes, 
    setArppegioIntervals, setChord, setShape, setFret, setNotesDisplay, setChordProgression, 
    updateFretboardProperty 
} from "../redux/actions";
import { getNoteFromFretboard } from '../redux/helpers';
import './guitar-neck.css';
const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        position: 'relative',
    },
    fretboardArea: {
        flex: 1,
        overflowY: 'auto',
    },
    footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1000,
    },
    selectControl: {
        minWidth: 120,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
    },
    fixedWidth: {
        width: '200px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing(1),
    },
    chordPressionDisplay: {
        
    }
}));

const Fretboard = withRouter((props) => {
    const classes = useStyles();
    const location = useLocation();
    const search = props.history.location.search;

    const [numberOfStrings, setNumberOfStrings] = useState([6]);
    const [numberOfFrets, setNumberOfFrets] = useState([22]);
    const [selectedFretboardIndex, setSelectedFretboardIndex] = useState(-1);

    const { chordProgression, updateFretboardProperty, setChordProgression, setFretboards, fretboards, setFretboard, onSetTitle, notesDisplay, setNotesDisplay, setFret, setShape, setChord, setArppegio, setMode, setScale, setKey } = props;
    const { keySignature, fret, shape, scale, mode, arppegio, chord, fretboard } = selectedFretboardIndex >= 0 ? fretboards[selectedFretboardIndex] : newFretboard(6, 22, []);

    const handleFretboardSelect = (fretboardIndex) => {
        setSelectedFretboardIndex(fretboardIndex);
        props.history.push(fretboards[fretboardIndex].url);
    };

    const addFretboard = () => {
        const defaultTuning = [4, 11, 7, 2, 9, 4];
        const newFretboardConfig = newFretboard(6, 22, defaultTuning);
        const newFretboards = [...fretboards, newFretboardConfig];
        setFretboards(newFretboards);
        props.history.push('/fretboard');
        setSelectedFretboardIndex(newFretboards.length - 1);
        onElementChange(newFretboards.length - 1, 'nofb');
    };
    
    const cleanFretboard = useCallback(() => {
        const nf = newLayout(numberOfStrings[selectedFretboardIndex], numberOfFrets[selectedFretboardIndex], fretboards[selectedFretboardIndex].tuning);
        for (let i = 0; i < numberOfStrings[selectedFretboardIndex]; i++) {
            for (let j = 0; j < numberOfFrets[selectedFretboardIndex]; j++) {
                nf[i][j].show = false;
            }
        }
        if (JSON.stringify(nf) !== JSON.stringify(fretboards[selectedFretboardIndex].fretboard)) {
            const updatedFretboards = [...fretboards];
            updatedFretboards[selectedFretboardIndex].fretboard = nf;
            setFretboards(updatedFretboards);
        }
    }, [fretboard, setFretboard, numberOfStrings, numberOfFrets, fretboards, selectedFretboardIndex]);

    const onElementChange = (targetValue, elementsName) => {
        let newElement = targetValue;
        if (elementsName === 'notesDisplay') {
            newElement = !props[elementsName];
        }

        const search = queryString.parse(props.history.location.search);
        search[elementsName] = newElement;
        const newLocation = queryString.stringify(search);
        props.history.push('/fretboard?' + newLocation);
    };

    const onCleanFretboard = () => {
        props.history.push('');
        cleanFretboard();
    };

    const onCopyLink = () => {
        const url = window.location.href;
        const textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert("The link has been copied successfully.")
        } catch (err) {
            alert("Oops, something went wrong. You can copy the link directly.")
        }
        document.body.removeChild(textArea);
    };

    const getScaleNotes = useCallback((fretboard) => {
        if (fretboard.scale === '') return [];
        const scaleFormula = guitar.scales[fretboard.scale].formula;
        const scaleNotes = scaleFormula.map((step, index) => guitar.notes.sharps[(parseInt(fretboard.keySignature) + scaleFormula.slice(0, index + 1).reduce((a, b) => a + b, 0)) % 12]);
        return scaleNotes;
    }, [scale, keySignature]);

    const getScaleIntervals = useCallback(() => {
        if (scale === '') return [];
        return guitar.scales[scale].intervals;
    }, [scale]);

    const getModeNotes = useCallback((fretboard) => {
        const scaleNotes = getScaleNotes(fretboard);
        if (!scaleNotes.length) return [];
        const modeNotes = scaleNotes.slice(parseInt(fretboard.mode)).concat(scaleNotes.slice(0, parseInt(fretboard.mode)));
        return modeNotes;
    }, [getScaleNotes]);

    const getModeIntervals = useCallback(() => {
        if (scale === '' || keySignature === '') return [];
        return guitar.scales[scale].modes[parseInt(mode)].intervals;
    }, [scale, mode, keySignature]);

    const getArppegioNotes = useCallback((fromArppegio, fretboard) => {
        if (fretboard.keySignature === '') return [];
        const formula = fromArppegio ? guitar.arppegios[fretboard.arppegio]?.formula : guitar.arppegios[fretboard.chord]?.formula;
        if (!formula) return [];
        return formula.map((step, index) => guitar.notes.sharps[(parseInt(fretboard.keySignature) + formula.slice(0, index + 1).reduce((a, b) => a + b, 0)) % 12]);
    }, [keySignature, arppegio, chord]);

    const getArppegioIntervals = useCallback((isFromArppegio) => {
        if (keySignature === '' || (arppegio === '' && chord === '')) return [];
        const formula = isFromArppegio ? guitar.arppegios[arppegio]?.intervals : guitar.arppegios[chord]?.intervals;
        return formula || [];
    }, [keySignature, arppegio, chord]);

    const displayChordPortion = (fretboardIndex, chordObject) => {
        const { key, chord, shape } = chordObject;
        const cagedShape = guitar.arppegios[chord].cagedShapes[shape];
    
        const cagedInterval = guitar.shapes.names.indexOf(shape);

        let adjuster = guitar.shapes.intervals[cagedInterval];

        console.log(adjuster)

        if (!cagedShape) return;
    
        const nf = JSON.parse(JSON.stringify(fretboards[fretboardIndex]));
    
        // Iterate over the caged shape to display it on the fretboard
        cagedShape.forEach((fret, stringIndex) => {
            if (fret !== null) {
                // Calculate the root fret position based on the shape and key
                const rootFret = (fret + key) % 12;
                console.log("fret ", fret);
                console.log("key ", key);
                console.log("rpotFret ", rootFret);
                
                const adjustedStringIndex = guitar.numberOfStrings - 1 - stringIndex;
                const displayFret = fret + key + adjuster;
    
                if (displayFret < nf.fretboard[adjustedStringIndex].length) {
                    nf.fretboard[adjustedStringIndex][displayFret] = {
                        ...nf.fretboard[adjustedStringIndex][displayFret],
                        show: true,
                        note: guitar.notes.sharps[rootFret]
                    };
                }
            }
        });
    
        const updatedFretboards = [...fretboards];
        updatedFretboards[fretboardIndex] = nf;
    
        if (JSON.stringify(updatedFretboards) !== JSON.stringify(fretboards)) {
            setFretboards(updatedFretboards);
        }
    };
    
    const spread = useCallback((fretboards, fretboardIndex, notes, intervals, displayType) => {
        if (fretboardIndex === -1) return;
        const fretboardClone = JSON.parse(JSON.stringify(fretboards[fretboardIndex]));
        const startingIndex = fretboardClone.shape ? guitar.shapes.indexes[parseInt(fretboardClone.shape)].start : (fretboardClone.fret ? parseInt(fretboardClone.fret) - 1 : 0);
        const lastIndex = fretboardClone.shape ? guitar.shapes.indexes[parseInt(fretboardClone.shape)].end + 1 : (fretboardClone.fret ? startingIndex + 4 : fretboardClone.nofrets);
        fretboardClone.fretboard.forEach((string, stringIndex) => {
            for (let fretIndex = startingIndex; fretIndex < lastIndex; fretIndex++) {
                const currentNote = getNoteFromFretboard(stringIndex, fretIndex, fretboardClone.tuning);
                if (notes.includes(currentNote)) {
                    fretboardClone.fretboard[stringIndex][fretIndex].show = true;
                    fretboardClone.fretboard[stringIndex][fretIndex].current = notesDisplay ? currentNote : intervals[notes.indexOf(currentNote)];
                }
            }
        });
        const updatedFretboards = [...fretboards];
        updatedFretboards[fretboardIndex] = fretboardClone;
        if (JSON.stringify(updatedFretboards) !== JSON.stringify(fretboards)) {
            if (displayType === 'scale') {
                updateFretboardProperty(fretboardIndex, 'scaleNotes', notes);
                updateFretboardProperty(fretboardIndex, 'scaleIntervals', intervals);
            } else if (displayType === 'mode') {
                updateFretboardProperty(fretboardIndex, 'modeNotes', notes);
                updateFretboardProperty(fretboardIndex, 'modeIntervals', intervals);
            } else if (displayType === 'arppegio') {
                updateFretboardProperty(fretboardIndex, 'arppegioNotes', notes);
                updateFretboardProperty(fretboardIndex, 'arppegioIntervals', intervals);
            }
            setFretboards(updatedFretboards);
        }
    }, [shape, fret, notesDisplay, guitar.shapes.indexes, setFretboards, updateFretboardProperty]);

    const update = useCallback(() => {
        if (selectedFretboardIndex === -1) return;
        onSetTitle('Choose something to display...');
        if (fretboards[selectedFretboardIndex].keySignature === '') return;
        if (fretboards[selectedFretboardIndex].scale === '' && fretboards[selectedFretboardIndex].arppegio === '' && fretboards[selectedFretboardIndex].chord === '') return;
    
        let notes = null;
        let intervals = null;
        let name = '';
        let displayType = 'scale';
    
        if (fretboards[selectedFretboardIndex].scale !== '') {
            const isModal = guitar.scales[fretboards[selectedFretboardIndex].scale].isModal;
            notes = getScaleNotes(fretboards[selectedFretboardIndex]);
            intervals = getScaleIntervals();
            name = `${notes[0]} ${guitar.scales[fretboards[selectedFretboardIndex].scale].name} scale`;
    
            if (isModal && fretboards[selectedFretboardIndex].mode !== '') {
                notes = getModeNotes(fretboards[selectedFretboardIndex]);
                intervals = getModeIntervals();
                const modeRootName = notes[0];
                const modeNumber = parseInt(fretboards[selectedFretboardIndex].mode, 10) + 1;
                name = `${modeRootName} ${guitar.scales[fretboards[selectedFretboardIndex].scale].modes[fretboards[selectedFretboardIndex].mode].name} from the ${name} (Mode #${modeNumber})`;
                displayType = 'mode';
            }
        }
    
        if (fretboards[selectedFretboardIndex].arppegio !== '') {
            notes = getArppegioNotes(true, fretboards[selectedFretboardIndex]);
            intervals = guitar.arppegios[fretboards[selectedFretboardIndex].arppegio].intervals;
            name = `${notes[0]} ${guitar.arppegios[fretboards[selectedFretboardIndex].arppegio].name} arppegio.`;
            displayType = 'arppegio';
        }
    
        if (fretboards[selectedFretboardIndex].chord !== '') {
            const chordName = fretboards[selectedFretboardIndex].chord;
            const shapeName = fretboards[selectedFretboardIndex].shape;
            notes = getArppegioNotes(false, fretboards[selectedFretboardIndex]);
            intervals = guitar.arppegios[chordName].intervals;
            name = `${notes[0]} ${guitar.arppegios[chordName].name} chord.`;
    
            if (fretboards[selectedFretboardIndex].fret !== '' || shapeName !== '') {
                onSetTitle(name);
                console.log("kS", fretboards[selectedFretboardIndex].keySignature)
                const chordObject = {
                    key: fretboards[selectedFretboardIndex].keySignature,
                    chord: chordName,
                    shape: shapeName
                };
                displayChordPortion(selectedFretboardIndex, chordObject);
                return;
            }
        } else {
            spread(fretboards, selectedFretboardIndex, notes, intervals, displayType);
            onSetTitle(name);
        }
    }, [onSetTitle, fretboards, selectedFretboardIndex, displayChordPortion, getArppegioNotes, getModeIntervals, getModeNotes, getScaleIntervals, getScaleNotes, spread]);

    const getCurrentDisplayableScaleNotes = useCallback((fretboard) => {
        let scaleNotes = [];
        if (fretboard.keySignature === '') return [];
        if (fretboard.scale !== '') {
            scaleNotes = getScaleNotes(fretboard);
            if (guitar.scales[fretboard.scale].isModal && fretboard.mode !== '') {
                scaleNotes = getModeNotes(fretboard);
            }
        } else if (fretboard.arppegio !== '') {
            scaleNotes = getArppegioNotes(true, fretboard);
        } else if (fretboard.chord !== '') {
            scaleNotes = getArppegioNotes(false, fretboard);
        }
        return scaleNotes;
    }, [getScaleNotes, getModeNotes, getArppegioNotes]);

    const getCurrentDisplayableScaleIntervals = useCallback((fretboard) => {
        let scaleIntervals = [];
        if (fretboard.scale !== '') {
            scaleIntervals = getScaleIntervals();
            if (guitar.scales[fretboard.scale].isModal && fretboard.mode !== '') {
                scaleIntervals = getModeIntervals();
            }
        }
        if (fretboard.arppegio !== '') {
            scaleIntervals = getArppegioIntervals(true);
        }
        if (fretboard.chord !== '') {
            scaleIntervals = getArppegioIntervals(false);
        }
        return scaleIntervals;
    }, [getScaleIntervals, getModeIntervals, getArppegioIntervals]);

    const getNoteIndex = useCallback((currentNote, fretboard) => {
        const scaleNotes = getCurrentDisplayableScaleNotes(fretboard);
        if (notesDisplay) {
            return scaleNotes.indexOf(currentNote);
        }
        return getCurrentDisplayableScaleIntervals(fretboard).indexOf(currentNote);
    }, [getCurrentDisplayableScaleIntervals, getCurrentDisplayableScaleNotes, notesDisplay]);

    const addChordToProgression = () => {
        if (fretboards[selectedFretboardIndex].keySignature === '') return;
        if (fretboards[selectedFretboardIndex].chord === '') return;
        if (fretboards[selectedFretboardIndex].shape === '' && fretboards[selectedFretboardIndex].fret === '') return;
    
        const chordObject = {
            key: fretboards[selectedFretboardIndex].keySignature,
            chord: fretboards[selectedFretboardIndex].chord,
            shape: fretboards[selectedFretboardIndex].shape,
            fret: parseInt(fretboards[selectedFretboardIndex].fret, 10),
            highlighted: false,
            quality: guitar.arppegios[fretboards[selectedFretboardIndex].chord].quality,
            id: chordProgression.length + 1
        };
        const newChordProgression = [...chordProgression, chordObject];
        setChordProgression(newChordProgression);
        localStorage.setItem('progression', JSON.stringify(newChordProgression));
    };
    

    const saveProgression = () => {
        if (chordProgression && chordProgression.length > 0) {
            localStorage.setItem("progression", JSON.stringify(chordProgression));
        }
    };

    const playChordProgression = useCallback(async () => {
        cleanFretboard();

        for (let i = 0; i < chordProgression.length; i++) {
            displayChordPortion(selectedFretboardIndex, chordProgression[i]);
            await new Promise(r => setTimeout(r, 4000));
        }

    }, [chordProgression, displayChordPortion, selectedFretboardIndex]);

    const updateStatesFromURL = () => {
        const queryParams = queryString.parse(location.search);
        const fretboardIndex = parseInt(queryParams.nofb, 10);
        const key = parseInt(queryParams.key, 10);
        const scale = queryParams.scale;
        const mode = parseInt(queryParams.mode, 10);
        const arppegio = queryParams.arppegio;
        const chord = queryParams.chord;
        const shape = queryParams.shape;
        const fret = queryParams.fret;
        const notesDisplay = queryParams.notesDisplay === "true";
        const choice = queryParams.display;
        const tuning = queryParams.tunes ? queryParams.tunes.split("-").map(Number) : undefined;
        const numberOfStrings = parseInt(queryParams.nostr, 10);
        const numberOfFrets = parseInt(queryParams.nofrets, 10);

        if (!isNaN(fretboardIndex) && fretboardIndex >= 0) {
            updateFretboardState({
                fretboardIndex,
                key,
                scale,
                mode,
                arppegio,
                chord,
                shape,
                fret,
                notesDisplay,
                tuning,
                numberOfStrings,
                numberOfFrets,
                choice
            });
        }
    };

    const updateFretboardState = ({
        fretboardIndex, key, scale, mode, arppegio, chord, shape, fret, notesDisplay, tuning, numberOfStrings, numberOfFrets, choice
    }) => {
        if (isNaN(fretboardIndex) || fretboardIndex === -1) return;
        if (fretboards.length === 0 || search === fretboards[fretboardIndex].url) return;

        setChoice(choice);
        updateFretboardProperty(fretboardIndex, 'url', search);
        updateFretboardProperty(fretboardIndex, 'keySignature', parseInt(key, 10) >= 0 && parseInt(key, 10) < 12 ? parseInt(key, 10) : '');
        updateFretboardProperty(fretboardIndex, 'scale', Object.keys(guitar.scales).includes(scale) ? scale : '');
        updateFretboardProperty(fretboardIndex, 'mode', parseInt(mode, 10) >= 0 && parseInt(mode, 10) <= 6 ? mode : '');
        updateFretboardProperty(fretboardIndex, 'arppegio', Object.keys(guitar.arppegios).includes(arppegio) ? arppegio : '');
        updateFretboardProperty(fretboardIndex, 'chord', Object.keys(guitar.arppegios).includes(chord) ? chord : '');
        updateFretboardProperty(fretboardIndex, 'shape', shape ? shape : '');
        updateFretboardProperty(fretboardIndex, 'fret', fret > 0 && fret < 22 ? fret : '');
        updateFretboardProperty(fretboardIndex, 'notesDisplay', notesDisplay === true || notesDisplay === false ? notesDisplay : true);
        updateFretboardProperty(fretboardIndex, 'tuning', tuning || [4, 11, 7, 2, 9, 4]);

        const str = numberOfStrings || 6;
        const frts = numberOfFrets || 22;
        updateFretboardProperty(fretboardIndex, 'nostr', str);
        updateFretboardProperty(fretboardIndex, 'nofrets', frts);
        updateFretboardProperty(fretboardIndex, 'fretboard', newLayout(str, frts, tuning || [4, 11, 7, 2, 9, 4]));
    };

    useEffect(() => {
        updateStatesFromURL();
    }, [location.search]);

    useEffect(() => {
        update();
    }, [fretboards]);

    useEffect(() => {
        const restoredChordProgression = JSON.parse(localStorage.getItem("progression"));
        if (restoredChordProgression && restoredChordProgression.length) {
            setChordProgression(restoredChordProgression);
        }
    }, [setChordProgression]);

    const keys = guitar.notes.sharps.map((note, index) => <option key={index} value={index}>{note}</option>);

    const currentScale = guitar.scales[scale];
    const scaleModes = currentScale?.isModal ? currentScale.modes : [];

    const buttonText = notesDisplay ? 'Intervals' : 'Notes';

    const arppegiosNames = Object.keys(guitar.arppegios);
    const arppegios = arppegiosNames.map(arppegioName => <option key={arppegioName} value={arppegioName}>{arppegioName}</option>);

    const chords = arppegios;

    const [choice, setChoice] = useState(null);

    const handleChoiceChange = (choice) => {
        const search = queryString.parse(props.history.location.search);
        props.history.push('/fretboard?key=' + search.key);
        onElementChange(selectedFretboardIndex, 'nofb');
        onElementChange(choice, 'display');
    };

    const pointCircleOfFifth = (keySignature) => {
        const currentChord = guitar.arppegios[chord] || guitar.arppegios['M'];
        return currentChord.quality.includes("Major") || currentChord.name.includes("Major")
            ? guitar.notes.flats[keySignature]
            : guitar.notes.flats[keySignature] + 'm';
    };

    return (
        <div className="fretboard-container">
            <IconButton onClick={addFretboard}>
                <AddCircleOutlineIcon />
            </IconButton>

            <FretboardDisplay
                chordProgression={chordProgression}
                selectedFretboardIndex={selectedFretboardIndex}
                fretboards={fretboards}
                getNoteIndex={getNoteIndex}
                numberOfStrings={numberOfStrings}
                numberOfFrets={numberOfFrets}
                toggleNote={toggleNote}
                handleFretboardSelect={handleFretboardSelect}
                onElementChange={onElementChange}
            />

            <CircleOfFifths
                className={classes.circleOfFifths}
                setKey={setKey}
                setScale={setScale}
                setMode={setMode}
                selectedTone={pointCircleOfFifth(keySignature)}
                onElementChange={onElementChange}
                keySignature={keySignature}
                quality={chord ? guitar.arppegios[chord].quality : "Minor"}
            />

            <TabReader toggleNote={toggleNote} />

            <Progressor
                className={classes.chordPressionDisplay}
                chordProgression={chordProgression}
                setChordProgression={setChordProgression}
                playChordProgression={playChordProgression}
            />

            {selectedFretboardIndex >= 0 && (
                <section className="controls">
                    <FretboardControls
                        classes={classes}
                        handleChoiceChange={handleChoiceChange}
                        keySignature={fretboards[selectedFretboardIndex].keySignature}
                        onElementChange={onElementChange}
                        buttonText={buttonText}
                        scaleModes={scaleModes}
                        arppegiosNames={arppegiosNames}
                        choice={choice}
                        onCleanFretboard={onCleanFretboard}
                        onCopyLink={onCopyLink}
                        selectedMode={fretboards[selectedFretboardIndex].mode}
                        selectedScale={fretboards[selectedFretboardIndex].scale}
                        selectedChord={fretboards[selectedFretboardIndex].chord}
                        selectedShape={fretboards[selectedFretboardIndex].shape}
                        selectedArppegio={fretboards[selectedFretboardIndex].arppegio}
                        selectedFret={fretboards[selectedFretboardIndex].fret}
                        addChordToProgression={addChordToProgression}
                        saveProgression={saveProgression}
                        playChordProgression={playChordProgression}
                        chordProgression={chordProgression}
                    />
                </section>
            )}
        </div>
    );
});

const mapStateToProps = state => {
    const {
        fretboard, fretboards, keySignature, scale, mode, arppegio, chord, shape, fret, notesDisplay
    } = state.fretboard;
    const { chordProgression } = state.partitions;

    return {
        chordProgression,
        fretboard,
        fretboards,
        keySignature,
        scale,
        mode,
        arppegio,
        chord,
        shape,
        fret,
        notesDisplay,
    };
};

export default connect(
    mapStateToProps, 
    { 
        setFretboard, updateFretboardProperty, setFretboards, toggleNote, setKey, setScale, setScaleFormula, setScaleNotes, setScaleIntervals, setMode, setModeNotes, setModeIntervals, setArppegio, setArppegioNotes, setArppegioIntervals, setChord, setShape, setFret, setChordProgression, setNotesDisplay 
    }
)(Fretboard);

