import guitar from '../config/guitar';

export const getNoteFromFretboard = (m, n, tuning) => {
    var stringNote = tuning[m];

    console.log("tuning", tuning)

    return guitar.notes.sharps[(stringNote + n) % 12];
};

