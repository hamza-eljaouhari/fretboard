import guitar from '../config/guitar';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import FretboardControls from './FretboardControls';
import CircleOfFifths from './CircleOfFifths';
import ChordProgressionDisplay from './ChordProgressionDisplay';
import TabReader from './TabReader';
import { newFretboard } from '../redux/reducers/fretboard';
import { IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FretboardDisplay from './FretboardDisplay';
import { useLocation } from 'react-router-dom'; // Assuming you're using react-router

import { 
        setFretboard,
        setFretboards,

        toggleNote, 
        
        setKey, 

        setScale, 
        setScaleFormula,
        setScaleNotes,
        setScaleIntervals,
        
        setMode,
        setModeNotes,
        setModeIntervals,
        setArppegio,
        setArppegioNotes,
        setArppegioIntervals,

        setChord,

        setShape,
        setFret,

        setNotesDisplay,
        setChordProgression
} from "../redux/actions";

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import { getNoteFromFretboard } from '../redux/helpers';
import classNames from "classnames";
import './guitar-neck.css';
import { Typography } from '@material-ui/core';
const queryString = require('query-string');

var oldSearch = '';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)', // Adjust for AppBar height if necessary
        position: 'relative', // Needed for footer positioning
    },
    fretboardArea: {
        flex: 1,
        overflowY: 'auto', // Allow scrolling within the fretboard area if necessary
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
        zIndex: 1000, // Ensure footer is above other content
    },
    selectControl: {
        minWidth: 120,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%', // Adjust based on layout requirements
    },
    fixedWidth: {
        width: '200px', // Fixed width for all child elements
    },
    // You can still keep the formControl class for additional styling specific to select menus
    formControl: {
        margin: theme.spacing(1),
        // No need to set width here if fixedWidth class is used for width
    },
    buttonGroup: {
        display: 'flex', // This enables flexbox
        justifyContent: 'center', // This centers the buttons horizontally in the container
        gap: theme.spacing(1), // Optional: adds space between buttons
    },
    chordPressionDisplay: {
        
    }
}));
  
