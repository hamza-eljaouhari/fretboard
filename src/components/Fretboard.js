import guitar from '../config/guitar';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
        margin: '30px 10px 10px 10px'
    },
    buttons: {
        width: '20%',
        height: '55px',
        margin: '30px 10px'
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
            key: "unset",
            arppegio: 'unset',
            scale: 'unset',
            mode: 'unset',
            chord: 'unset',
            displayNotes: true,
            scaleNotes: [],
            scaleIntervals: []
        };

        this.onKeyChange = this.onKeyChange.bind(this);
        this.onScaleChange = this.onScaleChange.bind(this);
        this.onArppegioChange = this.onArppegioChange.bind(this);
        this.onModeChange = this.onModeChange.bind(this);
        this.onDisplayNotesChange = this.onDisplayNotesChange.bind(this);
    }

    onKeyChange(e){
        const newkey = e.target.value;

        this.setState({ key: newkey}, () => {
            this.updateFretboard();
        });
    }

    onScaleChange(e){
        const newScale = e.target.value;

        this.setState({scale: newScale}, () => {
            this.updateFretboard();
        });
    }

    onModeChange(e){
        var newMode = e.target.value;

        this.setState({mode: newMode}, () => {
            this.updateFretboard();
        });

    }

    onArppegioChange(e){
        const newArppegio = e.target.value;

        this.setState({arppegio: newArppegio}, () => {
            this.updateFretboard();
        });
    }

    onChordChange(e){
        const newChord = e.target.value;

        this.setState({chord: newChord}, () => {
            this.updateFretboard();
        });
    }

    onPositionChange(e){
        const newPosition = e.target.value;

        this.setState({position: newPosition}, () => {
            this.updateFretboard();
        });
    }

    onDisplayNotesChange(e){
        this.setState({displayNotes: !this.state.displayNotes}, () => {
            this.updateFretboard();
        });
    }
    
    isKeySet(){
        return this.state.key !== "unset";
    }
    
    isScaleSet(){
        return this.state.scale !== "unset";
    }
    
    isModeSet(){
        return this.state.mode !== "unset";
    }

    isArppegioSet(){
        return this.state.arppegio !== "unset";
    }

    isChordSet(){
        return this.state.chord !== "unset";
    }

    isPositionSet(){
        return this.state.position !== "unset";
    }

    getNoteFromFretboard(m, n){
        var stringNote = guitar.tuning[m];

        return guitar.notes.sharps[(stringNote + n) % 12];
    }

    // If key, scale are set, we can get the notes and intervals in order for display
    // There scales that are not modals like the major blues and minor blues scales
    getScaleNotes(){

        var scaleNotes = [];
        
        var scaleFormula = guitar.scales[this.state.scale].formula;
        
        var steps = 0;

        scaleFormula.forEach((step) => {
            scaleNotes.push(guitar.notes.sharps[(parseInt(this.state.key) + steps) % 12]);
            steps += step;
        })

        return scaleNotes;
    }

    // For modal scales, we should get the scale's notes in the order of the chosen mode
    getModesNotes(){
        
        var modesNotes = [];

        var mode = parseInt(this.state.mode)  ;
        
        // Get scale's notes
        var scaleNotes = this.getScaleNotes();

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

    // We should also be able to get the scale or mode intervals
    getScaleIntervals(){

        if(this.state.scale === "unset"){
            return;
        }

        const scale = guitar.scales[this.state.scale];

        return scale.intervals;
    }

    // If a mode is set we should be able to get its intervals too
    getModeIntervals(){

        if(this.state.scale === "unset"){
            return;
        }

        if(this.state.key === "unset"){
            return;
        }

        const scale = guitar.scales[this.state.scale];
        
        var intervals = scale.modes[parseInt(this.state.mode)].intervals;

        return intervals;
    }
    
    updateFretboard(){

        // Possible combinations
        // A - Displaying a scales requires (1) a key, (2) a scale and (3) a mode [optional]
        // B - Displaying an arppegio requires (1) a key, (2) an arppegio degree and (3) a position [optional]
        // C - Displaying a chord requires (1) a key, (2) a chord degree and (3) a position (required)

        // A key must be chosen in all cases or else we cannot display a thing
        if(this.state.key === "unset"){
            return;
        }

        var scale = this.state.scale; 
        
        var arppegio = this.state.arppegio;
        
        if(scale === "unset" && arppegio === "unset"){
            return;
        }

        var scaleNotes = null;
        var intervals = null;
        
        if(scale !== "unset"){
            var isModal = guitar.scales[this.state.scale].isModal;

            scaleNotes = this.getScaleNotes();
            intervals = this.getScaleIntervals();

            if(isModal){
                // If scale is modal and no more is chosen, display nothing
                if(this.state.mode === "unset"){
                    return;
                }

                scaleNotes = this.getModesNotes();
                intervals = this.getModeIntervals();
            }
        }

        // If both a scale and an arppegio are chosen we display the arppegio
        if(arppegio !== "unset"){
            scaleNotes = this.getArppegioNotes();
            intervals = guitar.arppegios[arppegio].intervals;
        }

        this.setState({scaleNotes: scaleNotes}, () => {
            this.setState({scaleIntervals: intervals}, () => {
                // Always clean the fretboard on new scales, arppegios, chords etc...
                this.cleanFretboard(() => {
                    this.spreadNotesOnFretboard(this.state.scaleNotes, this.state.scaleIntervals);
                });
            });
        });
    }

    // We should be able to toggle notes
    // When no arppegio, scale or scole are chosen, show only notes
    // Else, if specified to display intervals that should be done too
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
            var arppegio = this.state.arppegio;

            if(arppegio !== "unset"){
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

            if(arppegio !== "unset"){
                intervals = guitar.arppegios[arppegio].intervals
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

    getArppegioNotes(){
        if(this.state.key === "unset"){
            return;
        }

        if(this.state.arppegio === "unset"){
            return;
        }

        var arppegioNotes = [];
        var arppegioFormula = guitar.arppegios[this.state.arppegio].formula;
        
        var steps = 0;

        arppegioFormula.forEach((step) => {
            arppegioNotes.push(guitar.notes.sharps[(parseInt(this.state.key) + steps) % 12]);
            steps += step;
        })

        return arppegioNotes;
        
    }

    spreadNotesOnFretboard(notes, intervals){
        var newFretboard = [...this.state.fretboard];

        for(var m = 0; m < guitar.numberOfStrings; m++){
            for(var n = 0; n < guitar.numberOfFrets; n++){
                var currentNote = this.getNoteFromFretboard(m, n);
                // For each note on the fretboard, if it applies on a scale then display...
                if(notes.includes(currentNote)){
                    
                    var numberOfNotes = this.state.scaleNotes.length;

                    var noteStyling = classNames({
                        'note': true,
                        'root': currentNote === notes[0],
                        'third': currentNote === notes[2],
                        'fifth': currentNote === notes[4],
                        'seventh': numberOfNotes === 7 ? (currentNote === notes[6]) : false
                    });
                    
                    
                    if(this.state.displayNotes){
                        // Display the note
                        newFretboard[m][n] = <span className={noteStyling}>{currentNote}</span>;
                    }else{
                        // Display the interval
                        newFretboard[m][n] = <span className={noteStyling}>{intervals[notes.indexOf(currentNote)]}</span>;
                    }
                }
            }
        }

        // Update x)
        this.setState({fretboard: newFretboard})
    }


    cleanFretboard(callback){
        var newFretboard = Array.from({length: guitar.numberOfStrings}, e => Array(guitar.numberOfFrets).fill(null));

        this.setState({ fretboard : newFretboard }, callback)
    }


    shouldComponentUpdate(previousProps, previousState){
        // If key, scale, mode, arppegio, chord, position change than render

        var shouldUpdate = false;

        if(previousState.key !== this.state.key){
           return true;
        }

        if(previousState.scale === this.state.scale){
           return true;
        }

        if(previousState.mode !== this.state.mode){
            return true;
        }

        if(previousState.arppegio !== this.state.arppegio){
            return true;
        }

        if(previousState.chord !== this.state.chord){
            return true;
        }

        if(previousState.position !== this.state.position){
            return true;
        }

        return false;
    }

    render(){

        const rows = [];

        var rowsNumber = guitar.numberOfStrings;
        var columnsNumber = guitar.numberOfFrets;

        // rows , rotated => colums 24
        for(let i = 0; i < rowsNumber; i++){
            const columns = [];

            // columns // rotated => strings
            for(let j = 0; j < columnsNumber; j++){

                var note = this.state.fretboard[i][j];
                columns.push(
                    <td
                        key={i + '-' + j} id={i + '-' + j}
                        onClick={(e) => {
                                this.toggleNote(i, j, e)
                            }
                        }>
                            { note }
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
                    <form className={this.props.classes.form}>
                        <FormControl variant="outlined" margin="normal" className={this.props.classes.formControl}>
                            <InputLabel htmlFor="keys">Keys :</InputLabel>
                            <Select
                            native
                            value={this.state.key}
                            onChange={this.onKeyChange}
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
                            onChange={this.onScaleChange}
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
                            value={this.state.mode}
                            onChange={this.onModeChange}
                            label="Modes :"
                            >
                            <option value="unset">Select mode</option>
                            { modes }
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" margin="normal" className={this.props.classes.formControl}>
                            <InputLabel htmlFor="keys">Arrpegios :</InputLabel>
                            <Select
                            native
                            value={this.state.arppegio}
                            onChange={this.onArppegioChange}
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
                        <FormControl variant="outlined" margin="normal" className={this.props.classes.formControl}>
                            <InputLabel htmlFor="keys">Chords :</InputLabel>
                            <Select
                            native
                            value={this.state.chord}
                            onChange={this.onChordChange}
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
                        <FormControl variant="outlined" margin="normal" className={this.props.classes.formControl}>
                            <InputLabel htmlFor="positions">Positions :</InputLabel>
                            <Select
                            native
                            value={this.state.position}
                            onChange={this.onPositionsChange}
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
                            onClick={this.onDisplayNotesChange}
                            className={this.props.classes.buttons}
                        >
                            Detect chord 
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={this.onDisplayNotesChange}
                            className={this.props.classes.buttons}
                        >
                            { buttonText } 
                        </Button>
                    </form>
                </section>
            </div>
        );
    }
}

export default HigherOrderComponentGuitarNeck;