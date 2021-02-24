import guitar from '../config/guitar';
import React, { useEffect } from 'react';

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

        setPosition,

        setIsNotesDisplay
} from "../redux/actions";

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { getNoteFromFretboard } from '../redux/helpers';

import classNames from "classnames";

import './guitar-neck.css';

// var classNames = require('classnames');

function GuitarNeck(props){

    useEffect(() => {
        fillFretboard();
    }, []);

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
        displayData();
    }, [props.keySignature, 
        props.scale, 
        props.mode, 
        props.arppegio, 
        props.chord, 
        props.position,
        props.isNotesDisplay
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
    }

    function onScaleChange(e){
        const newScale = e.target.value;

        props.setScale(newScale)
    }

    function onModeChange(e){
        var newMode = e.target.value;

        props.setMode(newMode);
    }

    function onArppegioChange(e){
        const newArppegio = e.target.value;
        props.setArppegio(newArppegio);
    }

    function onChordChange(e){
        const newChord = e.target.value;

        props.setChord(newChord);
    }

    function onPositionChange(e){
        const newPosition = e.target.value;

        // setState({position: newPosition}, () => {
        //     updateFretboard();
        // });

        props.setPosition(newPosition);
    }

    function onDisplayNotesChange(){
        alert(!props.isNotesDisplay)
        props.setIsNotesDisplay(!props.isNotesDisplay);
    }

    function onCleanFretboard(){
        cleanFretboard();
    }

    function getScaleFormula(){
        var scaleFormula = guitar.scales[props.scale].formula;
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

    function getArppegioNotes(){
        if(props.keySignature === "unset"){
            return;
        }

        if(props.arppegio === "unset"){
            return;
        }

        var arppegioNotes = [];
        var arppegioFormula = guitar.arppegios[props.arppegio].formula;
        
        var steps = 0;

        arppegioFormula.forEach((step) => {
            arppegioNotes.push(guitar.notes.sharps[(parseInt(props.keySignature) + steps) % 12]);
            steps += step;
        })

        return arppegioNotes;
        
    }

    function getArppegioIntervals(){

        if(props.keySignature === "unset"){
            return;
        }

        if(props.arppegio === "unset"){
            return;
        }

        const arppegio = guitar.arppegios[props.arppegio];
        
        var intervals = arppegio.intervals;

        return intervals;
    }

    function displayData(){

        if(props.keySignature === "unset"){
            return;
        }

        var scale = props.scale; 
        
        var arppegio = props.arppegio;
        console.log(props.arppegio)
        if(scale === "unset" && arppegio === "unset"){
            return;
        }

        var notes = null;
        var intervals = null;
        
        if(scale !== "unset"){
            var isModal = guitar.scales[scale].isModal;

            notes = getScaleNotes();
            props.setScaleNotes(notes);

            intervals = getScaleIntervals();
            props.setScaleIntervals(intervals);

            if(isModal){
                // If scale is modal and no more is chosen, display nothing
                if(props.mode !== "unset"){
                    notes = getModeNotes();
                    props.setModeNotes(notes)

                    intervals = getModeIntervals();
                    props.setModeIntervals(intervals);
                }

            }
        }

        // If both a scale and an arppegio are chosen we display the arppegio
        if(arppegio !== "unset"){
            notes = getArppegioNotes();
            props.setArppegioNotes(notes)

            intervals = guitar.arppegios[arppegio].intervals;
            props.setArppegioIntervals(intervals);
        }

        spread(notes, intervals)
    }

    function spread(notes, intervals){

        var nf = [...props.fretboard];

        for(var m = 0; m < guitar.numberOfStrings; m++){
            for(var n = 0; n < guitar.numberOfFrets; n++){
                var currentNote = getNoteFromFretboard(m, n);

                if(notes.includes(currentNote)){

                    console.log([m , n])
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

        var scaleNotes = [];

        if(scale !== "unset"){
            scaleNotes = getScaleNotes();
            if(guitar.scales[scale].isModal && mode !== "unset"){
                scaleNotes = getModeNotes();
            }
        }

        if(arppegio !== "unset"){
            scaleNotes = getArppegioNotes();
        }

        return scaleNotes;
        
    }

    function getCurrentDisplayableScaleIntervals(){
        
        var scale = props.scale;
        var mode = props.mode;
        var arppegio = props.arppegio;

        var scaleIntervals = [];

        if(scale !== "unset"){
            scaleIntervals = getScaleIntervals();
            if(guitar.scales[scale].isModal && mode !== "unset"){
                scaleIntervals = getModeIntervals();
            }
        }

        if(arppegio !== "unset"){
            scaleIntervals = getArppegioIntervals();
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

    // rows , rotated => colums 24
    for(let i = 0; i < rowsCount; i++){
        const columns = [];

        // columns // rotated => strings
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

    if(!props.isNotesDiplay){
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
                <form>
                    <FormControl variant="outlined" margin="normal">
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
                    <FormControl variant="outlined" margin="normal" >
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
                    <FormControl variant="outlined" margin="normal"  >
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
                    <FormControl variant="outlined" margin="normal" >
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
                    <FormControl variant="outlined" margin="normal" >
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
                    <FormControl variant="outlined" margin="normal" >
                        <InputLabel htmlFor="positions">Positions :</InputLabel>
                        <Select
                        native
                        value={props.position}
                        onChange={onPositionChange}
                        label="Positions :"
                        inputProps={{
                            name: 'position',
                            id: 'positions',
                        }}
                        >
                        <option value="unset">Select position</option>
                        { [1, 2, 3, 4, 5].map((position) => {
                            return <option key={position}>{position}</option>
                        }) }
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={onDisplayNotesChange}
                    >
                        Detect chord 
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={onDisplayNotesChange}
                    >
                        { buttonText } 
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={onCleanFretboard}
                    >
                        Clean
                    </Button>
                </form>
            </section>
        </div>
    );
}

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
        
        position: state.fretboard.position,
        
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

        setPosition,

        setIsNotesDisplay
    })(GuitarNeck);