const Fretboard = withRouter((props) => {

    const classes = useStyles();
    const search = props.history.location.search;
    const location = useLocation(); // React Router hook to access the current location

    const [numberOfStrings, setNumberOfStrings] = useState([6]); // Default to 6 strings
    const [numberOfFrets, setNumberOfFrets] = useState([22]); // Default to 22 frets

    const [selectedFretboardIndex, setSelectedFretboardIndex] = useState(0);

    const handleFretboardSelect = (index) => {
      setSelectedFretboardIndex(index);

      onElementChange(index, 'nofb');
    };
    
    // const handleTuneChange = (e, i) => {
    //     const tune = e.target.value;
    //     const indexOfTune = guitar.notes.flats.indexOf(tune);
    //     const updatedFretboards = [...fretboards];
    //     let newFretboard = updatedFretboards[selectedFretboardIndex];
    //     newFretboard.tuning[i] = indexOfTune >= 0 ? indexOfTune : '';
    //     onElementChange(fretboards[selectedFretboardIndex].tuning.join('-'), 'tunes');
        
    //     setFretboards(updatedFretboards)
    // };
    
    // Effect hook that reacts to changes in the URL's search part

    const {chordProgression, setChordProgression, setFretboards, fretboards, setFretboard, onSetTitle, notesDisplay, keySignature, fret, shape, scale, mode, arppegio, chord, fretboard, setNotesDisplay, setFret, setShape, setChord, setArppegio, setMode, setScale, setKey} = props;

    // const handleStringsChange = (e, fretboardIndex) => {
    //     const value = parseInt(e.target.value, 10);
    //     let newNumberOfStrings = [...numberOfStrings];
    //     newNumberOfStrings[fretboardIndex] = value;
    //     onElementChange(numberOfStrings[selectedFretboardIndex], 'nostr');
    
    //     updateFretboard(fretboardIndex, value, numberOfFrets[fretboardIndex]);
    // };
    
    // const handleFretsChange = (e, fretboardIndex) => {
    //     const value = parseInt(e.target.value, 10);
    //     let newNumberOfFrets = [...numberOfFrets];
    //     newNumberOfFrets[fretboardIndex] = value;
    //     onElementChange(numberOfFrets[selectedFretboardIndex], 'nofrets');
    
    //     updateFretboard(fretboardIndex, numberOfStrings[fretboardIndex], value);
    // };

    const addFretboard = () => {
        const newFretboardConfig = {
            id: fretboards.length + 1,
            fretboard: newFretboard(6, 22, [4, 11, 7, 2, 9, 4]),
            nofrets: 22,
            nostr: 6,
            tuning: [4, 11, 7, 2, 9, 4]
        };
        const newFretboards = [...fretboards, newFretboardConfig];
        setFretboards(newFretboards);
        console.log(newFretboards)
    };
    
    const cleanFretboard = useCallback(() => {

        var nf = newFretboard(numberOfStrings[selectedFretboardIndex], numberOfFrets[selectedFretboardIndex], fretboards[selectedFretboardIndex].tuning);
        
        for(let i = 0; i < numberOfStrings[selectedFretboardIndex]; i++){
            for(let j = 0; j < numberOfFrets[selectedFretboardIndex]; j++){
                nf[i][j].show = false;
            }
        }
        
        if (JSON.stringify(nf) !== JSON.stringify(fretboards[selectedFretboardIndex].fretboard)) {
            // Update the specific fretboard in the fretboards array
            const updatedFretboards = [...fretboards];
            updatedFretboards[selectedFretboardIndex].fretboard = nf;
            setFretboards(updatedFretboards); // Assuming setFretboards updates the state that holds all fretboards
        }
    }, [fretboard, setFretboard, numberOfStrings, numberOfFrets])

    const onElementChange = (targetValue, elementsName) => {
        var newElement = null;

        if(elementsName === 'notesDisplay'){
            newElement = !props[elementsName];
        } else {
            newElement = targetValue;
        }

        var search = queryString.parse(props.history.location.search);
        
        search[elementsName] = newElement;

        const newLocation = queryString.stringify(search);

        props.history.push('/?' + newLocation);
    }

    function onCleanFretboard(){
        props.history.push('');
        cleanFretboard();
    }

    function onCopyLink(){
        const url = window.location.href;

        var textArea = document.createElement("textarea");

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
            alert("Oop, something wrong happened. You can copy the link directly.")
        }
        
        document.body.removeChild(textArea);
    }

    const getScaleNotes = useCallback(() => {

        if(scale === ''){
            return [];
        }

        var scaleNotes = [];
        
        var scaleFormula = guitar.scales[scale].formula;
        
        var steps = 0;

        scaleFormula.forEach((step) => {
            scaleNotes.push(guitar.notes.sharps[(parseInt(keySignature) + steps) % 12]);
            steps += step;
        })

        return scaleNotes;
    }, [scale, keySignature])

    const getScaleIntervals = useCallback(() =>{

        if(scale === ''){
            return;
        }

        const repoScale = guitar.scales[scale];

        return repoScale.intervals;
    }, [scale])

    const getModeNotes = useCallback(() => {
    
        var modesNotes = [];

        var parsedMode = parseInt(mode)  ;
        
        // Get scale's notes
        var scaleNotes = getScaleNotes();

        // Put them in order
        while(modesNotes.length < scaleNotes.length){
            
            modesNotes.push(scaleNotes[parsedMode]);

            parsedMode++;
            
            if(parsedMode === scaleNotes.length){
                parsedMode = parsedMode % scaleNotes.length;
            }
        }

        return modesNotes;
    }, [mode, getScaleNotes])

    const getModeIntervals = useCallback(() => {

        if(scale === ''){
            return [];
        }

        if(keySignature === ''){
            return [];
        }

        const repoScale = guitar.scales[scale];
        
        var intervals = repoScale.modes[parseInt(mode)].intervals;

        return intervals;
    }, [scale, mode, keySignature])

    const getArppegioNotes = useCallback((fromArppegio) => {
        if(keySignature === ''){
            return [];
        }
        
        var arppegioFormula = [];

        if(fromArppegio){
            if(arppegio === ''){
                return [];
            }
            
            arppegioFormula = guitar.arppegios[arppegio].formula;

        }else{
            if(chord === ''){
                return [];
            }

            arppegioFormula = guitar.arppegios[chord].formula
        }

        var arppegioNotes = [];
        
        var steps = 0;

        arppegioFormula.forEach((step) => {
            arppegioNotes.push(guitar.notes.sharps[(parseInt(keySignature) + steps) % 12]);
            steps += step;
        })

        return arppegioNotes;
        
    }, [keySignature, arppegio, chord])

    const getArppegioIntervals = useCallback((isFromArppegio) => {

        if(keySignature === ''){
            return [];
        }

        if(arppegio === '' &&  chord === ''){
            return [];
        }
        
        var repoArppegio = null;

        if(isFromArppegio){
            repoArppegio = guitar.arppegios[arppegio];
        }else{
            repoArppegio = guitar.arppegios[chord];
        }
        
        var intervals = repoArppegio.intervals;

        return intervals;
    }, [keySignature, arppegio, chord])

    const displayChordPortion = useCallback((notes, intervals) => {
        var nf = [...fretboard];

        var startingIndex = 0;
        var lastIndex = null;
       
        if(shape !== ''){
            startingIndex = guitar.shapes.indexes[parseInt(shape)].start;
            lastIndex = guitar.shapes.indexes[parseInt(shape)].end + 1;
        }

        if(fret !== ''){
            startingIndex = parseInt(fret) - 1;
            lastIndex = startingIndex + 4;
        }

        var visitedStrings = [];

        notes.forEach((note) => {
            for(var m = 0; m < numberOfStrings; m++){
                for(var n = startingIndex; n < lastIndex; n++){
                    var currentNote = getNoteFromFretboard(m, n, [4, 11, 7, 2, 9, 4]);
                    if(!visitedStrings[m]){
                        if(note === currentNote){
                            visitedStrings[m] = true;

                            nf[m][n].show = true;
                            if(notesDisplay){
                                nf[m][n].current = currentNote;
                            }else{
                                nf[m][n].current = intervals[notes.indexOf(currentNote)];
                            }
                        }
                    }
                }
            }
        });
        
        if(JSON.stringify(nf) !== JSON.stringify(fretboard)){
            setFretboard(nf);
        }
    }, [shape, fret, notesDisplay, fretboard, setFretboard, numberOfStrings])

    
    const spread = useCallback((fretboardIndex, notes, intervals) => {
        // Validate the fretboardIndex and existence of fretboards
        if (!fretboards || fretboardIndex < 0 || fretboardIndex >= fretboards.length) {
          console.warn("Invalid fretboardIndex or fretboards not defined.");
          return;
        }
      
        // Clone the specific fretboard to avoid direct state mutation
        const fretboardClone = JSON.parse(JSON.stringify(fretboards[fretboardIndex]));
      
        // Calculate starting and last index based on shape or fret, if specified
        const startingIndex = shape ? guitar.shapes.indexes[parseInt(shape)].start : (fret ? parseInt(fret) - 1 : 0);
        const lastIndex = shape ? guitar.shapes.indexes[parseInt(shape)].end + 1 : (fret ? startingIndex + 4 : fretboardClone.nofrets);
      
        // Iterate through strings and frets within the range to update note visibility and current note/interval
        fretboardClone.fretboard.forEach((string, stringIndex) => {
          for (let fretIndex = startingIndex; fretIndex < lastIndex; fretIndex++) {
            const currentNote = getNoteFromFretboard(stringIndex, fretIndex, fretboardClone.tuning);
            if (notes.includes(currentNote)) {
              // Update show and current properties based on whether notes or intervals should be displayed
              fretboardClone.fretboard[stringIndex][fretIndex].show = true;
              fretboardClone.fretboard[stringIndex][fretIndex].current = notesDisplay ? currentNote : intervals[notes.indexOf(currentNote)];
            }
          }
        });
      
        // Update the fretboards array with the modified fretboard
        const updatedFretboards = [...fretboards];
        updatedFretboards[fretboardIndex] = fretboardClone;
      
        // Perform state update to trigger re-render
        
        if (JSON.stringify(updatedFretboards) !== JSON.stringify(fretboards)) {
            setFretboards(updatedFretboards); // Assuming setFretboards updates the state that holds all fretboards
        }

      }, [fretboards, shape, fret, notesDisplay, guitar.shapes.indexes, setFretboards]);
      
    const update = useCallback(() => {

        onSetTitle('Choose something to display...')

        if(keySignature === ''){
            return;
        }

        if(scale === '' && arppegio === '' && chord === ''){
            return;
        }

        var notes = null;
        var intervals = null;
        var name = '';

        if(scale !== ''){
            var isModal = guitar.scales[scale].isModal;

            notes = getScaleNotes();
            setScaleNotes(notes);
            
            intervals = getScaleIntervals();
            setScaleIntervals(intervals);

            name = notes[0] + ' ' + guitar.scales[scale].name + ' scale';
            
            if(isModal){
                if(mode !== ''){
                    notes = getModeNotes();
                    setModeNotes(notes)

                    intervals = getModeIntervals();
                    setModeIntervals(intervals);

                    let modeRootName = notes[0];

                    let modeNumber = parseInt(mode) + 1;

                    name = modeRootName + ' ' + guitar.scales[scale].modes[mode].name + ' from the ' + name + ' (Mode #' + modeNumber     + ')';
                }
            }
        }
    
        if(arppegio !== ''){
            notes = getArppegioNotes(true);
            setArppegioNotes(notes)

            intervals = guitar.arppegios[arppegio].intervals;
            setArppegioIntervals(intervals);

            name = notes[0] + ' ' + guitar.arppegios[arppegio].name + ' arppegio.';
        }
            
        if(chord !== ''){
            notes = getArppegioNotes(false);
            intervals = guitar.arppegios[chord].intervals;

            name = notes[0] + ' ' + guitar.arppegios[chord].name + ' chord.';

            if(fret !== '' || shape !== ''){
                onSetTitle(name);
                displayChordPortion(notes, intervals);
                return;
            }
        } else {
            spread(selectedFretboardIndex, notes, intervals);
            
            onSetTitle(name);
        }
    }, [onSetTitle, mode, fret, shape, arppegio, chord, keySignature, scale, displayChordPortion, getArppegioNotes, getModeIntervals, getModeNotes, getScaleIntervals, getScaleNotes, spread])
    
    const getCurrentDisplayableScaleNotes = useCallback(() => {
        
        var scaleNotes = [];

        if(keySignature === ''){
            return [];
        }

        if(scale !== ''){
            scaleNotes = getScaleNotes();
            if(guitar.scales[scale].isModal && mode !== ''){
                scaleNotes = getModeNotes();
            }
        }

        if(arppegio !== ''){
            scaleNotes = getArppegioNotes(true);
        }
        
        if(chord !== ''){
            scaleNotes = getArppegioNotes(false);
        }

        return scaleNotes;
    }, [getScaleNotes, getModeNotes, getArppegioNotes, scale, mode, arppegio, chord, keySignature])

    const getCurrentDisplayableScaleIntervals = useCallback(() => {
        
        var scaleIntervals = [];

        if(scale !== ''){
            scaleIntervals = getScaleIntervals();
            if(guitar.scales[scale].isModal && mode !== ''){
                scaleIntervals = getModeIntervals();
            }
        }

        if(arppegio !== ''){
            scaleIntervals = getArppegioIntervals(true);
        }

        if(chord !== ''){
            scaleIntervals = getArppegioIntervals(false);
        }

        return scaleIntervals;
        
    }, [scale, mode, arppegio, chord, getArppegioIntervals, getModeIntervals, getScaleIntervals])

    const getNoteIndex = useCallback((currentNote) => {

        var scaleNotes =  getCurrentDisplayableScaleNotes();

        if(notesDisplay){
            return scaleNotes.indexOf(currentNote);
        }

        return getCurrentDisplayableScaleIntervals().indexOf(currentNote);

    }, [getCurrentDisplayableScaleIntervals, getCurrentDisplayableScaleNotes, notesDisplay])

    const addChordToProgression = () => {
        if(keySignature === ''){
            return;
        }

        if(chord === ''){
            return;
        }
        
        if(shape === '' && fret === ''){
            return;
        }
        
        let chordObject = {
            key: keySignature,
            chord,
            shape,
            fret: parseInt(fret),
            highlighted: false,
            quality: guitar.arppegios[chord].quality,
            id: chordProgression.length + 1 
        };

        const newChordProgression = [...chordProgression, chordObject];
        
        setChordProgression(newChordProgression);
    }

    const saveProgression = () => {
        if(chordProgression && chordProgression.length > 0){
            localStorage.setItem("progression", JSON.stringify(chordProgression));            
        }
    }

    const parseGuitarTab = (tab) => {
        // Split the tab by lines
        const lines = tab.split('\n');
        const notes = []; // Array to hold parsed notes and techniques
    
        // Define regex to match notes and techniques
        const noteRegex = /(\d+)|(\d+[hpb]\d+)/g;
    
        lines.forEach((line, index) => {
            let string = 6 - index; // Calculate string number based on line index
            let match;
    
            while ((match = noteRegex.exec(line)) !== null) {
                if (match[0].includes('h')) {
                    // Handle hammer-on
                    const [startFret, endFret] = match[0].split('h').map(Number);
                    notes.push({ string, startFret, technique: 'hammer-on', endFret });
                } else if (match[0].includes('p')) {
                    // Handle pull-off
                    const [startFret, endFret] = match[0].split('p').map(Number);
                    notes.push({ string, startFret, technique: 'pull-off', endFret });
                } else if (match[0].includes('b')) {
                    // Handle bend
                    const [startFret, endFret] = match[0].split('b').map(Number);
                    notes.push({ string, startFret, technique: 'bend', endFret });
                } else {
                    // Handle regular note
                    const fret = parseInt(match[0], 10);
                    notes.push({ string, fret, technique: 'pluck' });
                }
            }
        });
    
        return notes;
    }
    

    const playChordProgression = async () => {
        props.history.push('');

        for(let i = 0; i < chordProgression.length; i++){
            const chordProgressionParams = Object.keys(chordProgression[i]);

            chordProgressionParams.forEach((key) => {
                var search = queryString.parse(props.history.location.search);
            
                search[key] = chordProgression[i][key];
                search['chordOrder'] = i;
        
                const newLocation = queryString.stringify(search);
        
                props.history.push('/?' + newLocation);
            });
            
            await new Promise(r => setTimeout(r, 4000));
        }
    }
   
    // Function to update states based on URL search parameters
    const updateStatesFromURL = () => {
        const { key, scale, mode, arppegio, chord, shape, fret, notesDisplay, nofb, tunes, nostr, nofrets } = queryString.parse(location.search);
        setKey(parseInt(key, 10) >= 0 && parseInt(key, 10) < 12 ? parseInt(key, 10) : '');
        setScale(Object.keys(guitar.scales).includes(scale) ? scale : '');
        setMode(parseInt(mode, 10) >= 0 && parseInt(mode, 10) <= 6 ? mode : '');
        setArppegio(Object.keys(guitar.arppegios).includes(arppegio) ? arppegio : '');
        setChord(Object.keys(guitar.arppegios).includes(chord) ? chord : '');
        setShape(shape >= 0 && shape <= 4 ? shape : '');
        setFret(fret > 0 && fret < 22 ? fret : '');
        setNotesDisplay(notesDisplay === "true" || notesDisplay === "false" ? notesDisplay === "true" : true);

        if(nofb || tunes || nostr || nofrets){

            const tuning = tunes && tunes.length > 0 ? tunes.split("-").map(Number) : [4, 11, 7, 2, 9, 4];
    
            if(fretboards.length === 0){
                setFretboards([{ id: 1, fretboard: newFretboard(parseInt(nostr) || 6, parseInt(nofrets) || 22, tuning), tuning: tuning, nostr: parseInt(nostr) || 6, nofrets: parseInt(nofrets) || 22} ]);
            } else {
                const toUpdateFretboard = [...fretboards];
                toUpdateFretboard[parseInt(nofb)].fretboard = newFretboard(parseInt(nostr) || 6, parseInt(nofrets) || 22, tuning);
                toUpdateFretboard[parseInt(nofb)].nofrets = parseInt(nofrets) || 22;
                toUpdateFretboard[parseInt(nofb)].nostr = parseInt(nostr) || 6;
                setFretboards(toUpdateFretboard);
            }
        }
    };
    
    // Effect hook that reacts to changes in the URL's search part
    useEffect(() => {
        updateStatesFromURL();
    // Potential additional logic here, like cleanFretboard or update
    }, [location.search]); // Dependency on location.search ensures this runs whenever the URL's search part changes

    // Effect hook that reacts to changes in the URL's search part
 
    useEffect(() => {
        // Code here will run after `keySignature` and other dependencies have been updated
        update();
      }, [keySignature, scale, mode, arppegio, chord, shape, fret, notesDisplay, fretboards]); // Include all state variables that trigger the update
      
    useEffect(() => {
        const restoredChordProgression = JSON.parse(localStorage.getItem("progression"));
        if(restoredChordProgression && restoredChordProgression.length){
            setChordProgression(restoredChordProgression);
        }
    }, [setChordProgression]);

    var keys = guitar.notes.sharps.map((note, index) => {
        return <option key={index} value={index}>{note}</option>
    })

    if(scale !== ''){

        const currentScale = guitar.scales[scale];

        if(currentScale.isModal){

            var scaleModes = currentScale.modes;
        }
    }

    var buttonText = 'Intervals'

    if(!notesDisplay){
        buttonText = 'Notes';
    }

    var arppegiosNames = Object.keys(guitar.arppegios);

    var arppegios = arppegiosNames.map((arppegioName) => {
        return <option key={arppegioName} value={arppegioName}>{arppegioName}</option>;
    });

    const chords = arppegios;

    const [choice, setChoice] = useState(null); // 'scale' or 'chord'

    // Event Handlers
    const handleChoiceChange = (choice) => {
        setChoice(choice);
    };

    const pointCircleOfFifth = (keySignature) => {
        if(chord && guitar.arppegios[chord].quality === "Major"){
            return guitar.notes.flats[keySignature];
        }
        return guitar.notes.flats[keySignature] + 'm';
    };

    console.log(fretboards)
    return(
        <div className="fretboard-container">


            <IconButton onClick={addFretboard}>
                <AddCircleOutlineIcon />
            </IconButton>

            <FretboardDisplay 
                fretboards={fretboards} 
                getNoteIndex={getNoteIndex} 
                numberOfStrings={numberOfStrings} 
                numberOfFrets={numberOfFrets} 
                toggleNote={toggleNote}
                handleFretboardSelect={handleFretboardSelect}
                onElementChange={onElementChange}></FretboardDisplay>
{/* 
            {
                fretboards.map((fretboard) => {
                    {
                        return (
                            <>
                                <label>
                                    Number of Strings:
                                    <input type="number" key="strings-changer" value={numberOfStrings[fretboard.id - 1]} onChange={(e) => handleStringsChange(e, fretboard.id)} min="4" max="12" />
                                </label>
                                <label>
                                    Number of Frets:
                                    <input type="number" key="frets-changer" value={numberOfFrets[fretboard.id - 1]} onChange={(e) => handleFretsChange(e, fretboard.id)} min="12" max="24" />
                                </label>
                                <table key={fretboard.id} onClick={() => handleFretboardSelect(fretboard.id - 1)}>
                                    <tbody>
                                        {
                                            fretboard.rows
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            { fretboard.heads }
                                        </tr>
                                    </tfoot>
                                </table>
                            </>

                        )
                    }
                })
            } */}

            

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

            <TabReader toggleNote={toggleNote}></TabReader>

            <ChordProgressionDisplay 
                className={classes.chordPressionDisplay}  
                chordProgression={chordProgression}
                setChordProgression={setChordProgression} ></ChordProgressionDisplay>

            <section className="controls">
                <FretboardControls
                        classes={classes}
                        handleChoiceChange={handleChoiceChange}
                        keySignature={keySignature}
                        onElementChange={onElementChange}
                        buttonText={buttonText}
                        scaleModes={scaleModes}
                        arppegiosNames={arppegiosNames}
                        choice={choice}
                        onCleanFretboard={onCleanFretboard}
                        onCopyLink={onCopyLink}
                        selectedMode={mode}
                        selectedScale={scale}
                        selectedChord={chord}
                        selectedShape={shape}
                        selectedArppegio={arppegio}
                        selectedFret={fret}
                        addChordToProgression={addChordToProgression}
                        saveProgression={saveProgression}
                        playChordProgression={playChordProgression}
                        chordProgression={chordProgression}
                />
            </section>
        </div>
        
    );
})

const mapStateToProps = state => {
    // Destructure props to avoid repetitive use of props.
  const {
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
  } = state.fretboard;

  const {
    chordProgression
  } = state.partitions;

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
        setFretboard,
        setFretboards,
        toggleNote, 
        setKey, 

        setScale, 
        setScaleFormula,
        setScaleNotes,
        setScaleIntervals,
        
        setMode,
        setModeNotes,
        setModeIntervals,
        setArppegio,
        setArppegioNotes,
        setArppegioIntervals,

        setChord,

        setShape,
        setFret,
        setChordProgression,
        setNotesDisplay
})(Fretboard);
