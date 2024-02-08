import guitar from '../config/guitar';
import React, { useEffect, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import FretboardControls from './FretboardControls';
import CircleOfFifths from './CircleOfFifths';
import ChordProgressionDisplay from './ChordProgressionDisplay';
import TabReader from './TabReader';

import { 
        setFretboard,
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
    const [rows, setRows] = useState([]);
    const [heads, setHeads] = useState([]);
    const search = props.history.location.search;

    const {chordProgression, setChordProgression, setFretboard, onSetTitle, notesDisplay, keySignature, fret, shape, scale, mode, arppegio, chord, fretboard, setNotesDisplay, setFret, setShape, setChord, setArppegio, setMode, setScale, setKey} = props;

    const cleanFretboard = useCallback(() => {
        var newFretboard = [...fretboard];
        
        for(let i = 0; i < guitar.numberOfStrings; i++){
            for(let j = 0; j < guitar.numberOfFrets; j++){
                newFretboard[i][j].show = false;
            }
        }
        
        if(JSON.stringify(newFretboard) !== JSON.stringify(fretboard)){
            setFretboard(newFretboard);
        }
    }, [fretboard, setFretboard])

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
            for(var m = 0; m < guitar.numberOfStrings; m++){
                for(var n = startingIndex; n < lastIndex; n++){
                    var currentNote = getNoteFromFretboard(m, n);
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
    }, [shape, fret, notesDisplay, fretboard, setFretboard])

    
    const spread = useCallback((notes, intervals) =>{
        var nf = [...fretboard]
            
        var startingIndex = 0;
        var lastIndex = guitar.numberOfFrets;

        if(shape !== ''){
            startingIndex = guitar.shapes.indexes[parseInt(shape)].start;
            lastIndex = guitar.shapes.indexes[parseInt(shape)].end + 1;
        }

        if(fret !== ''){
            startingIndex = parseInt(fret) - 1;
            lastIndex = startingIndex + 4;
        }

        for(var m = 0; m < guitar.numberOfStrings; m++){
            for(var n = startingIndex; n < lastIndex; n++){
                var currentNote = getNoteFromFretboard(m, n);

                if(notes.includes(currentNote)){
                    nf[m][n].show = true;

                    if(notesDisplay){
                        nf[m][n].current = currentNote;
                    }else{
                        nf[m][n].current = intervals[notes.indexOf(currentNote)];
                    }
                }
            }
        }
        
        if(JSON.stringify(nf) !== JSON.stringify(fretboard)){
            setFretboard(nf);
        }
    }, [setFretboard, shape, fret, fretboard, notesDisplay])

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
            spread(notes, intervals);
            onSetTitle(name);
        }
    }, [onSetTitle, mode, fret, shape, arppegio, chord, keySignature, scale, displayChordPortion, getArppegioNotes, getModeIntervals, getModeNotes, getScaleIntervals, getScaleNotes, spread])
    
    const fillStoreFromURL = useCallback(() => {
        const { 
            key, 
            scale, 
            mode, 
            arppegio, 
            chord, 
            shape, 
            fret,
            notesDisplay
        } = queryString.parse(search);
        
        if(parseInt(key) >= 0 && parseInt(key) < 12){
            setKey(parseInt(key));
        } else {
            setKey('');
        }

        if(Object.keys(guitar.scales).includes(scale)){
            setScale(scale)
        } else {
            setScale('');
        }

        if(parseInt(mode) >= 0 && parseInt(mode) <= 6){
            setMode(mode);
        } else {
            setMode('');
        }

        if(Object.keys(guitar.arppegios).includes(arppegio)){
            setArppegio(arppegio);
        } else {
            setArppegio('');
        }

        if(Object.keys(guitar.arppegios).includes(chord)){
            setChord(chord)
        } else {
            setChord('');
        }

        if(shape >= 0 && shape <= 4){
            setShape(shape);
        } else {
            setShape('');
        }

        if(fret > 0 && fret < 22){
            setFret(fret);
        } else {
            setFret('');
        }

        if(notesDisplay === "true" || notesDisplay === "false"){
            setNotesDisplay(notesDisplay === "true");
        }

        cleanFretboard();
        update();
    }, [setNotesDisplay, setFret, setShape, setChord, setArppegio, setMode, setScale, setKey, search, cleanFretboard, update])

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

    const getFretboardTemplate = useCallback(() => {
        const newRows = [];

        var rowsCount = guitar.numberOfStrings;
        var columnsCount = guitar.numberOfFrets;
        
        for(let i = 0; i < rowsCount; i++){
            const columns = [];
    
            for(let j = 0; j < columnsCount; j++){

                var note = fretboard[i][j];
                columns.push(
                    <td
                        key={i + '-' + j} id={i + '-' + j}
                        onClick={() => {
                                toggleNote(i, j);
                            }
                        }>
                            <span 
                                className={classNames({
                                    'note': note.show === true,
                                    'root': getNoteIndex(note.current) === 0,
                                    "third": getNoteIndex(note.current) === 2,
                                    'fifth': getNoteIndex(note.current) === 4,
                                    'seventh': getNoteIndex(note.current) === 6
                                })}>
                                { note.show && note.current }
                            </span>
                        <hr></hr>
                    </td>
                );
            }
    
            newRows.push(
                <tr key={i}>
                    { columns }
                </tr>
            );
        }
    
        var newHeads = [];
    
        for(let i = 0; i < guitar.numberOfFrets; i++){
            var width = guitar.numberOfFrets - i;
            newHeads.push(<th key={i} width={width + 30}><span className="fretNumber">{i}</span></th>)
        }

        setRows(newRows);
        setHeads(newHeads);
    }, [setHeads, setRows, fretboard, getNoteIndex])

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

    useEffect(() => {

        if(search.length){
            fillStoreFromURL();
        }
        getFretboardTemplate();

    }, [fillStoreFromURL, search, getFretboardTemplate]);

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
        console.log(choice);
    };

    const pointCircleOfFifth = (keySignature) => {
        if(chord && guitar.arppegios[chord].quality === "Major"){
            return guitar.notes.flats[keySignature];
        }
        console.log(guitar.notes.flats[keySignature] + 'm')
        return guitar.notes.flats[keySignature] + 'm';
    };

    return(
        <div className="fretboard-container">
            <table>
                <tbody>
                    {
                        rows
                    }
                </tbody>
                <tfoot>
                    <tr>
                        { heads }
                    </tr>
                </tfoot>
            </table>

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