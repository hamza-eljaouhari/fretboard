import { 
    SET_FRETBOARD,
    SET_FRETBOARDS,
    
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

    SET_NOTES_DISPLAY,

    SET_ARPPEGIO_NOTES,
    SET_ARPPEGIO_INTERVALS,
    UPDATE_FRETBOARD_PROPERTY
  } from "../actionTypes";

import guitar from '../../config/guitar'

export function newLayout(numberOfStrings, numberOfFrets, tuning){
    return Array.from({length: numberOfStrings}, () => Array(numberOfFrets).fill({
        show: false,
        current: ''
    })).map((string, i) => string.map((fret, j) => ({
        show: false,
        current: guitar.notes.sharps[(tuning[i] + j) % 12]
    })))
};

export function newFretboard(numberOfStrings, numberOfFrets, tuning){

    const defaultTuning = [4, 7, 2, 9, 11, 4];
    
    return {
        fretboard: newLayout(numberOfStrings, numberOfFrets, tuning || defaultTuning),
        tuning: tuning || defaultTuning,
        keySignature: '',
        scale: '',
        mode: '',
        arppegio: '',
        chord: '',
        notesDisplay: true,
        scaleNotes: [],
        scaleIntervals: [],
        modeNotes: [],
        modeIntervals: [],
        arppegioNotes: [],
        arppegioIntervals: [],
        shape: '',
        fret: '',
        nofrets: 22,
        nostr: 6,
        url: ''
    };
}


const initialState = {
    fretboard: newFretboard(guitar.numberOfStrings, guitar.numberOfFrets, guitar.tuning),

    fretboards: [],


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
    case SET_KEY: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, keySignature: action.payload.keySignature };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }
    case SET_ARPPEGIO: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, arppegio: action.payload.arppegio };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }
    case SET_CHORD: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, chord: action.payload.chord };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }

    case SET_SHAPE: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, shape: action.payload.shape };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }

    case SET_FRET: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, fret: action.payload.fret };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }

    case SET_NOTES_DISPLAY: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, notesDisplay: action.payload.notesDisplay };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }
    
    case SET_FRETBOARDS: {
        return {
            ...state,
            fretboards: action.payload.fretboards
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
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, scale: action.payload.scale };
            }
            return fb;
        });
    
        return { ...state, fretboards: updatedFretboards };
    }
    case SET_SCALE_NOTES: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, scaleNotes: action.payload.scaleNotes };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }

    case SET_SCALE_INTERVALS: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, scaleIntervals: action.payload.scaleIntervals };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }

    case SET_MODE_NOTES: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, modeNotes: action.payload.modeNotes };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }

    case SET_MODE_INTERVALS: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, modeIntervals: action.payload.modeIntervals };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }

    case SET_ARPPEGIO_NOTES: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, arppegioNotes: action.payload.arppegioNotes };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }

    case SET_ARPPEGIO_INTERVALS: {
        const updatedFretboards = state.fretboards.map((fb, index) => {
            if (index === action.payload.fretboardIndex) {
                return { ...fb, arppegioIntervals: action.payload.arppegioIntervals };
            }
            return fb;
        });
        return { ...state, fretboards: updatedFretboards };
    }
    case UPDATE_FRETBOARD_PROPERTY:
        const { fretboardIndex, propertyName, value } = action.payload;
        return {
            ...state,
            fretboards: state.fretboards.map((fretboard, index) => {
                if (index === fretboardIndex) {
                    return { ...fretboard, [propertyName]: value };
                }
                return fretboard;
            })
        };
    default: {
      return state;
    }
  }
};

export default fretboard;