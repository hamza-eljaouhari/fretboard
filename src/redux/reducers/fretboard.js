import { 
    SET_FRETBOARDS,
    SET_KEY_FOR_CHOICE,
    DISPLAY_NOTE,
    TOGGLE_NOTE, 
    
    SET_KEY,
  
    SET_SCALE,
    SET_SCALE_NOTES,
    SET_SCALE_INTERVALS,
    
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

import { 
    newFretboard, newLayout,
} from '../actions';

import guitar from '../../config/guitar'

const updateNestedObject = (object, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const nestedObject = keys.reduce((obj, key) => {
      if (!obj[key]) {
        obj[key] = {};
      }
      return obj[key];
    }, object);
    nestedObject[lastKey] = value;
    return { ...object };
};

const initialState = {
    fretboard: newFretboard(guitar.numberOfStrings, guitar.numberOfFrets, guitar.tuning),
    fretboards: [],
 
    keySettings: {
        scale: '',
        mode: '',
        arppegio: '',
        chord: ''
    },
    
    urlSettings: {
        scale: '',
        mode: '',
        arppegio: '',
        chord: ''
    },

    scaleSettings : {
        scale: '',
        formula: [],
        notes: [],
        intervals: [],
    },
    
    modeSettings : { 
        mode: '',
        notes: [],
        intervals: [],
        formula: []
    },

    arppegioSettings : { 
        arppegio: '',
        notes: [],
        intervals: [],
        formula: []
    },

    chordSettings: {
        chord: '',
        shape: ''
    },

    generalSettings: {
        notesDisplay: true,
        nofrets: '',
        nostrs: '',
        tuning: guitar.tuning
    }
};


const fretboard = (state = initialState, action) => {
  switch (action.type) {
    case SET_KEY_FOR_CHOICE : {
        return {
            ...state,
            fretboards: state.fretboards.map((fretboard, index) => {
                if (index === action.payload.fretboardIndex) {
                    return {
                        ...fretboard,
                        keySettings: {
                            ...fretboard.keySettings,
                            [action.payload.choice]: action.payload.key
                        }
                    };
                }
                return fretboard;
            })
        };
    }
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
        const { fretboardIndex, propertyPath, value } = action.payload;

        const keys = propertyPath.split('.');
        
        if (keys.length === 1) {
          return {
            ...state,
            fretboards: state.fretboards.map((fretboard, index) =>
              index === fretboardIndex
                ? { ...fretboard, [propertyPath]: value }
                : fretboard
            ),
          };
        } else {
          return {
            ...state,
            fretboards: state.fretboards.map((fretboard, index) =>
              index === fretboardIndex
                ? updateNestedObject(fretboard, propertyPath, value)
                : fretboard
            ),
          };
        }
    default: {
      return state;
    }
  }
};

export default fretboard;