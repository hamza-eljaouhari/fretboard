
import React from 'react';
import {
    FILL_FRETBOARD,
    CLEAN_FRETBOARD,
    DISPLAY_NOTE,
    TOGGLE_NOTE, 
    SET_SCALE, 
    SET_MODE, 
    SET_SCALE_NOTES, 
    SET_MODE_NOTES, 
    SET_SCALE_INTERVALS, 
    SET_MODE_INTERVALS,
    SET_KEY,
    SET_ARPPEGIO
} from '../actionTypes';

import guitar from '../../config/guitar'

var classNames = require('classnames');

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
    case FILL_FRETBOARD: {
        return {
            ...state,
            fretboard: action.payload.fretboard
        };
    }
    case CLEAN_FRETBOARD:{
        return {
            ...state,
            fretboard: action.payload.fretboard
        };
    }
    case TOGGLE_NOTE: {
        var nf = [...state.fretboard];

        nf[action.payload.i][action.payload.j].show = !nf[action.payload.i][action.payload.j].show;

        return {
            ...state,
            fretboard: nf
        };
    }
    case DISPLAY_NOTE: {
        var nf = [...state.fretboard];

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
    default: {
      return state;
    }
  }
};

export default fretboard;