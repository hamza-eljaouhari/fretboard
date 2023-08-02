import guitar from '../config/guitar';
import React, { useEffect, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
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
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formElement: {
        flex: '1 0 21%',
        margin: '10px'
    },
    seperator: {
        width: '100%',
        fontSize: '14px',
        margin: '10px',
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

    const onElementChange = (e, elementsName) => {
        var newElement = null;

        if(elementsName === 'notesDisplay'){
            newElement = !props[elementsName];
        } else {
            newElement = e.target.value;
        }

        // props['set' + elementsName[0].toUpperCase() + elementsName.substring(1)](newElement);

        var search = queryString.parse(props.history.location.search);
        
        search[elementsName] = newElement;

        const newLocation = queryString.stringify(search);

        props.history.push('/?' + newLocation);
    }

    function onCleanFretboard(){
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

        if(scale === "unset"){
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

        if(scale === "unset"){
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

        if(scale === "unset"){
            return [];
        }

        if(keySignature === "unset"){
            return [];
        }

        const repoScale = guitar.scales[scale];
        
        var intervals = repoScale.modes[parseInt(mode)].intervals;

        return intervals;
    }, [scale, mode, keySignature])

    const getArppegioNotes = useCallback((fromArppegio) => {
        if(keySignature === "unset"){
            return [];
        }
        
        var arppegioFormula = [];

        if(fromArppegio){
            if(arppegio === "unset"){
                return [];
            }
            
            arppegioFormula = guitar.arppegios[arppegio].formula;

        }else{
            if(chord === "unset"){
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

        if(keySignature === "unset"){
            return [];
        }

        if(arppegio === "unset" &&  chord === "unset"){
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
       
        if(shape !== "unset"){
            startingIndex = guitar.shapes.indexes[parseInt(shape)].start;
            lastIndex = guitar.shapes.indexes[parseInt(shape)].end + 1;
        }

        if(fret !== "unset"){
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

        if(shape !== "unset"){
            startingIndex = guitar.shapes.indexes[parseInt(shape)].start;
            lastIndex = guitar.shapes.indexes[parseInt(shape)].end + 1;
        }

        if(fret !== "unset"){
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

        if(keySignature === "unset"){
            return;
        }

        if(scale === "unset" && arppegio === "unset" && chord === "unset"){
            return;
        }

        var notes = null;
        var intervals = null;
        var name = '';

        if(scale !== "unset"){
            var isModal = guitar.scales[scale].isModal;

            notes = getScaleNotes();
            setScaleNotes(notes);
            
            intervals = getScaleIntervals();
            setScaleIntervals(intervals);

            name = notes[0] + ' ' + guitar.scales[scale].name + ' scale';
            
            if(isModal){
                if(mode !== "unset"){
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
    
        if(arppegio !== "unset"){
            notes = getArppegioNotes(true);
            setArppegioNotes(notes)

            intervals = guitar.arppegios[arppegio].intervals;
            setArppegioIntervals(intervals);

            name = notes[0] + ' ' + guitar.arppegios[arppegio].name + ' arppegio.';
        }
            
        if(chord !== "unset"){
            notes = getArppegioNotes(false);
            intervals = guitar.arppegios[chord].intervals;

            name = notes[0] + ' ' + guitar.arppegios[chord].name + ' chord.';

            if(fret !== "unset" || shape !== "unset"){
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
            setKey("unset");
        }

        if(Object.keys(guitar.scales).includes(scale)){
            setScale(scale)
        } else {
            setScale("unset");
        }

        if(parseInt(mode) >= 0 && parseInt(mode) <= 6){
            setMode(mode);
        } else {
            setMode("unset");
        }

        if(Object.keys(guitar.arppegios).includes(arppegio)){
            setArppegio(arppegio);
        } else {
            setArppegio("unset");
        }

        if(Object.keys(guitar.arppegios).includes(chord)){
            setChord(chord)
        } else {
            setChord("unset");
        }

        if(shape >= 0 && shape <= 4){
            setShape(shape);
        } else {
            setShape("unset");
        }

        if(fret > 0 && fret < 22){
            setFret(fret);
        } else {
            setFret("unset");
        }

        if(notesDisplay === "true" || notesDisplay === "false"){
            setNotesDisplay(notesDisplay === "true");
        }

        cleanFretboard();
        update();
    }, [setNotesDisplay, setFret, setShape, setChord, setArppegio, setMode, setScale, setKey, search, cleanFretboard, update])

    const getCurrentDisplayableScaleNotes = useCallback(() => {
        
        var scaleNotes = [];

        if(keySignature === "unset"){
            return [];
        }

        if(scale !== "unset"){
            scaleNotes = getScaleNotes();
            if(guitar.scales[scale].isModal && mode !== "unset"){
                scaleNotes = getModeNotes();
            }
        }

        if(arppegio !== "unset"){
            scaleNotes = getArppegioNotes(true);
        }
        
        if(chord !== "unset"){
            scaleNotes = getArppegioNotes(false);
        }

        return scaleNotes;
    }, [getScaleNotes, getModeNotes, getArppegioNotes, scale, mode, arppegio, chord, keySignature])

    const getCurrentDisplayableScaleIntervals = useCallback(() => {
        
        var scaleIntervals = [];

        if(scale !== "unset"){
            scaleIntervals = getScaleIntervals();
            if(guitar.scales[scale].isModal && mode !== "unset"){
                scaleIntervals = getModeIntervals();
            }
        }

        if(arppegio !== "unset"){
            scaleIntervals = getArppegioIntervals(true);
        }

        if(chord !== "unset"){
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
            )
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
        if(keySignature === "unset"){
            return;
        }

        if(chord === "unset"){
            return;
        }
        
        if(shape === "unset" && fret === "unset"){
            return;
        }
        
        let chordObject = {
            key: keySignature,
            chord,
            shape,
            fret: parseInt(fret),
            highlighted: false
        };

        const newChordProgression = [...chordProgression, chordObject];
        
        setChordProgression(newChordProgression);
    }

    const saveProgression = () => {
        localStorage.setItem("progression", JSON.stringify(chordProgression));
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
            console.log("fills from URL")
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

    if(scale !== "unset"){

        const currentScale = guitar.scales[scale];

        var modes = null;
        
        if(currentScale.isModal){

            var scaleModes = currentScale.modes;

            if(scaleModes.length){
                modes = scaleModes.map((mode, index) => {
                    return <option key={index} value={index}>{mode.name}</option>
                })
            }
        }
    }

    var buttonText = 'Intervals'

    if(!notesDisplay){
        buttonText = 'Notes';
    }

    var scalesNames = Object.keys(guitar.scales);

    var scales = scalesNames.map((scaleName) => {
        return <option key={scaleName} value={scaleName}>{guitar.scales[scaleName].name}</option>;
    });

    var arppegiosNames = Object.keys(guitar.arppegios);

    var arppegios = arppegiosNames.map((arppegioName) => {
        return <option key={arppegioName} value={arppegioName}>{arppegioName}</option>;
    });

    const chords = arppegios;

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
            <section className="controls">
                <form  className={classes.form}>
                    <FormControl 
                        className={classes.formElement}
                        variant="outlined" margin="normal">
                        <InputLabel htmlFor="keys">Keys :</InputLabel>
                        <Select
                        native
                        value={props.keySignature}
                        onChange={(e) => onElementChange(e, 'key')}
                        label="Keys :"
                        >
                        <option value="unset">Select key</option>
                        { keys }
                        </Select>
                    </FormControl>
                    <FormControl 
                        className={classes.formElement}
                        variant="outlined" margin="normal" >
                        <InputLabel htmlFor="scales">Scales :</InputLabel>
                        <Select
                        native
                        value={props.scale}
                        onChange={(e) => onElementChange(e, 'scale')}
                        label="Scales :"
                        >
                        <option value="unset">Select scale</option>
                        { scales }
                        </Select>
                    </FormControl>
                    <FormControl 
                        className={classes.formElement}
                        variant="outlined" margin="normal"  >
                        <InputLabel htmlFor="modes">Modes :</InputLabel>
                        <Select
                        native
                        value={props.mode}
                        onChange={(e) => onElementChange(e, 'mode')}
                        label="Modes :"
                        >
                        <option value="unset">Select mode</option>
                        { modes }
                        </Select>
                    </FormControl>
                    <FormControl 
                        className={classes.formElement}
                        variant="outlined" margin="normal" >
                        <InputLabel htmlFor="keys">Arrpegios :</InputLabel>
                        <Select
                        native
                        value={props.arppegio}
                        onChange={(e) => onElementChange(e, 'arppegio')}
                        label="Keys :"
                        inputProps={{
                            name: 'arppegio',
                            id: 'arppegios',
                        }}
                        >
                        <option value="unset">Select arppegio</option>
                        { arppegios }
                        </Select>
                    </FormControl>
                    <FormControl 
                        className={classes.formElement}
                        variant="outlined" margin="normal" >
                        <InputLabel htmlFor="keys">Chords :</InputLabel>
                        <Select
                        native
                        value={props.chord}
                        onChange={(e) => onElementChange(e, 'chord')}
                        label="Chords :"
                        inputProps={{
                            name: 'chord',
                            id: 'chords',
                        }}
                        >
                        <option value="unset">Select chord</option>
                        { chords }
                        </Select>
                    </FormControl>
                    <FormControl 
                        className={classes.formElement}
                        variant="outlined" margin="normal" >
                        <InputLabel htmlFor="shapes">Shapes :</InputLabel>
                        <Select
                        native
                        value={props.shape}
                        onChange={(e) => onElementChange(e, 'shape')}
                        label="Shapes :"
                        inputProps={{
                            name: 'shape',
                            id: 'shapes',
                        }}
                        >
                        <option value="unset">Select all</option>
                        { guitar.shapes.names.map((shape, index) => {
                            return <option key={index} value={index}>{shape}</option>
                        }) }
                        </Select>
                    </FormControl>
                    <FormControl 
                        className={classes.formElement}
                        variant="outlined" margin="normal" >
                        <InputLabel htmlFor="positions">Positions :</InputLabel>
                        <Select
                        native
                        value={props.fret}
                        onChange={(e) => onElementChange(e, 'fret')}
                        label="Positions :"
                        inputProps={{
                            name: 'position',
                            id: 'positions',
                        }}
                        >
                        <option value="unset">Select all</option>
                        { Array.from(Array(guitar.numberOfFrets - 3).keys(), (_, i) => i + 1).map((fret) => {
                            return <option key={fret}>{fret}</option>
                        }) }
                        </Select>
                    </FormControl>
                    
                    <Button
                        className={classes.formElement}
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={(e) => onElementChange(e, 'notesDisplay')}
                    >
                        { buttonText } 
                    </Button>

                    <Button
                        className={classes.formElement}
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={onCleanFretboard}
                    >
                        Clean
                    </Button>
                    <Button
                        className={classes.formElement}
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={onCopyLink}
                    >
                         Copy link
                    </Button>
                    

                    <Button
                        className={classes.formElement}
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={addChordToProgression}
                    >
                         Add chord to progression
                    </Button>
                    

                    <Button
                        className={classes.formElement}
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={playChordProgression}
                    >
                         Play progession
                    </Button>

                    <Button
                        className={classes.formElement}
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={saveProgression}
                    >
                         Save progression
                    </Button>

                    <Typography 
                        className={classes.seperator}
                        variant="h6">
                        Coming soon :
                    </Typography>
                    <Button
                        className={classes.formElement}
                        variant="contained"
                        color="primary"
                        size="medium"
                    >
                        Detect
                    </Button>

                    <Button
                        className={classes.formElement}
                        variant="contained"
                        color="primary"
                        size="medium"
                    >
                         Print
                    </Button>

                 

                </form>
            </section>
        </div>
    );
})

const mapStateToProps = state => {
    return { 
        chordProgression: state.partitions.chordProgression,
        fretboard: state.fretboard.fretboard,
        keySignature: state.fretboard.keySignature,
        
        scale : state.fretboard.scale,
        scaleNotes: state.fretboard.scaleNotes,
        scaleIntervals: state.fretboard.scaleIntervals,
        
        mode: state.fretboard.mode,
        modeNotes: state.fretboard.modeNotes,
        modeIntervals: state.fretboard.modeIntervals,
        
        arppegio: state.fretboard.arppegio,
        arppegioNotes: state.fretboard.arppegioNotes,
        arppegioIntervals: state.fretboard.arppegioIntervals,

        chord: state.fretboard.chord,
        
        shape: state.fretboard.shape,
        fret: state.fretboard.fret,
        
        notesDisplay: state.fretboard.notesDisplay
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