import guitar from '../config/guitar';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import { connect } from "react-redux";
import { 
        fillFretboard,
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

        setIsNotesDisplay
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

    useEffect(() => {
        fillFretboard();
        fillStore();
    }, []);

    function fillStore(){
        const { 
            k, 
            sc, 
            m, 
            a, 
            c, 
            sh, 
            f,
            n
        } = queryString.parse(props.history.location.search);
        
        if(parseInt(k) >= 0 && parseInt(k) < 12){
            props.setKey(parseInt(k));
        }

        if(Object.keys(guitar.scales).includes(sc)){
            props.setScale(sc)
        }

        if(parseInt(m) >= 0 && parseInt(m) <= 6){
            props.setMode(m);
        }

        if(Object.keys(guitar.arppegios).includes(a)){
            props.setArppegio(a);
        }

        if(Object.keys(guitar.arppegios).includes(c)){
            props.setChord(c)
        }

        if(sh >= 0 && sh <= 4){
            props.setShape(sh);
        }

        if(f > 0 && f < 22){
            props.setFret(f);
        }   

        if(n === "true" || n === "false"){
            props.setIsNotesDisplay(n === "true");
        }
    }

    function fillFretboard(){
        var nf = [...props.fretboard];
        
        for(let i = 0; i < guitar.numberOfStrings; i++){
            for(let j = 0; j < guitar.numberOfFrets; j++){
                nf[i][j] = {
                    show: false,
                    current: guitar.notes.sharps[(guitar.tuning[i] + j ) % 12]
                };
            }
        }

        props.fillFretboard(nf);
    }
    useEffect(() => {
        cleanFretboard();
        update();

    }, [props.keySignature, 
        props.scale, 
        props.mode, 
        props.arppegio, 
        props.chord, 
        props.fret,
        props.isNotesDisplay,
        props.shape
    ]);

    function cleanFretboard(){
        var nf = [...props.fretboard];
        
        for(let i = 0; i < guitar.numberOfStrings; i++){
            for(let j = 0; j < guitar.numberOfFrets; j++){
                nf[i][j].show = false;
            }
        }

        props.fillFretboard(nf);
    }

    function onKeyChange(e){
        const newKey = e.target.value;

        props.setKey(newKey);
        
        var search = queryString.parse(props.history.location.search);
        
        search.k = newKey;

        const newLocation = queryString.stringify(search);

        props.history.push('/?' + newLocation);
    }

    function onScaleChange(e){
        const newScale = e.target.value;

        props.setScale(newScale);

        var search = queryString.parse(props.history.location.search);
        
        search.sc = newScale;

        const newLocation = queryString.stringify(search);

        props.history.push('/?' + newLocation);
        
    }

    function onModeChange(e){
        var newMode = e.target.value;

        props.setMode(newMode);

        var search = queryString.parse(props.history.location.search);
        
        search.m = newMode;

        const newLocation = queryString.stringify(search);

        props.history.push('/?' + newLocation);
    }

    function onArppegioChange(e){
        const newArppegio = e.target.value;

        props.setArppegio(newArppegio);

        var search = queryString.parse(props.history.location.search);
        
        search.a = newArppegio;

        const newLocation = queryString.stringify(search);

        props.history.push('/?' + newLocation);
    }

    function onChordChange(e){
        const newChord = e.target.value;

        props.setChord(newChord);

        var search = queryString.parse(props.history.location.search);
        
        search.c = newChord;

        const newLocation = queryString.stringify(search);

        props.history.push('/?' + newLocation);
    }

    function onShapeChange(e){
        const newShape = e.target.value;

        props.setShape(newShape);

        var search = queryString.parse(props.history.location.search);
        
        search.sh = newShape;

        const newLocation = queryString.stringify(search);

        props.history.push('/?' + newLocation);
    }

    function onFretChange(e){
        const newFret = e.target.value;

        props.setFret(newFret);

        var search = queryString.parse(props.history.location.search);
        
        search.f = newFret;

        const newLocation = queryString.stringify(search);

        props.history.push('/?' + newLocation)
    }

    function onDisplayNotesChange(){
        var isNotesDiplay = props.isNotesDisplay;
        
        props.setIsNotesDisplay(!isNotesDiplay);

        var search = queryString.parse(props.history.location.search);
        
        search.n = !isNotesDiplay;

        const newLocation = queryString.stringify(search);

        props.history.push('/?' + newLocation)
    }

    function onCleanFretboard(){
        cleanFretboard();
    }

    // function getScaleFormula(){
    //     var scaleFormula = guitar.scales[props.scale].formula;
    // }

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

    function getScaleNotes(){

        if(props.scale === "unset"){
            return [];
        }

        var scaleNotes = [];
        
        var scaleFormula = guitar.scales[props.scale].formula;
        
        var steps = 0;

        scaleFormula.forEach((step) => {
            scaleNotes.push(guitar.notes.sharps[(parseInt(props.keySignature) + steps) % 12]);
            steps += step;
        })

        return scaleNotes;
    }

    function getScaleIntervals(){

        if(props.scale === "unset"){
            return;
        }

        const scale = guitar.scales[props.scale];

        return scale.intervals;
    }

    function getModeNotes(){
    
        var modesNotes = [];

        var mode = parseInt(props.mode)  ;
        
        // Get scale's notes
        var scaleNotes = getScaleNotes();

        // Put them in order
        while(modesNotes.length < scaleNotes.length){
            
            modesNotes.push(scaleNotes[mode]);

            mode++;
            
            if(mode === scaleNotes.length){
                mode = mode % scaleNotes.length;
            }
        }

        return modesNotes;
    }

    function getModeIntervals(){

        if(props.scale === "unset"){
            return;
        }

        if(props.keySignature === "unset"){
            return;
        }

        const scale = guitar.scales[props.scale];
        
        var intervals = scale.modes[parseInt(props.mode)].intervals;

        return intervals;
    }

    function getArppegioNotes(fromArppegio){
        if(props.keySignature === "unset"){
            return [];
        }
        
        var arppegioFormula = [];

        if(fromArppegio){
            if(props.arppegio === "unset"){
                return [];
            }
            
            arppegioFormula = guitar.arppegios[props.arppegio].formula;

        }else{
            if(props.chord === "unset"){
                return [];
            }

            arppegioFormula = guitar.arppegios[props.chord].formula
        }

        var arppegioNotes = [];
        
        var steps = 0;

        arppegioFormula.forEach((step) => {
            arppegioNotes.push(guitar.notes.sharps[(parseInt(props.keySignature) + steps) % 12]);
            steps += step;
        })

        return arppegioNotes;
        
    }

    function getArppegioIntervals(isFromArppegio){

        if(props.keySignature === "unset"){
            return;
        }

        if(props.arppegio === "unset" && props.chord === "unset"){
            return;
        }
        
        var arppegio = null;

        if(isFromArppegio){
            arppegio = guitar.arppegios[props.arppegio];
        }else{
            arppegio = guitar.arppegios[props.chord];
        }
        
        var intervals = arppegio.intervals;

        return intervals;
    }

    function update(){

        props.onSetTitle('Choose something to display...')

        if(props.keySignature === "unset"){
            return;
        }

        var scale = props.scale; 
        
        var arppegio = props.arppegio;

        var chord = props.chord;

        if(scale === "unset" && arppegio === "unset" && chord === "unset"){
            return;
        }

        var notes = null;
        var intervals = null;
        var name = '';
        var keyName = guitar.notes.sharps[props.keySignature];

        if(scale !== "unset"){
            var isModal = guitar.scales[scale].isModal;

            notes = getScaleNotes();
            props.setScaleNotes(notes);
            
            intervals = getScaleIntervals();
            props.setScaleIntervals(intervals);

            name = notes[0] + ' ' + guitar.scales[scale].name + ' scale';
            
            if(isModal){
                if(props.mode !== "unset"){
                    notes = getModeNotes();
                    props.setModeNotes(notes)

                    intervals = getModeIntervals();
                    props.setModeIntervals(intervals);

                    let modeRootName = notes[0];

                    let modeNumber = parseInt(props.mode) + 1;

                    name = modeRootName + ' ' + guitar.scales[scale].modes[props.mode].name + ' from the ' + name + ' (Mode #' + modeNumber     + ')';

                }
            }
        }
    
        if(arppegio !== "unset"){
            notes = getArppegioNotes(true);
            props.setArppegioNotes(notes)

            intervals = guitar.arppegios[arppegio].intervals;
            props.setArppegioIntervals(intervals);

            name = notes[0] + ' ' + guitar.arppegios[arppegio].name + ' arppegio.';
        }

            
        if(chord !== "unset"){
            notes = getArppegioNotes(false);
            intervals = guitar.arppegios[chord].intervals;

            name = notes[0] + ' ' + guitar.arppegios[chord].name + ' chord.';

            if(props.fret !== "unset" || props.shape !== "unset"){
                displayChordPortion(notes, intervals);
                return;
            }
        }
        
        props.onSetTitle(name);
        spread(notes, intervals)
    }

    function displayChordPortion(notes, intervals){
        var nf = [...props.fretboard];


        var startingIndex = 0;
        var lastIndex = null;
       
        if(props.shape !== "unset"){
            startingIndex = guitar.shapes.indexes[parseInt(props.shape)].start;
            lastIndex = guitar.shapes.indexes[parseInt(props.shape)].end + 1;
        }

        if(props.fret !== "unset"){
            startingIndex = parseInt(props.fret) - 1;
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
                            if(props.isNotesDisplay){
                                nf[m][n].current = currentNote;
                            }else{
                                nf[m][n].current = intervals[notes.indexOf(currentNote)];
                            }
                        }
                    }
                }
            }
        });
        
        props.fillFretboard(nf);
    }

    function spread(notes, intervals){

        var nf = [...props.fretboard];

        var startingIndex = 0;
        var lastIndex = guitar.numberOfFrets;

        if(props.shape !== "unset"){
            startingIndex = guitar.shapes.indexes[parseInt(props.shape)].start;
            lastIndex = guitar.shapes.indexes[parseInt(props.shape)].end + 1;
        }

        if(props.fret !== "unset"){
            startingIndex = parseInt(props.fret) - 1;
            lastIndex = startingIndex + 4;
        }

        for(var m = 0; m < guitar.numberOfStrings; m++){
            for(var n = startingIndex; n < lastIndex; n++){
                var currentNote = getNoteFromFretboard(m, n);

                if(notes.includes(currentNote)){

                    nf[m][n].show = true;

                    if(props.isNotesDisplay){
                        nf[m][n].current = currentNote;
                    }else{
                        nf[m][n].current = intervals[notes.indexOf(currentNote)];
                    }
                }
            }
        }

        props.fillFretboard(nf);
    }

    function getCurrentDisplayableScaleNotes(){
        
        var scale = props.scale;
        var mode = props.mode;
        var arppegio = props.arppegio;
        var chord = props.chord;

        var scaleNotes = [];

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
        
    }

    function getCurrentDisplayableScaleIntervals(){
        
        var scale = props.scale;
        var mode = props.mode;
        var arppegio = props.arppegio;
        var chord = props.chord;

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
        
    }

    function getNoteIndex(currentNote){

        var scaleNotes =  getCurrentDisplayableScaleNotes();

        if(props.isNotesDisplay){
            return scaleNotes.indexOf(currentNote);
        }

        return getCurrentDisplayableScaleIntervals().indexOf(currentNote);

    }

    const rows = [];

    var rowsCount = guitar.numberOfStrings;
    var columnsCount = guitar.numberOfFrets;
    
    for(let i = 0; i < rowsCount; i++){
        const columns = [];

        for(let j = 0; j < columnsCount; j++){

            var note = props.fretboard[i][j];
            columns.push(
                <td
                    key={i + '-' + j} id={i + '-' + j}
                    onClick={() => {
                            props.toggleNote(i, j);
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
                    <hr ></hr>
                </td>
            );
            
        }

        rows.push(
            <tr key={i}>
                { columns }
            </tr>
        )
    }

    var keys = guitar.notes.sharps.map((note, index) => {
        return <option key={index} value={index}>{note}</option>
    })

    var scale = props.scale;

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

    if(!props.isNotesDisplay){
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

    var heads = [];

    for(let i = 0; i < guitar.numberOfFrets; i++){
        var width = guitar.numberOfFrets - i;
        heads.push(<th key={i} width={width + 30}><span className="fretNumber">{i}</span></th>)
    }

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
                        onChange={onKeyChange}
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
                        onChange={onScaleChange}
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
                        onChange={onModeChange}
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
                        onChange={onArppegioChange}
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
                        onChange={onChordChange}
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
                        onChange={onShapeChange}
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
                        onChange={onFretChange}
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
                        onClick={onDisplayNotesChange}
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

                    <Button
                        className={classes.formElement}
                        variant="contained"
                        color="primary"
                        size="medium"
                    >
                         Save
                    </Button>

                </form>
            </section>
        </div>
    );
})

const mapStateToProps = state => {
    return { 
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
        
        isNotesDisplay: state.fretboard.isNotesDisplay
    };
};
  
export default connect(
    mapStateToProps,
    { 
        fillFretboard,
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

        setIsNotesDisplay
    })(Fretboard);