import { 
  FILL_FRETBOARD,
  
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
  SET_DASHED_CIRCLE_ROTATION
} from "./actionTypes";

export const fillFretboard = (fretboard) => ({
  type: FILL_FRETBOARD,
  payload: { fretboard }
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

