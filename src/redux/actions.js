import { 
  SET_FRETBOARD,
  SET_FRETBOARDS,
  
  DISPLAY_NOTE,
  TOGGLE_NOTE, 
  
  SET_KEY,

  SET_SCALE,
  SET_SCALE_FORMULA, 
  
  SET_MODE, 
  SET_MODE_NOTES, 
  SET_MODE_INTERVALS,
  
  SET_ARPPEGIO,
  SET_ARPPEGIO_NOTES, 
  SET_ARPPEGIO_INTERVALS,
  
  SET_CHORD,

  SET_SHAPE,
  SET_FRET,

  SET_NOTES_DISPLAY,
  
  SET_CIRCLE_OF_FIFTHS_ROTATION,
  SET_DASHED_CIRCLE_ROTATION,

  SET_CHORD_PROGRESSION,

  UPDATE_FRETBOARD_PROPERTY
  
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
    fretboard: newLayout(numberOfStrings, numberOfFrets, tuning),
    
    keySettings: {
      scales: '',
      modes: '',
      arpeggios: '',
      chords: ''
    },
    
    urlSettings: {
      scales: '',
      modes: '',
      arpeggios: '',
      chords: ''
    },

    scaleSettings : {
      scale: '',
      formula: [],
      notes: [],
      intervals: []
    },
    
    modeSettings : { 
      mode: '',
      notes: [],
      intervals: [],
      formula: []
    },

    arppegioSettings : { 
      mode: '',
      notes: [],
      intervals: [],
      formula: []
    },

    chordSettings: {
      chord: '',
      shape: '',
      fret: ''
    },
    
    generalSettings: {
      notesDisplay: true,
      nofrets: numberOfFrets,
      nostrs: numberOfStrings,
      tuning: tuning
    }
  };
}

export const updateFretboardProperty = (fretboardIndex, propertyPath, value) => ({
  type: UPDATE_FRETBOARD_PROPERTY,
  payload: { fretboardIndex, propertyPath, value }
});

export const setKeyForChoice = (fretboardIndex, choice, key) => ({
  type: 'SET_KEY_FOR_CHOICE',
  payload: { fretboardIndex, choice, key }
});

export const setFretboard = (fretboard) => ({
  type: SET_FRETBOARD,
  payload: { fretboard }
});   

export const setFretboards = (fretboards) => ({
  type: SET_FRETBOARDS,
  payload: { fretboards }
});   

export const toggleNote = (i, j) => ({
  type: TOGGLE_NOTE,
  payload: { i, j }
});   

export const displayNote = (i, j) => ({
  type: DISPLAY_NOTE,
  payload: { i, j }
});   

export const setKey = (keySignature) => ({
  type: SET_KEY,
  payload: { keySignature }
});   

export const setScale = (scale) => ({
  type: SET_SCALE,
  payload: { scale }
});

export const setScaleFormula = (scaleFormula) => ({
  type: SET_SCALE_FORMULA,
  payload: { scaleFormula }
});   

export const setScaleNotes = (scaleNotes) => ({
  type: SET_SCALE_FORMULA,
  payload: { scaleNotes }
});   
  
export const setScaleIntervals = (scaleIntervals) => ({
  type: SET_MODE_INTERVALS,
  payload: { scaleIntervals }
});   

export const setMode = (mode) => ({
  type: SET_MODE,
  payload: { mode }
});

export const setModeNotes = (modesNotes) => ({
  type: SET_MODE_NOTES,
  payload: { modesNotes }
});   

export const setModeIntervals = (modeIntervals) => ({
  type: SET_MODE_INTERVALS,
  payload: { modeIntervals }
});   

export const setArppegio = (arppegio) => ({
  type: SET_ARPPEGIO,
  payload: { arppegio }
});

export const setArppegioNotes = (arppegioNotes) => ({
  type: SET_ARPPEGIO_NOTES,
  payload: { arppegioNotes }
});   

export const setArppegioIntervals = (arppegioIntervals) => ({
  type: SET_ARPPEGIO_INTERVALS,
  payload: { arppegioIntervals }
});   

export const setChord = (chord) => ({
  type: SET_CHORD,
  payload: { chord }
});

export const setShape = (shape) => ({
  type: SET_SHAPE,
  payload: { shape }
});

export const setFret = (fret) => ({
  type: SET_FRET,
  payload: { fret }
});

export const setNotesDisplay = (notesDisplay) => ({
  type: SET_NOTES_DISPLAY,
  payload: { notesDisplay }
});   

export const setCircleOfFifthsRotation = (circleOfFifthsRotation) => ({
  type: SET_CIRCLE_OF_FIFTHS_ROTATION,
  payload: { circleOfFifthsRotation }
});   

export const setDashedCircleRotation = (dashedCircleRotation) => ({
  type: SET_DASHED_CIRCLE_ROTATION,
  payload: { dashedCircleRotation }
});   

export const setChordProgression = (chordProgression) => ({
  type: SET_CHORD_PROGRESSION,
  payload: { chordProgression }
});   

