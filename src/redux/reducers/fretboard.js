import { 
    FILL_FRETBOARD,
    
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

    SET_POSITION,
    SET_IS_NOTES_DISPLAY
  } from "../actionTypes";

import guitar from '../../config/guitar'

function newFretboard(){
    return Array.from({length: guitar.numberOfStrings}, e => Array(guitar.numberOfFrets).fill({
        show: false,
        current: ''
    }));
}

const initialState = {
    fretboard: newFretboard(),
    
    keySignature: 'unset',
    
    scale: 'unset',
    scaleFormula: [],
    scaleNotes: [],
    scaleIntervals: [],
    
    mode: 'unset',
    modeNotes: [],
    modeIntervals : [],
    
    arppegio: 'unset',
    arppegioNotes: [],
    arppegioIntervals: [],
    
    chord: 'unset',
    isNotesDisplay: true,

    position: 'unset'
};

const fretboard = (state = initialState, action) => {
  switch (action.type) {
    case FILL_FRETBOARD: {
        return {
            ...state,
            fretboard: action.payload.fretboard
        };
    }
    case TOGGLE_NOTE: {
        let nf = [...state.fretboard];
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
    case SET_POSITION: {
        return {
            ...state,
            position: action.payload.position
        };
    }
    case SET_IS_NOTES_DISPLAY: {
        return {
            ...state,
            isNotesDisplay: action.payload.isNotesDisplay
        };
    }
    default: {
      return state;
    }
  }
};

export default fretboard;