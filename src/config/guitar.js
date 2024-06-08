export default {
    "notes": {
        "sharps": [
            "C", // 0
            "C#", // 1
            "D",  // 2
            "D#", // 3
            "E",  // 4
            "F",  // 5
            "F#", // 6
            "G",  // 7
            "G#", // 8
            "A",  // 9
            "A#", // 10
            "B"  // 11
        ],
        "flats": [
            "C",
            "Db",
            "D",
            "Eb",
            "E",
            "F",
            "Gb",
            "G",
            "Ab",
            "A",
            "Bb",
            "B"
        ]
    },
    "circleOfFifths": [
        { "key": "C", "relative": "Am" },
        { "key": "G", "relative": "Em" },
        { "key": "D", "relative": "Bm" },
        { "key": "A", "relative": "F#m" },
        { "key": "E", "relative": "Dbm" },
        { "key": "B", "flat": "Cb", "relative": "Abm" },
        { "key": "Gb", "sharp": "F#", "relative": "Gbm" },
        { "key": "Db", "sharp": "C#", "relative": "Bbm" },
        { "key": "Ab", "relative": "Fm" },
        { "key": "Eb", "relative": "Cm" },
        { "key": "Bb", "relative": "Gm" },
        { "key": "F", "relative": "Dm" }
    ],
    "numberOfStrings": 6,
    "numberOfFrets": 25,
    "tuning": [4, 11, 7, 2, 9, 4], // E, A, D, G, B, E standard tuning
    "shapes": {
        "names": ["C", "A", "G", "E", "D"],
        "intervals": [0, 3, 5, 8, 10, 12],
        "indexes": [
            { "start": 0, "end": 3 },
            { "start": 2, "end": 6 },
            { "start": 4, "end": 8 },
            { "start": 7, "end": 10 },
            { "start": 9, "end": 13 }
        ]
    },
    "scales": {
        "major": {
            "name": "Major",
            "formula": [2, 2, 1, 2, 2, 2, 1],
            "intervals": ["1", "2", "3", "4", "5", "6", "7"],
            "isModal": true,
            "modes": [
                { "name": "Ionian", "intervals": ["1", "2", "3", "4", "5", "6", "7"] },
                { "name": "Dorian", "intervals": ["1", "2", "b3", "4", "5", "6", "b7"] },
                { "name": "Phrygian", "intervals": ["1", "b2", "b3", "4", "5", "b6", "b7"] },
                { "name": "Lydian", "intervals": ["1", "2", "3", "#4", "5", "6", "7"] },
                { "name": "Mixolydian", "intervals": ["1", "2", "3", "4", "5", "6", "b7"] },
                { "name": "Aeolian", "intervals": ["1", "2", "b3", "4", "5", "b6", "b7"] },
                { "name": "Locrian", "intervals": ["1", "b2", "b3", "4", "b5", "b6", "b7"] }
            ]
        },
        "harmonic": {
            "name": "Harmonic",
            "formula": [2, 1, 2, 2, 1, 3, 1],
            "intervals": ["1", "2", "b3", "4", "5", "b6", "7"],
            "isModal": true,
            "modes": [
                { "name": "Harmonic minor", "intervals": ["1", "2", "b3", "4", "5", "b6", "7"] },
                { "name": "Locrian #6", "intervals": ["1", "b2", "b3", "4", "b5", "6", "b7"] },
                { "name": "Ionian augmented", "intervals": ["1", "2", "3", "#4", "5", "6", "7"] },
                { "name": "Romanian", "intervals": ["1", "2", "b3", "#4", "5", "6", "7"] },
                { "name": "Phrygian dominant", "intervals": ["1", "b2", "3", "4", "5", "b6", "b7"] },
                { "name": "Lydian #2", "intervals": ["1", "#2", "3", "#4", "5", "6", "7"] },
                { "name": "Ultra locrian", "intervals": ["1", "b2", "b3", "b4", "b5", "b6", "bb7"] }
            ]
        },
        "melodic": {
            "name": "Melodic",
            "formula": [2, 1, 2, 2, 2, 2, 1],
            "intervals": ["1", "2", "b3", "4", "5", "6", "7"],
            "isModal": true,
            "modes": [
                { "name": "Melodic minor", "intervals": ["1", "2", "b3", "4", "5", "6", "7"] },
                { "name": "Javanese", "intervals": ["1", "b2", "b3", "4", "5", "6", "b7"] },
                { "name": "Lydian augmented", "intervals": ["1", "2", "b", "#4", "#5", "6", "7"] },
                { "name": "Lydian dominant", "intervals": ["1", "2", "3", "#4", "5", "6", "7"] },
                { "name": "Hindu", "intervals": ["1", "2", "b3", "4", "5", "6", "7"] },
                { "name": "Locrian #2", "intervals": ["1", "2", "b3", "4", "b5", "b6", "b7"] },
                { "name": "Super locrian", "intervals": ["1", "b2", "b3", "3", "b5", "b6", "b7"] }
            ]
        },
        "blues-minor": {
            "name": "Blues minor",
            "isModal": false,
            "intervals": ["1", "b3", "4", "b5", "5", "b7"],
            "formula": [3, 2, 2, 3, 2]
        },
        "blues-major": {
            "name": "Blues major",
            "formula": [2, 2, 3, 2, 3],
            "isModal": false,
            "intervals": ["1", "2", "b3", "3", "5", "6"]
        }
    },
    "cagedIntervals": [0, 3, 5], 
    "arppegios": {
        "M": {
            "name": "Major",
            "formula": [4, 3, 4],
            "intervals": ["1", "3", "5"],
            "quality": "Major",
            "cagedShapes": {
                "C": [null, 3, 2, 0, 1, 0], // C Major chord in open position
                "A": [null, 0, 2, 2, 2, 0], // A Major chord in open position
                "G": [3, 2, 0, 0, 3, 3],    // G Major chord in open position
                "E": [0, 2, 2, 1, 0, 0],    // E Major chord in open position
                "D": [null, null, 0, 2, 3, 2] // D Major chord in open position
            }
        },
        "m": {
            "name": "Minor",
            "formula": [3, 4, 5],
            "intervals": ["1", "b3", "5"],
            "quality": "Minor",
            "cagedShapes": {
                "C": [null, 3, 1, 0, 1, 0], // C Minor chord in open position
                "A": [null, 0, 2, 2, 1, 0], // A Minor chord in open position
                "G": [3, 1, 0, 0, 0, 3],    // G Minor chord in open position
                "E": [0, 2, 2, 0, 0, 0],    // E Minor chord in open position
                "D": [null, null, 0, 2, 3, 1] // D Minor chord in open position
            }
        },
        "aug": {
            "name": "Augmented",
            "intervals": ["1", "3", "#5"],
            "formula": [4, 4, 4],
            "quality": "Augmented",
            "cagedShapes": {
                "C": [null, 3, 2, 1, 1, 0], // C Augmented chord in open position
                "A": [null, 0, 3, 2, 2, 1], // A Augmented chord in open position
                "G": [3, 2, 1, 0, 0, 3],    // G Augmented chord in open position
                "E": [0, 3, 2, 1, 1, 0],    // E Augmented chord in open position
                "D": [null, null, 0, 3, 2, 1] // D Augmented chord in open position
            }
        },
        "dim": {
            "name": "Diminished",
            "intervals": ["1", "b3", "b5"],
            "formula": [3, 3, 3],
            "quality": "Diminished",
            "cagedShapes": {
                "C": [null, 3, 1, 2, 1, 0], // C Diminished chord in open position
                "A": [null, 0, 1, 2, 1, 0], // A Diminished chord in open position
                "G": [3, 1, 0, 3, 0, 1],    // G Diminished chord in open position
                "E": [0, 1, 2, 0, 1, 0],    // E Diminished chord in open position
                "D": [null, null, 0, 1, 3, 1] // D Diminished chord in open position
            }
        },
        "sus2": {
            "name": "sus2",
            "intervals": ["1", "2", "5"],
            "formula": [5, 2, 5],
            "quality": "Suspended",
            "cagedShapes": {
                "C": [null, 3, 0, 0, 3, 3], // C sus2 chord in open position
                "A": [null, 0, 2, 2, 0, 0], // A sus2 chord in open position
                "G": [3, 0, 0, 0, 3, 3],    // G sus2 chord in open position
                "E": [0, 2, 4, 4, 0, 0],    // E sus2 chord in open position
                "D": [null, null, 0, 2, 3, 0] // D sus2 chord in open position
            }
        },
        "sus4": {
            "name": "sus4",
            "intervals": ["1", "4", "5"],
            "formula": [2, 5, 5],
            "quality": "Suspended",
            "cagedShapes": {
                "C": [null, 3, 3, 0, 1, 1], // C sus4 chord in open position
                "A": [null, 0, 2, 2, 3, 0], // A sus4 chord in open position
                "G": [3, 0, 0, 0, 1, 3],    // G sus4 chord in open position
                "E": [0, 2, 2, 2, 0, 0],    // E sus4 chord in open position
                "D": [null, null, 0, 2, 3, 3] // D sus4 chord in open position
            }
        },
        "add4": {
            "name": "add4",
            "intervals": ["1", "3", "4", "5"],
            "formula": [4, 1, 2, 2],
            "quality": "Added Tone",
            "cagedShapes": {
                "C": [null, 3, 2, 0, 1, 3], // C add4 chord in open position
                "A": [null, 0, 2, 2, 2, 3], // A add4 chord in open position
                "G": [3, 2, 0, 0, 3, 3],    // G add4 chord in open position
                "E": [0, 2, 1, 2, 0, 0],    // E add4 chord in open position
                "D": [null, null, 0, 2, 3, 3] // D add4 chord in open position
            }
        },
        "add2": {
            "name": "add2",
            "intervals": ["1", "2", "3", "5"],
            "formula": [2, 2, 3, 3],
            "quality": "Added Tone",
            "cagedShapes": {
                "C": [null, 3, 2, 0, 3, 0], // C add2 chord in open position
                "A": [null, 0, 2, 2, 2, 0], // A add2 chord in open position
                "G": [3, 0, 0, 0, 0, 3],    // G add2 chord in open position
                "E": [0, 2, 2, 1, 2, 0],    // E add2 chord in open position
                "D": [null, null, 0, 2, 3, 2] // D add2 chord in open position
            }
        },
        "6": {
            "name": "6th",
            "intervals": ["1", "3", "5", "6"],
            "formula": [4, 3, 2, 3],
            "quality": "Major",
            "cagedShapes": {
                "C": [null, 3, 2, 2, 3, 0], // C 6th chord in open position
                "A": [null, 0, 2, 2, 2, 2], // A 6th chord in open position
                "G": [3, 2, 0, 0, 0, 0],    // G 6th chord in open position
                "E": [0, 2, 2, 1, 2, 0],    // E 6th chord in open position
                "D": [null, null, 0, 2, 3, 0] // D 6th chord in open position
            }
        },
        "min6": {
            "name": "Minor 6th",
            "intervals": ["1", "b3", "5", "6"],
            "formula": [3, 4, 2, 3],
            "quality": "Minor",
            "cagedShapes": {
                "C": [null, 3, 1, 2, 3, 0], // C Minor 6th chord in open position
                "A": [null, 0, 2, 2, 1, 2], // A Minor 6th chord in open position
                "G": [3, 1, 0, 0, 0, 0],    // G Minor 6th chord in open position
                "E": [0, 2, 2, 0, 2, 0],    // E Minor 6th chord in open position
                "D": [null, null, 0, 2, 0, 1] // D Minor 6th chord in open position
            }
        },
        "minb6": {
            "name": "Minor b6th",
            "intervals": ["1", "b3", "5", "b6"],
            "formula": [3, 4, 1, 4],
            "quality": "Minor",
            "cagedShapes": {
                "C": [null, 3, 1, 1, 3, 0], // C Minor b6th chord in open position
                "A": [null, 0, 2, 1, 1, 2], // A Minor b6th chord in open position
                "G": [3, 1, 0, 0, 0, 1],    // G Minor b6th chord in open position
                "E": [0, 2, 1, 0, 2, 0],    // E Minor b6th chord in open position
                "D": [null, null, 0, 2, 0, 2] // D Minor b6th chord in open position
            }
        },
        "M7": {
            "name": "Major 7th",
            "formula": [4, 3, 4, 1],
            "intervals": ["1", "3", "5", "7"],
            "quality": "Major",
            "cagedShapes": {
                "C": [null, 3, 2, 0, 0, 0], // C Major 7th chord in open position
                "A": [null, 0, 2, 1, 2, 0], // A Major 7th chord in open position
                "G": [3, 2, 0, 0, 0, 2],    // G Major 7th chord in open position
                "E": [0, 2, 1, 1, 0, 0],    // E Major 7th chord in open position
                "D": [null, null, 0, 2, 2, 2] // D Major 7th chord in open position
            }
        },
        "M7b5": {
            "name": "Major 7b5",
            "formula": [4, 2, 5, 1],
            "intervals": ["1", "3", "b5", "7"],
            "quality": "Other",
            "cagedShapes": {
                "C": [null, 3, 2, 0, 1, 0], // C Major 7b5 chord in open position
                "A": [null, 0, 1, 1, 2, 0], // A Major 7b5 chord in open position
                "G": [3, 2, 0, 0, 0, 1],    // G Major 7b5 chord in open position
                "E": [0, 1, 1, 1, 0, 0],    // E Major 7b5 chord in open position
                "D": [null, null, 0, 1, 2, 1] // D Major 7b5 chord in open position
            }
        },
        "m7": {
            "name": "Minor 7th",
            "formula": [3, 4, 3, 2],
            "intervals": ["1", "b3", "5", "b7"],
            "quality": "Minor",
            "cagedShapes": {
                "C": [null, 3, 1, 3, 1, 0], // C Minor 7th chord in open position
                "A": [null, 0, 2, 0, 1, 0], // A Minor 7th chord in open position
                "G": [3, 1, 0, 0, 0, 1],    // G Minor 7th chord in open position
                "E": [0, 2, 0, 0, 0, 0],    // E Minor 7th chord in open position
                "D": [null, null, 0, 2, 1, 1] // D Minor 7th chord in open position
            }
        },
        "7": {
            "name": "Dominant 7th",
            "formula": [4, 3, 3, 2],
            "intervals": ["1", "3", "5", "b7"],
            "quality": "Dominant",
            "cagedShapes": {
                "C": [null, 3, 2, 3, 1, 0], // C Dominant 7th chord in open position
                "A": [null, 0, 2, 0, 2, 0], // A Dominant 7th chord in open position
                "G": [3, 2, 0, 0, 0, 1],    // G Dominant 7th chord in open position
                "E": [0, 2, 0, 1, 0, 0],    // E Dominant 7th chord in open position
                "D": [null, null, 0, 2, 1, 2] // D Dominant 7th chord in open position
            }
        },
        "minMaj7": {
            "name": "Minor Major 7th",
            "intervals": ["1", "b3", "5", "7"],
            "formula": [3, 4, 4, 4],
            "quality": "Minor",
            "cagedShapes": {
                "C": [null, 3, 1, 3, 2, 0], // C Minor Major 7th chord in open position
                "A": [null, 0, 2, 1, 1, 0], // A Minor Major 7th chord in open position
                "G": [3, 1, 0, 0, 0, 2],    // G Minor Major 7th chord in open position
                "E": [0, 2, 1, 1, 0, 0],    // E Minor Major 7th chord in open position
                "D": [null, null, 0, 2, 2, 1] // D Minor Major 7th chord in open position
            }
        }
    }
}
