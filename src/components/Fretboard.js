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
    const { setFretboards, fretboards, chordProgression, setChordProgression } = props;
    const selectedFretboard = selectedFretboardIndex >= 0 ? fretboards[selectedFretboardIndex] : newFretboard();

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
        dispatch(updateFretboardProperty(selectedFretboardIndex, 'generalSettings.choice', newChoice));
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

    const getArppegioNotes = (arppegio) => {
        const formula = guitar.arppegios[arppegio]?.formula;
        const arppegioNotes = formula 
            ? formula.map((step, index) => guitar.notes.sharps[(parseInt(selectedFretboard.keySettings['arppegio']) + formula.slice(0, index + 1).reduce((a, b) => a + b, 0)) % 12]) 
            : [];

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

    const getModeIntervals = (scale, mode) => {
        return guitar.scales[scale].modes[parseInt(mode)]?.intervals || [];
    }

    const getModeIndex = (parentScale, matchingScale) => {
        // Find the starting point of the matchingScale within the parentScale
        return guitar.scales[parentScale].modes.findIndex(mode => mode.name.toLowerCase() === matchingScale.toLowerCase());
    };
    
    const displayChordPortion = useCallback((chordObject) => {
        const { key, chord, shape } = chordObject;
        const cagedShape = guitar.arppegios[chord]?.cagedShapes[shape];

        if (!cagedShape) return;

        const { formula } = guitar.arppegios[chord];

        let currentNoteIndex = key;
        let chordNotes = [guitar.notes.sharps[currentNoteIndex]];

        formula.forEach(step => {
            currentNoteIndex = (currentNoteIndex + step) % 12;
            chordNotes.push(guitar.notes.sharps[currentNoteIndex]);
        });

        chordNotes = chordNotes.slice(0, -1);

        const chordIntervals = guitar.arppegios[chord].intervals;
        const nf = JSON.parse(JSON.stringify(selectedFretboard));

        nf.fretboard.forEach(string => string.forEach(note => {note.show = false}));


        cagedShape.forEach((fret, stringIndex) => {
            if (fret !== null) {
                const displayFret = fret + key + guitar.shapes.intervals[guitar.shapes.names.indexOf(shape)];
                if (displayFret < nf.fretboard[guitar.numberOfStrings - 1 - stringIndex].length) {
                    nf.fretboard[guitar.numberOfStrings - 1 - stringIndex][displayFret].show = true;
                    const noteIndex = chordNotes.indexOf(nf.fretboard[guitar.numberOfStrings - 1 - stringIndex][displayFret].current);
                    nf.fretboard[guitar.numberOfStrings - 1 - stringIndex][displayFret].interval = chordIntervals[noteIndex];
                }
            }
        });

        const updatedFretboards = [...fretboards];
        updatedFretboards[selectedFretboardIndex] = nf;

        if (JSON.stringify(updatedFretboards) !== JSON.stringify(fretboards)) {
            dispatch(setFretboards(updatedFretboards));
        }
    }, [setFretboards, fretboards, selectedFretboardIndex]);

    useEffect(() => {
        if (selectedFretboardIndex === -1) return;
        const {chordSettings, keySettings, scaleSettings, generalSettings, modeSettings, arppegioSettings } = selectedFretboard;
        if (keySettings[selectedFretboard.generalSettings.choice] === "") return;

        const {chord} = chordSettings;
        const {shape} = chordSettings;
        const {scale} = scaleSettings;
        const {choice} = generalSettings;
        const {mode} = modeSettings;
        const {arppegio} = arppegioSettings;
        
        let notes = [];
        let intervals = [];
        
        if (choice === 'chord' && chord && shape) {
            console.log(chord);
            displayChordPortion({ key: keySettings[choice], chord, shape: shape });
            return;
        } else if (choice === 'arppegio') {
            notes = getArppegioNotes(arppegio);
            intervals = getArppegioIntervals(arppegio);
        } else {
            if(scale !== ''){
                const isModalRequest = guitar.scales[scale].isModal;
                
                notes = getScaleNotes(scale, keySettings.scale);
                intervals = getScaleIntervals(scale) 
                
                if(isModalRequest) {
                    notes = getModeNotes(notes, mode);
                }
            }
           
        }
        
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
                    fretboardClone.fretboard[stringIndex][fretIndex].interval = intervals[notes.indexOf(currentNote)];
                }
            }
        });

        if (JSON.stringify(selectedFretboard.fretboard) !== JSON.stringify(fretboardClone.fretboard)) {
            dispatch(updateFretboardProperty(selectedFretboardIndex, 'fretboard', fretboardClone.fretboard));
        }
    }, [selectedFretboard]);

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
            displayChordPortion({ key, chord, shape });
            await new Promise(r => setTimeout(r, 4000));
        }
    }, [chordProgression, selectedFretboardIndex]);


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
        if (!selectedFretboard.generalSettings.choice || selectedFretboardIndex === -1 || !fretboards.length || !selectedFretboard) return defaultPoint;
        const selectedKey = selectedFretboard.keySettings[selectedFretboard.generalSettings.choice];
        const selectedTone = guitar.notes.flats[selectedKey];
        return { tone: selectedTone, degree: getDegree(selectedFretboard.generalSettings.choice) };
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
                numberOfStrings={selectedFretboard.generalSettings.nostrs || 6}
                numberOfFrets={selectedFretboard.generalSettings.nofrets || 22}
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
                        scaleModes={scaleModes}
                        arppegiosNames={Object.keys(guitar.arppegios)}
                        choice={selectedFretboard.generalSettings.choice}
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
