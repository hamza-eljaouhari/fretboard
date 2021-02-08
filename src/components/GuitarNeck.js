import guitar from '../config/guitar';
import React from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import './guitar-neck.css';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    formControl: {
        width: '20%',
        margin: '0 10px 10px 10px'
    },
    notesIntervalButton: {
        width: '20%',
        margin: '10px 10px'
    }
  });
  
var classNames = require('classnames');


function HigherOrderComponentGuitarNeck(){

    const classes = useStyles();

    return <GuitarNeck classes={classes}></GuitarNeck>
}
class GuitarNeck extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            fretboard: Array.from({length: guitar.numberOfStrings}, e => Array(guitar.numberOfFrets).fill(null)),
            keyIndex: "unset",
            arppegioDegree: 'unset',
            scale: 'unset',
            modeIndex: 'unset',
            displayNotes: true,
            scaleNotes: [],
            scaleIntervals: []
        };

        this.keyChange = this.keyChange.bind(this);
        this.scaleChange = this.scaleChange.bind(this);
        this.arppegioChange = this.arppegioChange.bind(this);
        this.modeChange = this.modeChange.bind(this);
        this.displayNotesChange = this.displayNotesChange.bind(this);
    }

    modeChange(e){
        var modeIndex = e.target.value;

        this.setState({modeIndex: modeIndex}, () => {
            this.updateFretboard();
        });

    }

    displayNotesChange(e){
        this.setState({displayNotes: !this.state.displayNotes}, () => {
            this.updateFretboard();
        });
    }


    toggleNote(i, j, e){
        var newFretboard = [...this.state.fretboard];

        if(newFretboard[i][j] != null){
            newFretboard[i][j] = null;
        }else{

            var currentNote = this.getNoteFromFretboard(i, j);

            // Extract numberOfNotes & scaleNotes
            var scaleNotes = this.state.scaleNotes;

            var numberOfScaleNotes = scaleNotes.length;

            // Extact "isModal"
            var isModal = null;

            if(this.state.scale !== "unset"){
                let scale = guitar.scales[this.state.scale];
                if(scale.isModal){
                    isModal = true;
                }
            }

                    
            if(isModal){
                scaleNotes = this.getModesNotes();
            }
            var arppegioDegree = this.state.arppegioDegree;

            if(arppegioDegree !== "unset"){
                scaleNotes = this.getArppegioNotes();
            }

            var noteClassnames = classNames({
                "note": true,
                "root": numberOfScaleNotes ? currentNote === scaleNotes[0] : false,
                "third": numberOfScaleNotes ? currentNote === scaleNotes[2] : false,
                "fifth": numberOfScaleNotes ? currentNote === scaleNotes[4]: false,
                "seventh": numberOfScaleNotes ? currentNote === scaleNotes[6]: false
            });

            var intervals = null;

            if(arppegioDegree !== "unset"){
                intervals = guitar.arppegios[arppegioDegree].intervals
            }else{
                intervals = this.state.scaleIntervals;
            }

            var noteNameComponent = <span className={noteClassnames}>{currentNote}</span>;
            
            var noteIntervalComponent = <span className={noteClassnames}>{intervals[scaleNotes.indexOf(currentNote)]}</span>;
            
            if(scaleNotes.includes(currentNote)){
                if(this.state.displayNotes){
                    newFretboard[i][j] = noteNameComponent;
                }else{
                    newFretboard[i][j] = noteIntervalComponent;
                }
            }else{
                newFretboard[i][j] = noteNameComponent;
            }
        }

        this.setState({ fretboard: newFretboard });
    }

    keyChange(e){
        const newKeyIndex = e.target.value;

        this.setState({ keyIndex: newKeyIndex}, () => {
            this.updateFretboard();
        });
    }

    getModesNotes(){
        
        var modesNotes = [];
        var modeIndex = parseInt(this.state.modeIndex)  ;
        var scaleNotes = this.getScaleNotes();

        while(modesNotes.length < scaleNotes.length){
            modesNotes.push(scaleNotes[modeIndex]);
            modeIndex++;
            if(modeIndex === scaleNotes.length){
                modeIndex = modeIndex % scaleNotes.length;
            }
        }

        return modesNotes;
    }

    getScaleNotes(){

        var scaleNotes = [];

        // var rootNote = guitar.notes.sharps[this.state.keyIndex]; //

        // scaleNotes.push(rootNote);
        var scaleFormula = guitar.scales[this.state.scale].formula;
        
        var steps = 0;
        // var i = parseInt(this.state.keyIndex);
        scaleFormula.forEach((step) => {
            scaleNotes.push(guitar.notes.sharps[(parseInt(this.state.keyIndex) + steps) % 12]);
            steps += step;
        })

        return scaleNotes;
    }

    updateFretboard(){

        if(this.state.keyIndex === "unset"){
            this.cleanFretboard()
            return;
        }
        
        var scale = this.state.scale; 
        var arppegioDegree = this.state.arppegioDegree;
        
        if(scale === "unset" && arppegioDegree === "unset"){
            this.cleanFretboard()
            return;
        }

        var scaleNotes = null;
        var intervals = null;
        
        if(scale !== "unset"){
            var isModal = guitar.scales[this.state.scale].isModal;

            scaleNotes = this.getScaleNotes();
            intervals = this.getScaleIntervals();

            if(isModal){
                if(this.state.modeIndex === "unset"){
                    this.cleanFretboard()
                    return;
                }

                scaleNotes = this.getModesNotes();
                intervals = this.getModeIntervals();

                console.log("this.getModesNotes()", this.getModesNotes())

            }
        }

        if(arppegioDegree !== "unset"){
            scaleNotes = this.getArppegioNotes();
            console.log("this.getArppegioNotes()", this.getArppegioNotes())
            intervals = guitar.arppegios[arppegioDegree].intervals;
        }

        this.setState({scaleNotes: scaleNotes}, () => {
            this.setState({scaleIntervals: intervals}, () => {
                this.cleanFretboard(() => {
                    this.spreadNotesOnFretboard(this.state.scaleNotes, this.state.scaleIntervals);
                });
            });
        });
    }

    getScaleIntervals(){

        if(this.state.scale === "unset"){
            return;
        }

        const scale = guitar.scales[this.state.scale];

        return scale.intervals;
    }

    getModeIntervals(){

        if(this.state.scale === "unset"){
            return;
        }

        if(this.state.keyIndex === "unset"){
            return;
        }

        const scale = guitar.scales[this.state.scale];
        
        var intervals = scale.modes[parseInt(this.state.modeIndex)].intervals;

        return intervals;
    }
    // Display Ionian mode in C
    scaleChange(e){
        const newScale = e.target.value;

        this.setState({scale: newScale}, () => {
            this.updateFretboard();
        });
        // Get all 7 notes from the scale and spread them across the fretboard
    }

    getNoteFromFretboard(m, n){
        var stringNote = guitar.tuning[m];

        return guitar.notes.sharps[(stringNote + n) % 12];
    }

    getArppegioNotes(){
        if(this.state.keyIndex === "unset"){
            return;
        }

        if(this.state.arppegioDegree === "unset"){
            return;
        }

        var arppegioNotes = [];
        var arppegioFormula = guitar.arppegios[this.state.arppegioDegree].formula;
        
        var steps = 0;

        arppegioFormula.forEach((step) => {
            arppegioNotes.push(guitar.notes.sharps[(parseInt(this.state.keyIndex) + steps) % 12]);
            steps += step;
        })

        return arppegioNotes;
        
    }

    arppegioChange(e){
        const arppegioDegree = e.target.value;

        // if(this.state.scale === "unset"){
        //     return;
        // }
        // key must chosen if not take the default


        // find the notes using the intervals of tha arppegios

        
        this.setState({arppegioDegree: arppegioDegree}, () => {
            this.updateFretboard();
        });


        // var arppegioNotes = [];

        // guitar.arppegios[arppegioDegree].intervals.forEach(function(step){
        //     arppegioNotes.push(scaleNotes[step - 1]);
        // })

    }

    spreadNotesOnFretboard(notes, intervals){
        var newFretboard = [...this.state.fretboard];

        console.log("intervals", intervals);
        console.log("notes", notes);

        for(var m = 0; m < guitar.numberOfStrings; m++){
            // Get to E and the A D G B E
            for(var n = 0; n < guitar.numberOfFrets; n++){
                // Get to each of notes "notes"
                // steps are found in
                var currentNote = this.getNoteFromFretboard(m, n);
                
                if(notes.includes(currentNote)){ // C major has C D E A F B G E C
                    
                    var numberOfNotes = this.state.scaleNotes.length;

                    var noteStyling = classNames({
                        'note': true,
                        'root': currentNote === notes[0],
                        'third': currentNote === notes[2],
                        'fifth': currentNote === notes[4],
                        'seventh': numberOfNotes === 7 ? (currentNote === notes[6]) : false
                    });
                    
                    if(this.state.displayNotes){
                        newFretboard[m][n] = <span className={noteStyling}>{currentNote}</span>;
                    }else{
                        newFretboard[m][n] = <span className={noteStyling}>{intervals[notes.indexOf(currentNote)]}</span>;
                    }
                }
            }
        }

        this.setState({fretboard: newFretboard})
    }


    cleanFretboard(callback){
        var newFretboard = Array.from({length: guitar.numberOfStrings}, e => Array(guitar.numberOfFrets).fill(null));

        this.setState({ fretboard : newFretboard }, callback)
    }

    render(){

        const strings = [];

        for(let i = 0; i < guitar.numberOfStrings; i++){
            const frets = [];


            for(let j = 0; j < guitar.numberOfFrets; j++){

                var note = null;
                if(this.state.fretboard[i][j]){
                    note = this.state.fretboard[i][j];
                }

                frets.push(
                    <td
                        key={j + '-' + i} id={j + '-' + i}
                        onClick={(e) => this.toggleNote(i, j, e)}>
                            { note }
                        <hr ></hr>
                    </td>
                );
            }

            strings.push(
                <tr key={i}>
                    { frets }
                </tr>
            )
        }

        var keys = guitar.notes.sharps.map((note, index) => {
            return <option key={index} value={index}>{note}</option>
        })

        if(this.state.scale !== "unset"){
    
            const currentScale = guitar.scales[this.state.scale];

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

        if(!this.state.displayNotes){
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


        return(
            <div>
                <table>
                    <tbody>
                        {
                            strings
                        }
                    </tbody>
                </table>
                <section className="controls">
                    <form className={this.props.classes.form}>
                        <FormControl variant="outlined" margin="normal" className={this.props.classes.formControl}>
                            <InputLabel htmlFor="keys">Keys :</InputLabel>
                            <Select
                            native
                            value={this.state.keyIndex}
                            onChange={this.keyChange}
                            label="Keys :"
                            >
                            <option value="unset">Select key</option>
                            { keys }
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" margin="normal" className={this.props.classes.formControl}>
                            <InputLabel htmlFor="scales">Scales :</InputLabel>
                            <Select
                            native
                            value={this.state.scale}
                            onChange={this.scaleChange}
                            label="Scales :"
                            >
                            <option value="unset">Select scale</option>
                            { scales }
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" margin="normal"  className={this.props.classes.formControl}>
                            <InputLabel htmlFor="modes">Modes :</InputLabel>
                            <Select
                            native
                            value={this.state.modeIndex}
                            onChange={this.modeChange}
                            label="Modes :"
                            >
                            <option value="unset">Select mode</option>
                            { modes }
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" margin="normal" className={this.props.classes.formControl}>
                            <InputLabel htmlFor="keys">Keys :</InputLabel>
                            <Select
                            native
                            value={this.state.arppegioDegree}
                            onChange={this.arppegioChange}
                            label="Keys :"
                            inputProps={{
                                name: 'age',
                                id: 'keys',
                            }}
                            >
                            <option value="unset">Select arppegio</option>
                            { arppegios }
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={this.displayNotesChange}
                            className={this.props.classes.notesIntervalButton}
                        >
                            { buttonText } 
                        </Button>
                        
                    </form>
                </section>
                {/* <label>
                    Keys :
                </label>
                <select value={this.state.keyIndex} onChange={this.keyChange}>
                    <option value="unset">Select key</option>
                    { keys }
                </select>
                <label>
                    Scale :
                </label>
                <select value={this.state.scale} onChange={this.scaleChange}>
                    <option value="unset">Select scale</option>
                    { scales }
                </select>
                <label>
                    Modes :
                </label>
                <select value={this.state.modeIndex} onChange={this.modeChange}>
                    <option value="unset">Select mode</option>
                    { modes }
                </select>
                <label>
                    Arppegios :
                </label>
                <select value={this.state.arppegioDegree} onChange={this.arppegioChange}>
                    <option value="unset">Select arppegio</option>
                    { arppegios }
                </select> */}
                {/* <button onClick={this.displayNotesChange}>{ buttonText }</button> */}
            </div>
        );
    }
}

export default HigherOrderComponentGuitarNeck;