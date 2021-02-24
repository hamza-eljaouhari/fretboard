import guitar from '../config/guitar';
import { getScale, getKey } from './selectors'

export const getNoteFromFretboard = (m, n) => {
    var stringNote = guitar.tuning[m];

    return guitar.notes.sharps[(stringNote + n) % 12];
};

