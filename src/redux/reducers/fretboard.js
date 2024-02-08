import { 
    SET_FRETBOARD,
    
    DISPLAY_NOTE,
    TOGGLE_NOTE, 
    
    SET_KEY,
  
    SET_SCALE,
    SET_SCALE_NOTES,
    SET_SCALE_INTERVALS,
    
    SET_MODE, 
    SET_MODE_NOTES, 
    SET_MODE_INTERVALS,
    
    SET_ARPPEGIO,

    SET_CHORD,

    SET_SHAPE,
    SET_FRET,

    SET_NOTES_DISPLAY
  } from "../actionTypes";

import guitar from '../../config/guitar'

function newFretboard(){
    var newFretboard = Array.from({length: guitar.numberOfStrings}, e => Array(guitar.numberOfFrets).fill({
        show: false,
        current: ''
    }));

    for(let i = 0; i < guitar.numberOfStrings; i++){
        for(let j = 0; j < guitar.numberOfFrets; j++){
            newFretboard[i][j] = {
                show: false,
                current: guitar.notes.sharps[(guitar.tuning[i] + j) % 12]
            };
        }
    }

    return newFretboard;
}

const initialState = {
    fretboard: newFretboard(),
    
    keySignature: '',
    
    scale: '',
    scaleFormula: [],
    scaleNotes: [],
    scaleIntervals: [],
    
    mode: '',
    modeNotes: [],
    modeIntervals : [],
    
    arppegio: '',
    arppegioNotes: [],
    arppegioIntervals: [],
    
    chord: '',
    notesDisplay: true,

    fret: '',
    shape: ''
};

const fretboard = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRETBOARD: {
        return {
            ...state,
            fretboard: action.payload.fretboard
        };
    }
    case TOGGLE_NOTE: {
        console.log("toggle note");
        let nf = [...state.fretboard];
        console.log(action.payload)
        nf[action.payload.i][action.payload.j].show = !nf[action.payload.i][action.payload.j].show;

        return {
            ...state,
            fretboard: nf
        };
    }
    case DISPLAY_NOTE: {
        let nf = [...state.fretboard];
        nf[action.payload.i][action.payload.j].show = true;

        return {
            ...state,
            fretboard: nf
        };
    }
    case SET_SCALE: {
        return {
            ...state,
            scale: action.payload.scale
        };
    }
    case SET_MODE: {
        return {
            ...state,
            mode: action.payload.mode
        };
    }
    case SET_SCALE_NOTES: {
        return {
            ...state,
            scaleNotes: action.payload.scaleNotes
        };
    }
    case SET_MODE_NOTES: {
        return {
            ...state,
            modeNotes: action.payload.modeNotes
        };
    }
    case SET_SCALE_INTERVALS: {
        return {
            ...state,
            scaleIntervals: action.payload.scaleIntervals
        };
    }
    case SET_MODE_INTERVALS: {
        return {
            ...state,
            modeIntervals: action.payload.modeIntervals
        };
    }
    case SET_KEY: {
        return {
            ...state,
            keySignature: action.payload.keySignature
        };
    }
    case SET_ARPPEGIO: {
        return {
            ...state,
            arppegio: action.payload.arppegio
        };
    }
    case SET_CHORD: {
        return {
            ...state,
            chord: action.payload.chord
        };
    }
    case SET_SHAPE: {
        return {
            ...state,
            shape: action.payload.shape
        };
    }
    case SET_FRET: {
        return {
            ...state,
            fret: action.payload.fret
        };
    }
    case SET_NOTES_DISPLAY: {
        return {
            ...state,
            notesDisplay: action.payload.notesDisplay
        };
    }
    default: {
      return state;
    }
  }
};

export default fretboard;