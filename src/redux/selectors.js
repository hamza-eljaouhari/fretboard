import guitar from '../config/guitar';

export const getFretboard = store => store.fretboard;
export const getScale = store => store.scale;
export const getNotesDisplay = store => store.notesDisplay;
export const getArppegio = store => store.arppegio;
export const getArppegioNotes = store => store.arppegioNotes;
export const getScaleIntervals = store => store.scaleIntervals;
export const getModesNotes = store => store.modesNotes;
export const getKey = store => store.key;
export const getScaleNotes = (store) => {
    var scaleNotes = [];
    
    var scaleFormula = store.scaleFormula;
    
    var steps = 0;

    scaleFormula.forEach((step) => {
        scaleNotes.push(guitar.notes.sharps[(parseInt(store.key) + steps) % 12]);
        steps += step;
    })

    return scaleNotes;
}