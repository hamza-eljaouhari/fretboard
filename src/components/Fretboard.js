import React, { useEffect, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FretboardControls from './FretboardControls';
import CircleOfFifths from './CircleOfFifths';
import Progressor from './Progressor';
import TabReader from './TabReader';
import FretboardDisplay from './FretboardDisplay';
import guitar from '../config/guitar';
import {
    newFretboard, newLayout,
    setFretboards, toggleNote, updateFretboardProperty, setChordProgression
} from '../redux/actions';
import { getNoteFromFretboard, getChordIntervals } from '../redux/helpers';
import './guitar-neck.css';
import { useDispatch, useSelector } from 'react-redux';
import { $CombinedState } from 'redux';
const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
    root: { display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', position: 'relative' },
    fretboardArea: { flex: 1, overflowY: 'auto' },
    footer: { position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: theme.palette.background.paper, boxShadow: '0 -2px 10px rgba(0,0,0,0.2)', padding: theme.spacing(2), display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000 },
    selectControl: { minWidth: 120 },
    formControl: { margin: theme.spacing(1), minWidth: 120, width: '100%' },
    fixedWidth: { width: '200px' },
    buttonGroup: { display: 'flex', justifyContent: 'center', gap: theme.spacing(1) },
    chordPressionDisplay: {}
}));

const defaultTuning = [4, 11, 7, 2, 9, 4];

