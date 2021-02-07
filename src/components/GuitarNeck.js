import guitar from '../config/guitar';
import React from 'react';
import './guitar-neck.css';

var classNames = require('classnames');

class GuitarNeck extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            fretboard: Array.from({length: guitar.numberOfStrings}, e => Array(guitar.numberOfFrets).fill(null)),
            keyIndex: -1,
            arppegioDegree: 'unset',
            scale: 'unset',
            modeIndex: 0,
            displayNotes: true
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

        this.setState({modeIndex: modeIndex}, () => {
            this.displayScale();
        });
    }

    displayNotesChange(e){
        var displayNotes = e.target.value;

        this.setState({displayNotes: displayNotes});
    }


    toggleNote(i, j, e){
        var newFretboard = [...this.state.fretboard];

        if(newFretboard[i][j] != null){
            newFretboard[i][j] = null;
        }else{
            newFretboard[i][j] = this.getNoteFromFretboard(i, j);
        }

        this.setState({fretboard: newFretboard});
    }

    keyChange(e){
        const newKeyIndex = e.target.value;

        this.setState({ keyIndex: newKeyIndex}, () => {
            this.displayScale()
        });
    }

    getScaleNotes(){

        alert(this.state.keyIndex);
     
        alert(this.state.scale);
   

        var scaleNotes = [];

        var rootNote = guitar.notes.sharps[this.state.keyIndex]; // TODO: Color it later

        scaleNotes.push(rootNote);

        var i = parseInt(this.state.keyIndex);

        guitar.scales[this.state.scale].formula.forEach(function(step){
            i = (i + step) % 12;

            scaleNotes.push(guitar.notes.sharps[i])
        })

        return scaleNotes;
    }

    displayScale(){

        if(this.state.scale === "unset" || this.state.keyIndex < 0){
            this.cleanFretboard()
            return;
        }

        var scaleNotes = this.getScaleNotes();
        var scaleIntervals = this.getScaleIntervals();

        this.cleanFretboard(() => {
            this.spreadNotesOnFretboard(scaleNotes, scaleIntervals)
        });
    }

    getScaleIntervals(){
        const scale = guitar.scales[this.state.scale];
        var intervals = [];

        if(scale.isModal){
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
            if(this.state.keyIndex > -1){
                this.displayScale();
            }
        });
        // Get all 7 notes from the scale and spread them across the fretboard
    }


    getNoteFromFretboard(m, n){
        var stringNote = guitar.tuning[m];

        return guitar.notes.sharps[(stringNote + n) % 12];
    }

    arppegioChange(e){
        // key must chosen if not take the default
        const arppegioDegree = e.target.value;

        this.setArppegioDegree({arppegioDegree: arppegioDegree});
        // find the notes using the intervals of tha arppegios
        var scaleNotes = this.getScaleNotes();

        var arppegioNotes = [];

        guitar.arppegios[arppegioDegree].intervals.forEach(function(step){
            arppegioNotes.push(scaleNotes[step - 1]);
        })

        this.spreadNotesOnFretboard(arppegioNotes);
    }

    componentDidUpdate(){
    }

    spreadNotesOnFretboard(notes, intervals){
        console.log(intervals)
        var newFretboard = [...this.state.fretboard];

        var rootNote = notes[this.state.modeIndex]; // D  dorian

        if(!rootNote){
            rootNote = guitar.notes.sharps[this.state.keyIndex]; // C
        }

        for(var m = 0; m < guitar.numberOfStrings; m++){
            for(var n = 0; n < guitar.numberOfFrets; n++){
                var currentNote = this.getNoteFromFretboard(m, n);

                if(notes.includes(currentNote)){ // C major has C D E A F B G E C
                    var noteStyling = classNames({
                        'note': true,
                        'root': rootNote === currentNote,
                        'third': true,
                        'fifth': true
                    });

                    newFretboard[m][n] = <span className={noteStyling}>{currentNote}</span>;
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
                    note = <span className="note">{ this.state.fretboard[i][j] }</span>
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

                if(currentScale){
                    if(scaleModes.length){
                        modes = scaleModes.map((mode, index) => {
                            return <option key={index} value={index}>{mode.name}</option>
                        })
                    }
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
                <button onClick={() => this.setState({displayNotes: !this.state.displayNotes})}>{ buttonText }</button>
            </div>
        );
    }
}

export default GuitarNeck;