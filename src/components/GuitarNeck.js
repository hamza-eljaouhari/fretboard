import guitar from '../config/guitar';
import React from 'react';
import './guitar-neck.css';

var classNames = require('classnames');

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
        this.toggleNote = this.toggleNote.bind(this);
        this.getNoteFromFretboard = this.getNoteFromFretboard.bind(this);
        this.getScaleNotes = this.getScaleNotes.bind(this);
        this.modeChange = this.modeChange.bind(this);
        this.displayNotesChange = this.displayNotesChange.bind(this);
    }

    modeChange(e){
        var modeIndex = e.target.value;

        this.setState({modeIndex: modeIndex},  () => {
            this.displayScale();
        });
    }

    displayNotesChange(e){
        this.setState({displayNotes: !this.state.displayNotes});
    }


    toggleNote(i, j, e){
        var newFretboard = [...this.state.fretboard];

        if(newFretboard[i][j] != null){
            newFretboard[i][j] = null;
        }else{

            var noteIntervalIndex = this.state.scaleIntervals.indexOf(newFretboard[i][j]);

            var currentNote = this.getNoteFromFretboard(i, j);

            var scaleNotes = this.state.scaleNotes;

            var noteClassnames = classNames({
                "note": true,
                "root": scaleNotes.length ? currentNote === scaleNotes[0] : false,
                "third": scaleNotes.length ? currentNote === scaleNotes[2] : false,
                "fifth": scaleNotes.length ? currentNote === scaleNotes[4]: false,
                "seventh": scaleNotes.length ? currentNote === scaleNotes[6]: false
            });

            
            newFretboard[i][j] = <span className={noteClassnames}>{currentNote}</span>;
        }

        this.setState({ fretboard: newFretboard });
    }

    keyChange(e){
        const newKeyIndex = e.target.value;

        this.setState({ keyIndex: newKeyIndex}, () => {
            this.displayScale();
        });
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

        // var modeRootDistance = 0;
        
        // var steps = parseInt(this.state.keyIndex); // 2

        // for(let k = 0; k < scaleFormula.length; k++){
        //     if(k < this.state.modeIndex){
        //         modeRootDistance = (k + 1);
        //         steps += scaleFormula[k];
        //     }
        // }
        // // 2, 2, 1, 2, 2, 2, 1
        // var i = modeRootDistance;

        // // while((step % ( scaleFormula.length - 1) === parseInt(this.state.keyIndex)) )
        // while(scaleNotes.length < scaleFormula.length){
        //     // looping the formula
        //     // till i = i - 1

        //     scaleNotes.push(guitar.notes.sharps[steps]); // D, 

        //     steps = (steps + scaleFormula[i]);
            
        //     if(steps > 11){
        //         steps = steps % 11; // 11 is not displayed // 2 + 2 => F#
        //         steps--;
        //     }
            
        //     i++; // 6 % 6 6 is not played, 

        //     if(i > 6){
        //         i = i % (scaleFormula.length - 1) // 1 index , 1
        //         i--;
        //     }
        // }

    }

    displayScale(){

        if(this.state.scale === "unset" || this.state.keyIndex === "unset" || this.state.modeIndex === "unset"){
            this.cleanFretboard()
            return;
        }

        this.setState({scaleNotes: this.getScaleNotes()}, () => {
            this.setState({scaleIntervals: this.getScaleIntervals()}, () => {
                this.cleanFretboard(() => {
                    this.spreadNotesOnFretboard(this.state.scaleNotes, this.state.scaleIntervals);
                });
            });
        });
    }

    getScaleIntervals(){

        if(this.state.modeIndex === "unset"){
            return;
        }

        if(this.state.scale === "unset"){
            return;
        }

        var intervals = [];

        const scale = guitar.scales[this.state.scale];

        console.log(scale);
        if(scale.isModal){
            console.log(this.state.modeIndex)
            intervals = scale.modes[this.state.modeIndex].intervals;
        }else{
            intervals = scale.intervals;
        }

        return intervals;
    }
    // Display Ionian mode in C
    scaleChange(e){
        const newScale = e.target.value;

        this.setState({scale: newScale}, () => {
            this.displayScale();
        });
        // Get all 7 notes from the scale and spread them across the fretboard
    }

    getNoteFromFretboard(m, n){
        var stringNote = guitar.tuning[m];

        return guitar.notes.sharps[(stringNote + n) % 12];
    }

    arppegioChange(e){
        const arppegioDegree = e.target.value;

        this.setState({arppegioDegree: arppegioDegree}, () => {
            this.displayScale();
        });

        if(this.state.keyIndex === "unset"){
            return;
        }

        if(this.state.scale === "unset"){
            return;
        }
        // key must chosen if not take the default


        // find the notes using the intervals of tha arppegios
        var scaleNotes = this.getScaleNotes();

        var arppegioNotes = [];

        guitar.arppegios[arppegioDegree].intervals.forEach(function(step){
            arppegioNotes.push(scaleNotes[step - 1]);
        })

        // this.spreadNotesOnFretboard(arppegioNotes);
    }

    // componentWillUpdate(){
    //     console.log("Will update")
    // }

    spreadNotesOnFretboard(notes, intervals){
        var newFretboard = [...this.state.fretboard];

        console.log("intervals", intervals);
        console.log("notes", notes);

        var rootNote = notes[this.state.modeIndex];

        // if(!rootNote){
        //     rootNote = guitar.notes.sharps[this.state.keyIndex]; // C
        // }

        for(var m = 0; m < guitar.numberOfStrings; m++){
            // Get to E and the A D G B E
            for(var n = 0; n < guitar.numberOfFrets; n++){
                // Get to each of notes "notes"
                // steps are found in
                var currentNote = this.getNoteFromFretboard(m, n);
                
                if(notes.includes(currentNote)){ // C major has C D E A F B G E C
                    var noteStyling = classNames({
                        'note': true,
                        'root': currentNote === notes[this.state.modeIndex],
                        'third': currentNote === notes[(this.state.modeIndex + 2 ) % 7],
                        'fifth': currentNote === notes[(this.state.modeIndex + 4) % 7],
                        'seventh': currentNote === notes[(this.state.modeIndex + 6) % 7]
                    });
                    
                    var noteIntervalIndex = notes.indexOf(currentNote);

                    if(this.state.displayNotes){
                        newFretboard[m][n] = <span className={noteStyling}>{currentNote}</span>;
                    }else{
                        newFretboard[m][n] = <span className={noteStyling}>{intervals[noteIntervalIndex]}</span>;
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

        var notes = guitar.notes.sharps.map((note, index) => {
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

        var buttonText = 'Switch to intevals'

        if(!this.state.displayNotes){
            buttonText = 'Switch to notes';
        }

        var scalesNames = Object.keys(guitar.scales);

        var scales = scalesNames.map((scaleName) => {
            return <option key={scaleName} value={scaleName}>{guitar.scales[scaleName].name}</option>;
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
                <label>
                    Keys :
                </label>
                <select value={this.state.keyIndex} onChange={this.keyChange}>
                    <option value="unset">Select key</option>
                    { notes }
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
                    <option value="minor">Minor</option>
                    <option value="major">Major</option>
                    <option value="m7">Minor 7th</option>
                    <option value="7">Major 7th</option>
                </select>
                <button onClick={this.displayNotesChange}>{ buttonText }</button>
            </div>
        );
    }
}

export default GuitarNeck;