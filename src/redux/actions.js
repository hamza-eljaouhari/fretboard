import { 
  FILL_FRETBOARD,
  CLEAN_FRETBOARD,
  DISPLAY_NOTE,
  TOGGLE_NOTE, 
  SET_SCALE, 
  SET_MODE_NOTES, 
  SET_MODE, 
  SET_SCALE_FORMULA, 
  SET_MODE_INTERVALS,
  SET_ARPPEGIO,
  SET_CHORD,
  SET_POSITION,
  SET_KEY
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

  
  export const setModesNotes = (modesNotes) => ({
    type: SET_MODE_NOTES,
    payload: { modesNotes }
  });   

  export const setMode = (mode) => ({
    type: SET_MODE,
    payload: { mode }
  });   

  export const setScaleFormula = (scaleFormula) => ({
    type: SET_SCALE_FORMULA,
    payload: { scaleFormula }
  });   

  
    
  export const setScaleIntervals = (scaleIntervals) => ({
    type: SET_MODE_INTERVALS,
    payload: { scaleIntervals }
  });   


  export const setModeIntervals = (modeIntervals) => ({
    type: SET_MODE_INTERVALS,
    payload: { modeIntervals }
  });   

  export const setArppegio = (arppegio) => ({
    type: SET_ARPPEGIO,
    payload: { arppegio }
  });   

  export const setChord = (chord) => ({
    type: SET_CHORD,
    payload: { chord }
  });   

  
  export const setPosition = (position) => ({
    type: SET_POSITION,
    payload: { position }
  });   