import guitar from '../config/guitar';

export const getNoteFromFretboard = (m, n, tuning) => {
    var stringNote = tuning[m];

    return guitar.notes.sharps[(stringNote + n) % 12];
};

