import guitar from '../config/guitar';
import React from 'react';    
import './guitar-neck.css';
import { render } from '@testing-library/react';

class GuitarNeck extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            fretboard: Array.from({length: guitar.numberOfStrings}, e => Array(guitar.numberOfFrets).fill(null)),
            keyIndex: -1,
            arppegioDegree: '',
            scale: '',
            modeIndex: -1
        };
    
        this.keyChange = this.keyChange.bind(this);
        this.scaleChange = this.scaleChange.bind(this);
        this.arppegioChange = this.arppegioChange.bind(this);
        this.toggleNote = this.toggleNote.bind(this);
        this.getScaleNotes = this.getScaleNotes.bind(this);
        this.getNoteFromFretboard = this.getNoteFromFretboard.bind(this);
        this.getScaleNotes = this.getScaleNotes.bind(this);
        this.modeChange = this.modeChange.bind(this);
    }
    
    modeChange(e){
        var modeIndex = e.target.value;

        this.setState({modeIndex: modeIndex}, () => {
            if(this.state.keyIndex > -1 && this.state.scale){
                var scaleNotes = this.getScaleNotes();
                this.spreadNotesOnFretboard(scaleNotes);
            }
        });


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

            if(this.state.scale){
                this.displayScale()
            }

        });
    }

    getScaleNotes(){
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
        var scaleNotes = this.getScaleNotes();

        this.cleanFretboard(() => {
            this.spreadNotesOnFretboard(scaleNotes)
        });
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

    spreadNotesOnFretboard(notes){

        var newFretboard = [...this.state.fretboard];
        
        var rootNote = notes[this.state.modeIndex]; // D  dorian

        if(!rootNote){
            rootNote = guitar.notes.sharps[this.state.keyIndex]; // C
        }

        for(var m = 0; m < guitar.numberOfStrings; m++){
            for(var n = 0; n < guitar.numberOfFrets; n++){
                var currentNote = this.getNoteFromFretboard(m, n);
                
                if(notes.includes(currentNote)){ // C major has C D E A F B G E C
                    if(rootNote === currentNote){ // if 
                        newFretboard[m][n] = 'R';
                    }else{
                        newFretboard[m][n] = currentNote;
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
    
        const currentScale = guitar.scales[this.state.scale];
        
        var modes = null; 

        if(currentScale){
            var scaleModes = currentScale.modes;

            if(scaleModes){
                modes = scaleModes.map((mode, index) => {
                    return <option key={index} value={index}>{mode}</option>
                })
            }
        }
        

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
                    <option>Select key</option>
                    { notes }
                </select>
                <label>
                    Scale :
                </label>
                <select value={this.state.scale} onChange={this.scaleChange}>
                    <option>Select scale</option>
                    <option value="minor">Natural Minor</option>
                    <option value="major">Major</option>
                    <option value="harmonic">Harmonic</option>
                    <option value="melodic">Melodic</option>
                    <option value="blues-minor">Blues minor</option>
                    <option value="blues-major">Blues major</option>
                </select>
                <label>
                    Modes :
                </label>
                <select value={this.state.modeIndex} onChange={this.modeChange}>
                    <option>Select mode</option>
                    { modes }
                </select>
                <label>
                    Arppegios :
                </label>
                <select value={this.state.arppegioDegree} onChange={this.arppegioChange}>
                    <option>Select arppegio</option>
                    <option value="minor">Minor</option>
                    <option value="major">Major</option>
                    <option value="m7">Minor 7th</option>
                    <option value="7">Major 7th</option>
                </select>        
            </div>
        );
    }
}

export default GuitarNeck;