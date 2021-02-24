import { 
  FILL_FRETBOARD,
  
  DISPLAY_NOTE,
  TOGGLE_NOTE, 
  
  SET_KEY,

  SET_SCALE,
  SET_SCALE_NOTES,
  SET_SCALE_FORMULA, 
  SET_SCALE_INTERVALS,
  
  SET_MODE, 
  SET_MODE_NOTES, 
  SET_MODE_INTERVALS,
  
  SET_ARPPEGIO,
  SET_ARPPEGIO_NOTES, 
  SET_ARPPEGIO_INTERVALS,
  
  SET_CHORD,
  SET_POSITION,
  SET_IS_NOTES_DISPLAY
} from "./actionTypes";

export const fillFretboard = (fretboard) => ({
  type: FILL_FRETBOARD,
  payload: { fretboard }
});   

export const toggleNote = (i, j, current) => ({
  type: TOGGLE_NOTE,
  payload: { i, j, current }
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

export const setPosition = (position) => ({
  type: SET_POSITION,
  payload: { position }
});

export const setIsNotesDisplay = (isNotesDisplay) => ({
  type: SET_IS_NOTES_DISPLAY,
  payload: { isNotesDisplay }
});   
