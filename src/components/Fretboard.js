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
import { getNoteFromFretboard } from '../redux/helpers';
import './guitar-neck.css';
import { useDispatch, useSelector } from 'react-redux';

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
    const [choice, setChoice] = useState('scales');
    const { setFretboards, fretboards, chordProgression, setChordProgression } = props;
    const selectedFretboard = selectedFretboardIndex >= 0 ? fretboards[selectedFretboardIndex] : newFretboard();

    console.log("fretboards", fretboards)

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
        console.log("MODE VAL", value)
        console.log("NEW EL", element)
        updateUrl(element, newElement);
        const propertyUpdate = getPropertyUpdate(element, value, newElement);
        dispatchPropertyUpdate(propertyUpdate);
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
    
    const getPropertyUpdate = (element, value, newElement) => {
        switch (element) {
            case 'key':
                return { property: `keySettings.${choice}`, value };
            case 'scale':
                return { property: 'scaleSettings.scale', value: guitar.scales[value] ? value : '' };
            case 'mode':
                return { property: 'modeSettings.mode', value: value >= 0 && value <= 6 ? value : '' };
            case 'arppegio':
                return { property: 'arppegioSettings.arppegio', value: guitar.arppegios[value] ? value : '' };
            case 'chord':
                return { property: 'chordSettings.chord', value: guitar.arppegios[value] ? value : '' };
            case 'shape':
                return { property: 'chordSettings.shape', value: value || '' };
            case 'fret':
                return { property: 'chordSettings.fret', value: value > 0 && value < 22 ? value : '' };
            case 'notesDisplay':
                return { property: 'generalSettings.notesDisplay', value: newElement };
            case 'tuning':
                return { property: 'generalSettings.tuning', value: value || defaultTuning };
            case 'numberOfStrings':
                return { property: 'generalSettings.nostrs', value: value || 6 };
            case 'numberOfFrets':
                return { property: 'generalSettings.nofrets', value: value || 22 };
            default:
                return null;
        }
    };
    
    const dispatchPropertyUpdate = (update) => {
        if (update) {
            dispatch(updateFretboardProperty(selectedFretboardIndex, update.property, update.value));
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

    const getScaleNotes = useCallback(() => {
        if (!selectedFretboard.scaleSettings.scale) return [];
        const { formula } = guitar.scales[selectedFretboard.scaleSettings.scale];
        const keyIndex = parseInt(selectedFretboard.keySettings[choice]);

        let currentNoteIndex = keyIndex;
        const scaleNotes = [guitar.notes.sharps[currentNoteIndex]];

        formula.forEach(step => {
            currentNoteIndex = (currentNoteIndex + step) % 12;
            scaleNotes.push(guitar.notes.sharps[currentNoteIndex]);
        });

        return scaleNotes;
    }, [selectedFretboard, choice]);

    const getScaleIntervals = useCallback(() => {
        if (!selectedFretboard.scaleSettings.scale) return [];
        return guitar.scales[selectedFretboard.scaleSettings.scale]?.intervals || [];
    }, [selectedFretboard]);

    const getModeNotes = useCallback(() => {
        const scaleNotes = getScaleNotes();
        return scaleNotes.length ? scaleNotes.slice(parseInt(selectedFretboard.modeSettings.mode)).concat(scaleNotes.slice(0, parseInt(selectedFretboard.modeSettings.mode))) : [];
    }, [getScaleNotes, selectedFretboard]);

    const getModeIntervals = useCallback(() => {
        if (!selectedFretboard.scaleSettings.scale) return [];
        return guitar.scales[selectedFretboard.scaleSettings.scale]?.modes[parseInt(selectedFretboard.modeSettings.mode)]?.intervals || []
    }, [selectedFretboard]);

    const getArppegioNotes = useCallback((fromArppegio) => {
        const formula = guitar.arppegios[fromArppegio ? selectedFretboard.arppegio : selectedFretboard.chord]?.formula;
        return formula ? formula.map((step, index) => guitar.notes.sharps[(parseInt(selectedFretboard.keySettings[choice]) + formula.slice(0, index + 1).reduce((a, b) => a + b, 0)) % 12]) : [];
    }, [selectedFretboard, choice]);

    const getArppegioIntervals = useCallback((fromArppegio) => guitar.arppegios[fromArppegio ? selectedFretboard.arppegio : selectedFretboard.chord]?.intervals || [], [selectedFretboard]);

    const displayChordPortion = useCallback((chordObject) => {
        const { key, chord, shape } = chordObject;
        const cagedShape = guitar.arppegios[chord]?.cagedShapes[shape];
        if (!cagedShape) return;

        const nf = JSON.parse(JSON.stringify(selectedFretboard));

        nf.fretboard.forEach(string => string.forEach(note => note.show = false));

        cagedShape.forEach((fret, stringIndex) => {
            if (fret !== null) {
                const displayFret = fret + key + guitar.shapes.intervals[guitar.shapes.names.indexOf(shape)];
                if (displayFret < nf.fretboard[guitar.numberOfStrings - 1 - stringIndex].length) {
                    nf.fretboard[guitar.numberOfStrings - 1 - stringIndex][displayFret].show = true;
                }
            }
        });

        const updatedFretboards = [...fretboards];
        updatedFretboards[selectedFretboardIndex] = nf;

        if (JSON.stringify(updatedFretboards) !== JSON.stringify(fretboards)) {
            dispatch(setFretboards(updatedFretboards));
        }
    }, [setFretboards, fretboards, selectedFretboardIndex]);

    const spread = useCallback((notes, intervals, choice) => {
        const fretboardClone = JSON.parse(JSON.stringify(selectedFretboard));
        fretboardClone.fretboard.forEach(string => string.forEach(note => note.show = false));

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
            if (choice === 'scales') {
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'scaleSettings.notes', notes));
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'scaleSettings.intervals', intervals));
            } else if (choice === 'modes') {
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'modeSettings.notes', notes));
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'scaleSettings.intervals', intervals));
            } else if (choice === 'arpeggios') {
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'arppegioSettings.notes', notes));
                dispatch(updateFretboardProperty(selectedFretboardIndex, 'arppegioSettings.intervals', intervals));
            }
            dispatch(setFretboards(updatedFretboards));
        }
    }, [fretboards, updateFretboardProperty, setFretboards]);

    const update = useCallback(() => {
        if (selectedFretboardIndex === -1) return;
        const { scaleSettings, modeSettings, arppegioSettings, chordSettings, keySettings } = selectedFretboard;
        if (keySettings[choice] === "") return;

        const {scale} = scaleSettings;
        const {arppegio} = arppegioSettings;
        const {mode} = modeSettings;
        const {chord} = chordSettings;
        
        let notes = [], intervals = [], name = '', displayType = 'scale';

        if (choice === 'scales' && scale) {
            notes = getScaleNotes();
            intervals = getScaleIntervals();
            name = `${notes[0]} ${guitar.scales[scale].name} scale`;
            if (guitar.scales[scale].isModal && mode) {
                notes = getModeNotes();
                intervals = getModeIntervals();
                name = `${notes[0]} ${guitar.scales[scale].modes[mode].name} from the ${name} (Mode #${parseInt(mode, 10) + 1})`;
            }
        } else if (choice === 'arpeggios' && arppegio) {
            notes = getArppegioNotes(true);
            intervals = guitar.arppegios[arppegio].intervals;
            name = `${notes[0]} ${guitar.arppegios[arppegio].name} arpeggio`;
        } else if (choice === 'chords' && chord) {
            notes = getArppegioNotes(false);
            intervals = guitar.arppegios[chord].intervals;
            name = `${notes[0]} ${guitar.arppegios[chord].name} chord`;
            if (selectedFretboard.chordSettings.fret || selectedFretboard.chordSettings.shape) {
                displayChordPortion({ key: keySettings[choice], chord, shape: selectedFretboard.chordSettings.shape });
                return;
            }
        }

        if (notes.length > 0 && intervals.length > 0) {
            spread(notes, intervals, choice);
        }
    }, [choice, getArppegioNotes, getModeIntervals, getModeNotes, getScaleIntervals, getScaleNotes, selectedFretboard, selectedFretboardIndex, spread]);

    const getCurrentDisplayableScaleNotes = useCallback((fretboard) => {
        if (!fretboard.keySignature) return [];
        if (fretboard.scale) {
            let notes = getScaleNotes(fretboard);
            if (guitar.scales[fretboard.scale].isModal && fretboard.mode) {
                notes = getModeNotes(fretboard);
            }
            return notes;
        }
        if (fretboard.arppegio) return getArppegioNotes(true, fretboard);
        if (fretboard.chord) return getArppegioNotes(false, fretboard);
        return [];
    }, [getScaleNotes, getModeNotes, getArppegioNotes]);

    const getCurrentDisplayableScaleIntervals = useCallback((fretboard) => {
        if (fretboard.scale) {
            let intervals = getScaleIntervals();
            if (guitar.scales[fretboard.scale].isModal && fretboard.mode) {
                intervals = getModeIntervals();
            }
            return intervals;
        }
        if (fretboard.arppegio) return getArppegioIntervals(true);
        if (fretboard.chord) return getArppegioIntervals(false);
        return [];
    }, [getScaleIntervals, getModeIntervals, getArppegioIntervals]);

    const getNoteIndex = useCallback((currentNote, fretboard) => {
        const scaleNotes = getCurrentDisplayableScaleNotes(fretboard);
        return selectedFretboard.generalSettings.notesDisplay ? scaleNotes.indexOf(currentNote) : getCurrentDisplayableScaleIntervals(fretboard).indexOf(currentNote);
    }, [getCurrentDisplayableScaleIntervals, getCurrentDisplayableScaleNotes]);

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
        if (choice === 'scales') {
            const scale = guitar.scales[selectedFretboard.scaleSettings.scale];
            return scale ? scale.degree : defaultDegree;
        } else if (choice === 'chords' || choice === 'arpeggios') {
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
                numberOfStrings={selectedFretboard?.generalSettings.nostrs || 6}
                numberOfFrets={selectedFretboard?.generalSettings.nofrets || 22}
                toggleNote={toggleNote}
                handleFretboardSelect={handleFretboardSelect}
                onElementChange={onElementChange}
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
