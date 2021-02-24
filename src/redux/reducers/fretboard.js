
import React from 'react';
import {
    FILL_FRETBOARD,
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
    fretboard: Array.from({length: guitar.numberOfStrings}, e => Array(guitar.numberOfFrets).fill({
        show: false,
        current: ''
    })),
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
    case TOGGLE_NOTE: {
        var nf = [...state.fretboard];

        nf[action.payload.i][action.payload.j].show = !nf[action.payload.i][action.payload.j].show;

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
    default: {
      return state;
    }
  }
};

export default fretboard;