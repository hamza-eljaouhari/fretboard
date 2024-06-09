import guitar from '../config/guitar';

export const getNoteFromFretboard = (m, n, tuning) => {
    var stringNote = tuning[m];

    return guitar.notes.sharps[(stringNote + n) % 12];
};

export function getChordIntervals(cagedShape, chordDegree, rootNote) {
    const { intervals, formula } = guitar.arppegios[chordDegree];
    const rootIndex = guitar.notes.sharps.indexOf(rootNote);
  
    let mappedIntervals = [];
    let currentNote = rootIndex;
  
    for (let fret of cagedShape) {
        if (fret !== null) {
            let mappedNote = (currentNote + fret) % 12;
            let noteName = guitar.notes.sharps[mappedNote];
  
            // Determine the interval
            let intervalName = null;
            if (mappedNote === rootIndex) {
                intervalName = "1";
            } else {
                let totalSemitones = 0;
                for (let i = 0; i < formula.length; i++) {
                    totalSemitones += formula[i];
                    if (mappedNote === (rootIndex + totalSemitones) % 12) {
                        intervalName = intervals[i];
                        break;
                    }
                }
            }
  
            mappedIntervals.push({ noteName, intervalName });
        } else {
            mappedIntervals.push({ noteName: null, intervalName: null });
        }
    }
  
    return mappedIntervals;
  }