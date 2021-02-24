
import React from 'react';
import { 
    TOGGLE_NOTE, 
    SET_SCALE, 
    SET_MODE, 
    SET_SCALE_NOTES, 
    SET_MODE_NOTES, 
    SET_SCALE_INTERVALS, 
    SET_MODE_INTERVALS,
    SET_KEY
} from '../actionTypes';
import guitar from '../../config/guitar'

var classNames = require('classnames');

const initialState = {
    fretboard: Array.from({length: guitar.numberOfStrings}, e => Array(guitar.numberOfFrets).fill(null)),
    keySignature: 'unset',
    scale: 'unset',
    scaleNotes: [],
    scaleIntervals: [],
    mode: 'unset',
    modesNotes: [],
    arppegio: 'unset',
    arppegioNotes: [],
    isNotesDisplay: true
};

const fretboard = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NOTE: {
            console.log()
            var newFretboard = [...state.fretboard];
    
            if(newFretboard[action.payload.i][action.payload.j] !== null){
                newFretboard[action.payload.i][action.payload.j] = null;
            }else{
                newFretboard[action.payload.i][action.payload.j] = action.payload.current;
            }
    
            return {
                ...state,
                fretboard: newFretboard
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
    default: {
      return state;
    }
  }
};

export default fretboard;