const Fretboard = withRouter((props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedFretboardIndex, setSelectedFretboardIndex] = useState(-1);
    const [choice, setChoice] = useState('scale');
    const { setFretboards, fretboards, chordProgression, setChordProgression } = props;
    const selectedFretboard = selectedFretboardIndex >= 0 ? fretboards[selectedFretboardIndex] : newFretboard();

    useEffect(() => {
        update();
    }, [fretboards, choice]);

    useEffect(() => {
        const restoredChordProgression = JSON.parse(localStorage.getItem('progression'));
        if (restoredChordProgression?.length) {
            dispatch(setChordProgression(restoredChordProgression));
        }
    }, [setChordProgression]);

    const handleFretboardSelect = (index) => {
        setSelectedFretboardIndex(index);
    };

    const handleChoiceChange = (newChoice) => {
        setChoice(newChoice);
        const storedURL = selectedFretboard.urlSettings[newChoice];
        props.history.push('/fretboard' + storedURL);
    };

    const addFretboard = () => {
        const newFretboards = [...fretboards, newFretboard(6, 22, defaultTuning)];
        dispatch(setFretboards(newFretboards))
        setSelectedFretboardIndex(newFretboards.length - 1);
        onElementChange(newFretboards.length - 1, 'nofb');
    };

    const cleanFretboard = useCallback(() => {
        if (selectedFretboardIndex === -1) return;
        const updatedFretboards = [...fretboards];
        updatedFretboards[selectedFretboardIndex].fretboard.forEach(string => string.forEach(note => note.show = false));
        dispatch(setFretboards(updatedFretboards))
    }, [selectedFretboardIndex, fretboards, setFretboards]);
  
    const onElementChange = (value, element) => {
        const newElement = getNewElementValue(value, element);
        updateUrl(element, newElement);
        const propertiesUpdate = getPropertiesUpdate(element, value, newElement);
        dispatchPropertiesUpdate(propertiesUpdate);
        updateUrlSettings();
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
                    { property: `keySettings.${choice}`, value }
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
                    { property: 'chordSettings.shape', value: value || '' }
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
                console.log(value)
                return [
                    { property: 'generalSettings.tuning', value: value.split('-').map(num => parseInt(num, 10)) || defaultTuning }
                ];
            case 'nostrs':
                return [
                    { property: 'generalSettings.nostrs', value: parseInt(value) || 6 },
                    { property: 'fretboard', value: newLayout(parseInt(value), selectedFretboard.generalSettings.nofrets, selectedFretboard.generalSettings.tuning) }
                ]
            case 'nofrets':
                return [
                    { property: 'generalSettings.nofrets', value: parseInt(value) || 22 },
                    { property: 'fretboard', value: newLayout(selectedFretboard.generalSettings.nostrs, parseInt(value), selectedFretboard.generalSettings.tuning) }
                ];
            case 'arppegio':
                return [
                    { property: 'arppegioSettings.arppegio', value: value },
                    { property: 'fretboard', value: newLayout(selectedFretboard.generalSettings.nostrs, parseInt(value), selectedFretboard.generalSettings.tuning) }
                ];
            default:
                return null;
        }
    };
    
    const dispatchPropertiesUpdate = (updates) => {
        if (updates !== null && updates.length > 0) {
            for(let i = 0 ; i < updates.length; i++){
                dispatch(updateFretboardProperty(selectedFretboardIndex, updates[i].property, updates[i].value));
            }
        }
    };
    
    const updateUrlSettings = (choice) => {
        dispatch(updateFretboardProperty(selectedFretboardIndex, `urlSettings.${choice}`, props.history.location.search));
    };
    
    const onCleanFretboard = () => {
        props.history.push('/fretboard');
        cleanFretboard();
    };

    const onCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => alert("The link has been copied successfully."), () => alert("Oops, something went wrong. You can copy the link directly."));
    };

    // Get Scale Notes
    useEffect(() => {
        if (choice !== 'scale' || selectedFretboard.scaleSettings.scale === '' || selectedFretboard.keySettings.scale === '' || selectedFretboardIndex === -1) return;
        
        const scaleNotes = getScaleNotes(selectedFretboard.scaleSettings.scale, selectedFretboard.keySettings.scale)
        dispatch(updateFretboardProperty(selectedFretboardIndex, 'scaleSettings.notes', scaleNotes));
    }, [selectedFretboard.scaleSettings.scale, selectedFretboard.keySettings.scale, choice]);

    // Get Scale Intervals
    useEffect(() => {
        if (choice !== 'scale' ||  selectedFretboard.scaleSettings.scale === '' || selectedFretboardIndex === -1) return;

        const scaleIntervals = guitar.scales[selectedFretboard.scaleSettings.scale]?.intervals || [];
        dispatch(updateFretboardProperty(selectedFretboardIndex, 'scaleSettings.intervals', scaleIntervals));
    }, [selectedFretboard.scaleSettings.scale]);

    useEffect(() => {
        if (choice !== 'scale' || selectedFretboard.modeSettings.mode === '' || selectedFretboardIndex === -1) return;

        const modeNotes = getModeNotes(selectedFretboard.scaleSettings.notes, selectedFretboard.modeSettings.mode)
        
        dispatch(updateFretboardProperty(selectedFretboardIndex, 'modeSettings.notes', modeNotes));
    }, [selectedFretboard.modeSettings.mode]);

    const getModeIntervals = (scale, mode) => {
        return guitar.scales[scale]?.modes[parseInt(mode)]?.intervals || [];
    };

    // Get Mode intervals
    useEffect(() => {
        if (choice !== 'scale' || selectedFretboard.modeSettings.mode === '' || selectedFretboardIndex === -1) return;

        const modeIntervals = getModeIntervals(selectedFretboard.scaleSettings.scale, selectedFretboard.modeSettings.mode);
        dispatch(updateFretboardProperty(selectedFretboardIndex, 'modeSettings.intervals', modeIntervals));
    }, [selectedFretboard.modeSettings.mode]);

    // Get Arppegio Notes
    useEffect(() => {
        if (choice !== 'arppegio' || selectedFretboard.arppegioSettings.arppegio === '' || selectedFretboardIndex === -1) return;

        const formula = guitar.arppegios[selectedFretboard.arppegioSettings.arppegio]?.formula;
        const arppegioNotes = formula 
            ? formula.map((step, index) => guitar.notes.sharps[(parseInt(selectedFretboard.keySettings[choice]) + formula.slice(0, index + 1).reduce((a, b) => a + b, 0)) % 12]) 
            : [];
        
        dispatch(updateFretboardProperty(selectedFretboardIndex, 'arppegioSettings.notes', arppegioNotes));
    }, [selectedFretboard.arppegioSettings.arppegio, choice]);

    // Get Arppegio Intervals
    useEffect(() => {
        if (choice !== 'arppegio' || selectedFretboard.arppegioSettings.arppegio === '' || selectedFretboardIndex === -1) return;

        const arppegioIntervals = guitar.arppegios[selectedFretboard.arppegioSettings.arppegio || selectedFretboard.chordSettings.chord]?.intervals || [];
        dispatch(updateFretboardProperty(selectedFretboardIndex, 'arppegioIntervals.intervals', arppegioIntervals));
    }, [selectedFretboard.arppegioSettings.arppegio]);
    
    const getScaleNotes = (scale, key) => {
        if (!scale || key === '') return [];

        const { formula } = guitar.scales[scale];
        const keyIndex = parseInt(key);

        let currentNoteIndex = keyIndex;
        const scaleNotes = [guitar.notes.sharps[currentNoteIndex]];

        formula.forEach(step => {
            currentNoteIndex = (currentNoteIndex + step) % 12;
            scaleNotes.push(guitar.notes.sharps[currentNoteIndex]);
        });

        return scaleNotes;
    };

    // Get Mode notes
    const getModeNotes = (scaleNotes, mode) => {
        const modeNotes = scaleNotes.length ? scaleNotes.slice(parseInt(mode)).concat(scaleNotes.slice(0, parseInt(mode))) 
            : [];

        return modeNotes;
    }

    const getParentScale = (modeName) => {
        for (const [scaleKey, scale] of Object.entries(guitar.scales)) {
            if(scale.isModal){
                const mode = scale.modes.find(mode => mode.name.toLowerCase() === modeName.toLowerCase());
                if (mode) {
                    return scaleKey;
                }
            }
        }
        return null;
    };

    const getModeIndex = (parentScale, matchingScale) => {
        // Find the starting point of the matchingScale within the parentScale
        return guitar.scales[parentScale].modes.findIndex(mode => mode.name.toLowerCase() === matchingScale.toLowerCase());
    };
    
    const displayChordPortion = useCallback((chordObject) => {
        const { key, chord, shape } = chordObject;
        const cagedShape = guitar.arppegios[chord]?.cagedShapes[shape];

        console.log(key)
        console.log(chord)
        console.log(shape)
        console.log(cagedShape)
        if (!cagedShape) return;

        const matchingScale = guitar.arppegios[selectedFretboard.chordSettings.chord]?.matchingScale || [];


        console.log("matchingScale", matchingScale);
        const isScale = guitar.scales[matchingScale] !== undefined;

        const parentScale = guitar.scales[matchingScale] === undefined ? getParentScale(matchingScale) : matchingScale;
        const parentScaleNotes = getScaleNotes(parentScale, selectedFretboard.keySettings[choice]);
        
        let intervals = [];
        let notes = [];

        console.log("parentScale", parentScale);
        console.log("parentScaleNotes", parentScaleNotes);

        console.log("isScale", isScale);
        
        if(isScale){
            const scaleIntervals = guitar.scales[parentScale].intervals;
            intervals = scaleIntervals;
            notes = parentScaleNotes;

        } else {
            const modeNotes = getModeNotes(parentScaleNotes, selectedFretboard.keySettings[choice]);
            const modeIndex = getModeIndex(parentScale, matchingScale);
            const modeIntervals = getModeIntervals(parentScale, modeIndex);
            intervals = modeIntervals;
            notes = modeNotes;

            console.log("modeIndex", modeIndex);
        }

        console.log("chord intervals", guitar.arppegios[chord].intervals)

        console.log("notes", notes);
        console.log("intervals", intervals);

        const nf = JSON.parse(JSON.stringify(selectedFretboard));

        nf.fretboard.forEach(string => string.forEach(note => {note.show = false}));

        cagedShape.forEach((fret, stringIndex) => {
            if (fret !== null) {
                const displayFret = fret + key + guitar.shapes.intervals[guitar.shapes.names.indexOf(shape)];
                if (displayFret < nf.fretboard[guitar.numberOfStrings - 1 - stringIndex].length) {
                    nf.fretboard[guitar.numberOfStrings - 1 - stringIndex][displayFret].show = true;
                    const noteIndex = notes.indexOf(nf.fretboard[guitar.numberOfStrings - 1 - stringIndex][displayFret].current);
                    nf.fretboard[guitar.numberOfStrings - 1 - stringIndex][displayFret].interval = intervals[noteIndex];

                }
            }
        });

        console.log(nf.fretboard)

        const updatedFretboards = [...fretboards];
        updatedFretboards[selectedFretboardIndex] = nf;

        if (JSON.stringify(updatedFretboards) !== JSON.stringify(fretboards)) {
            dispatch(setFretboards(updatedFretboards));
        }
    }, [setFretboards, fretboards, selectedFretboardIndex]);

    const spread = (notes, intervals, choice) => {
        const fretboardClone = JSON.parse(JSON.stringify(selectedFretboard));
        fretboardClone.fretboard.forEach(string => string.forEach((note) => {
            note.show = false;
            note.interval = undefined;
            return note;
        }));

        fretboardClone.fretboard.forEach((string, stringIndex) => {
            for (let fretIndex = 0; fretIndex < fretboardClone.generalSettings.nofrets; fretIndex++) {
                const currentNote = getNoteFromFretboard(stringIndex, fretIndex, fretboardClone.generalSettings.tuning);
                if (notes.includes(currentNote)) {
                    fretboardClone.fretboard[stringIndex][fretIndex].show = true;
                    fretboardClone.fretboard[stringIndex][fretIndex].current = selectedFretboard.generalSettings.notesDisplay ? currentNote : intervals[notes.indexOf(currentNote)];
                }
            }
        });

        const updatedFretboards = [...fretboards];
        updatedFretboards[selectedFretboardIndex] = fretboardClone;

        if (JSON.stringify(updatedFretboards) !== JSON.stringify(fretboards)) {
            if (choice === 'scale') {
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'scaleSettings.notes', notes));
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'scaleSettings.intervals', intervals));
            } else if (choice === 'mode') {
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'modeSettings.notes', notes));
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'scaleSettings.intervals', intervals));
            } else if (choice === 'arppegio') {
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'arppegioSettings.notes', notes));
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'arppegioSettings.intervals', intervals));
            }
            dispatch(setFretboards(updatedFretboards));
        }
    };

    const update = useCallback(() => {
        if (selectedFretboardIndex === -1) return;
        const {chordSettings, keySettings, scaleSettings } = selectedFretboard;
        if (keySettings[choice] === "") return;

        const {chord} = chordSettings;
        const {shape} = chordSettings;
        const {scale} = scaleSettings;
        
        if (choice === 'chord' && chord && shape) {
            console.log(chord);
            displayChordPortion({ key: keySettings[choice], chord, shape: shape });
        } else if (choice === 'arppegio') {
            const notes = selectedFretboard[choice + 'Settings'].notes;
            const intervals = selectedFretboard[choice + 'Settings'].intervals;
            spread(notes, intervals, choice);
        } else {
            if(scale !== ''){
                const isModalRequest = guitar.scales[scale].isModal;
                const newChoice = isModalRequest ? 'mode' : 'scale';
                const notes = selectedFretboard[newChoice + 'Settings'].notes;
                const intervals = selectedFretboard[newChoice + 'Settings'].intervals;
                console.log("NOTES", notes);
                console.log("INTERVALS", intervals);
                spread(notes, intervals, choice);
            }
           
        }

    }, [choice, selectedFretboard, selectedFretboardIndex, spread]);

    const addChordToProgression = () => {
        const { keySignature, chord, shape, fret } = selectedFretboard;
        if (!keySignature || !chord || (!shape && !fret)) return;
        const chordObject = {
            key: keySignature,
            chord,
            shape,
            fret: parseInt(fret, 10),
            highlighted: false,
            quality: guitar.arppegios[chord].quality,
            id: chordProgression.length + 1
        };
        const newChordProgression = [...chordProgression, chordObject];
        dispatch(setChordProgression(newChordProgression));
        localStorage.setItem('progression', JSON.stringify(newChordProgression));
    };

    const saveProgression = () => {
        if (chordProgression.length) {
            localStorage.setItem("progression", JSON.stringify(chordProgression));
        }
    };

    const playChordProgression = useCallback(async () => {
        for (let i = 0; i < chordProgression.length; i++) {
            const { chord, shape, key } = chordProgression[i];
            props.history.push(`/fretboard?${queryString.stringify({ chord, display: 'chords', key, nofb: selectedFretboardIndex, shape })}`);
            await new Promise(r => setTimeout(r, 4000));
        }
    }, [chordProgression, props.history, selectedFretboardIndex]);


    const getDegree = (choice) => {
        const defaultDegree = 'Major';
        if (!choice || selectedFretboardIndex === -1 || !fretboards.length) return defaultDegree;
        const selectedKey = selectedFretboard.keySettings[choice];
        if (choice === 'scale') {
            const scale = guitar.scales[selectedFretboard.scaleSettings.scale];
            return scale ? scale.degree : defaultDegree;
        } else if (choice === 'chord' || choice === 'arppegio') {
            const chord = guitar.arppegios[selectedFretboard.chord];
            return chord ? chord.quality : defaultDegree;
        }
        return defaultDegree;
    };

    const getCircleData = () => {
        const defaultPoint = { tone: 'C', degree: 'Major' };
        if (!choice || selectedFretboardIndex === -1 || !fretboards.length || !selectedFretboard) return defaultPoint;
        const selectedKey = selectedFretboard.keySettings[choice];
        const selectedTone = guitar.notes.flats[selectedKey];
        return { tone: selectedTone, degree: getDegree(choice) };
    };

    const circleData = getCircleData();


    const currentScale = selectedFretboardIndex >= 0 && selectedFretboard ? guitar.scales[selectedFretboard.scaleSettings.scale] : 'major';
    const scaleModes = currentScale?.isModal ? currentScale.modes : [];

    console.log(selectedFretboard);

    return (
        <div className="fretboard-container">
            <IconButton onClick={addFretboard}>
                <AddCircleOutlineIcon />
            </IconButton>

            <FretboardDisplay
                chordProgression={chordProgression}
                selectedFretboardIndex={selectedFretboardIndex}
                fretboards={fretboards}
                numberOfStrings={selectedFretboard.generalSettings.nostrs || 6}
                numberOfFrets={selectedFretboard.generalSettings.nofrets || 22}
                toggleNote={toggleNote}
                handleFretboardSelect={handleFretboardSelect}
                onElementChange={onElementChange}
                choice={choice}
            />

            <CircleOfFifths
                className={classes.circleOfFifths}
                selectedTone={circleData.tone}
                onElementChange={onElementChange}
                selectedFretboardIndex={selectedFretboardIndex}
                quality={circleData.degree}
            />

            <TabReader toggleNote={toggleNote} />
{/* 
            <Progressor
                className={classes.chordPressionDisplay}
                chordProgression={chordProgression}
                setChordProgression={setChordProgression}
                playChordProgression={playChordProgression}
            /> */}

            {selectedFretboardIndex >= 0 && (
                <section className="controls">
                    <FretboardControls
                        classes={classes}
                        handleChoiceChange={handleChoiceChange}
                        scaleModes={scaleModes}
                        arppegiosNames={Object.keys(guitar.arppegios)}
                        choice={choice}
                        onCleanFretboard={onCleanFretboard}
                        keySignature={selectedFretboard.keySettings}
                        onCopyLink={onCopyLink}
                        selectedMode={selectedFretboard.modeSettings.mode}
                        selectedScale={selectedFretboard.scaleSettings.scale}
                        selectedChord={selectedFretboard.chordSettings.chord}
                        selectedShape={selectedFretboard.chordSettings.shape}
                        selectedArppegio={selectedFretboard.arppegioSettings.arppegio}
                        selectedFret={selectedFretboard.chordSettings.fret}
                        addChordToProgression={addChordToProgression}
                        saveProgression={saveProgression}
                        playChordProgression={playChordProgression}
                        chordProgression={chordProgression}
                        onElementChange={onElementChange}
                    />
                </section>
            )}
        </div>
    );
});

const mapStateToProps = state => {
    const { fretboards } = state.fretboard;
    const { chordProgression } = state.partitions;
    return { fretboards, chordProgression };
};

export default connect(
    mapStateToProps, 
    { 
        setFretboards, toggleNote, updateFretboardProperty, setChordProgression 
    }
)(Fretboard);
