import { 
  ADD_FRETBOARD,
  UPDATE_FRETBOARD_PROPERTY,
  SET_PROGRESSION,
  SET_PROGRESSION_KEY
} from "./actionTypes";

import guitar from '../config/guitar';

export function newLayout(numberOfStrings, numberOfFrets, tuning){
  return Array.from({length: numberOfStrings}, () => Array(numberOfFrets).fill({
      show: false,
      current: ''
  })).map((string, i) => string.map((fret, j) => ({
      show: false,
      current: guitar.notes.sharps[(tuning[i] + j) % 12]
  })))
};


export function newFretboard(numberOfStrings = 6, numberOfFrets = 22, tuning = [4, 7, 2, 9, 11, 4]){
  return {
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

    scaleSettings: {
      scale: '',
      formula: [],
      notes: [],
      intervals: [],
      fretboard: newLayout(numberOfStrings, numberOfFrets, tuning)
    },

    modeSettings: {
      mode: '',
      notes: [],
      intervals: [],
      formula: [],
      fretboard: newLayout(numberOfStrings, numberOfFrets, tuning)
    },

    arppegioSettings: {
      arppegio: '',
      notes: [],
      intervals: [],
      formula: [],
      fretboard: newLayout(numberOfStrings, numberOfFrets, tuning)
    },

    chordSettings: {
      chord: '',
      shape: '',
      fret: '',
      notes: [],
      intervals: [],
      fretboard: newLayout(numberOfStrings, numberOfFrets, tuning)
    },

    generalSettings: {
      notesDisplay: true,
      nofrets: numberOfFrets,
      nostrs: numberOfStrings,
      tuning: guitar.tuning,
      choice: 'scale'
    }
  }
}

export const updateStateProperty = (fretboardIndex, propertyPath, value) => ({
  type: UPDATE_FRETBOARD_PROPERTY,
  payload: { fretboardIndex, propertyPath, value }
});

export const addFretboard = (fretboard) => ({
  type: ADD_FRETBOARD,
  payload: { fretboard }
});   

export const setProgression = (progression) => ({
  type: SET_PROGRESSION,
  payload: { progression }
});

export const setProgressionKey = (key) => ({
  type: SET_PROGRESSION_KEY,
  payload: { key }
});   