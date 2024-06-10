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
  "intervalMap": {
    "1": "root",
    "2": "second",
    "b3": "minor third",
    "3": "major third",
    "4": "fourth",
    "#4": "augmented fourth",
    "5": "fifth",
    "b5": "diminished fifth",
    "b6": "minor sixth",
    "6": "sixth",
    "7": "seventh",
    "b7": "minor seventh",
    "b9": "flat ninth",
    "9": "ninth",
    "#9": "sharp ninth",
    "11": "eleventh",
    "#11": "sharp eleventh",
    "13": "thirteenth"
  },
  "scales": {
    "major": {
      "name": "Major",
      "degree": "Major",
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
    "minor": {
      "name": "Minor",
      "degree": "Minor",
      "formula": [2, 1, 2, 2, 1, 2, 2],
      "intervals": ["1", "2", "b3", "4", "5", "b6", "b7"],
      "isModal": false,
    },
    "harmonic": {
      "name": "Harmonic",
      "degree": "Minor",
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
      "degree": "Minor",
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
      "degree": "Minor",
      "isModal": false,
      "intervals": ["1", "b3", "4", "b5", "5", "b7"],
      "formula": [3, 2, 2, 3, 2]
    },
    "blues-major": {
      "name": "Blues major",
      "degree": "Major",
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
      "degree": "Major",
      "matchingScale": "Ionian",
      "cagedShapes": {
        "C": [null, 3, 2, 0, 1, 0],
        "A": [null, 0, 2, 2, 2, 0],
        "G": [3, 2, 0, 0, 3, 3],
        "E": [0, 2, 2, 1, 0, 0],
        "D": [null, null, 0, 2, 3, 2]
      }
    },
    "m": {
      "name": "Minor",
      "formula": [3, 4, 5],
      "intervals": ["1", "b3", "5"],
      "quality": "Minor",
      "degree": "Minor",
      "matchingScale": "minor",
      "cagedShapes": {
        "C": [null, 3, 1, 0, 1, null],
        "A": [null, 0, 2, 2, 1, 0],
        "G": [3, 1, 0, 0, 3, 3],
        "E": [0, 2, 2, 0, 0, 0],
        "D": [null, null, 0, 2, 3, 1]
      }
    },
    "aug": {
      "name": "Augmented",
      "intervals": ["1", "3", "#5"],
      "formula": [4, 4, 4],
      "quality": "Augmented",
      "degree": "Major",
      "matchingScale": "Ionian augmented",
      "cagedShapes": {
        "C": [null, 3, 2, 1, 1, 0],
        "A": [null, 0, 3, 2, 2, 1],
        "G": [3, 2, 1, 0, 0, 3],
        "E": [0, 3, 2, 1, 1, 0],
        "D": [null, null, 0, 3, 2, 1]
      }
    },
    "dim": {
      "name": "Diminished",
      "intervals": ["1", "b3", "b5"],
      "formula": [3, 3, 3],
      "quality": "Diminished",
      "degree": "Minor",
      "matchingScale": "Ultra locrian",
      "cagedShapes": {
        "C": [null, 3, 1, 2, 1, 0],
        "A": [null, 0, 1, 2, 1, 0],
        "G": [3, 1, 0, 3, 0, 1],
        "E": [0, 1, 2, 0, 1, 0],
        "D": [null, null, 0, 1, 3, 1]
      }
    },
    "sus2": {
      "name": "sus2",
      "intervals": ["1", "2", "5"],
      "formula": [5, 2, 5],
      "quality": "Suspended",
      "degree": "Major",
      "matchingScale": "Ionian",
      "cagedShapes": {
        "C": [null, 3, 0, 0, 3, 3],
        "A": [null, 0, 2, 2, 0, 0],
        "G": [3, 0, 0, 0, 3, 3],
        "E": [0, 2, 4, 4, 0, 0],
        "D": [null, null, 0, 2, 3, 0]
      }
    },
    "sus4": {
      "name": "sus4",
      "intervals": ["1", "4", "5"],
      "formula": [2, 5, 5],
      "quality": "Suspended",
      "degree": "Major",
      "matchingScale": "Ionian",
      "cagedShapes": {
        "C": [null, 3, 3, 0, 1, 1],
        "A": [null, 0, 2, 2, 3, 0],
        "G": [3, 0, 0, 0, 1, 3],
        "E": [0, 2, 2, 2, 0, 0],
        "D": [null, null, 0, 2, 3, 3]
      }
    },
    "add4": {
      "name": "add4",
      "intervals": ["1", "3", "4", "5"],
      "formula": [4, 1, 2, 2],
      "quality": "Added Tone",
      "degree": "Major",
      "matchingScale": "Ionian",
      "cagedShapes": {
        "C": [null, 3, 2, 0, 1, 3],
        "A": [null, 0, 2, 2, 2, 3],
        "G": [3, 2, 0, 0, 3, 3],
        "E": [0, 2, 1, 2, 0, 0],
        "D": [null, null, 0, 2, 3, 3]
      }
    },
    "add2": {
      "name": "add2",
      "intervals": ["1", "2", "3", "5"],
      "formula": [2, 2, 3, 3],
      "quality": "Added Tone",
      "degree": "Major",
      "matchingScale": "Ionian",
      "cagedShapes": {
        "C": [null, 3, 2, 0, 3, 0],
        "A": [null, 0, 2, 2, 2, 0],
        "G": [3, 0, 0, 0, 0, 3],
        "E": [0, 2, 2, 1, 2, 0],
        "D": [null, null, 0, 2, 3, 2]
      }
    },
    "6": {
      "name": "6th",
      "intervals": ["1", "3", "5", "6"],
      "formula": [4, 3, 2, 3],
      "quality": "Major",
      "degree": "Major",
      "matchingScale": "Ionian",
      "cagedShapes": {
        "C": [null, 3, 2, 2, 3, 0],
        "A": [null, 0, 2, 2, 2, 2],
        "G": [3, 2, 0, 0, 0, 0],
        "E": [0, 2, 2, 1, 2, 0],
        "D": [null, null, 0, 2, 3, 0]
      }
    },
    "min6": {
      "name": "Minor 6th",
      "intervals": ["1", "b3", "5", "6"],
      "formula": [3, 4, 2, 3],
      "quality": "Minor",
      "degree": "Minor",
      "matchingScale": "Melodic minor",
      "cagedShapes": {
        "C": [null, 3, 1, 2, 3, 0],
        "A": [null, 0, 2, 2, 1, 2],
        "G": [3, 1, 0, 0, 0, 0],
        "E": [0, 2, 2, 0, 2, 0],
        "D": [null, null, 0, 2, 0, 1]
      }
    },
    "minb6": {
      "name": "Minor b6th",
      "intervals": ["1", "b3", "5", "b6"],
      "formula": [3, 4, 1, 4],
      "quality": "Minor",
      "degree": "Minor",
      "matchingScale": "Harmonic minor",
      "cagedShapes": {
        "C": [null, 3, 1, 1, 3, 0],
        "A": [null, 0, 2, 1, 1, 2],
        "G": [3, 1, 0, 0, 0, 1],
        "E": [0, 2, 1, 0, 2, 0],
        "D": [null, null, 0, 2, 0, 2]
      }
    },
    "M7": {
      "name": "Major 7th",
      "formula": [4, 3, 4, 1],
      "intervals": ["1", "3", "5", "7"],
      "quality": "Major",
      "degree": "Major",
      "matchingScale": "Ionian",
      "cagedShapes": {
        "C": [null, 3, 2, 0, 0, 0],
        "A": [null, 0, 2, 1, 2, 0],
        "G": [3, 2, 0, 0, 0, 2],
        "E": [0, 2, 1, 1, 0, 0],
        "D": [null, null, 0, 2, 2, 2]
      }
    },
    "M7b5": {
      "name": "Major 7b5",
      "formula": [4, 2, 5, 1],
      "intervals": ["1", "3", "b5", "7"],
      "quality": "Other",
      "degree": "Major",
      "matchingScale": "Ionian augmented",
      "cagedShapes": {
        "C": [null, 3, 2, 0, 1, 0],
        "A": [null, 0, 1, 1, 2, 0],
        "G": [3, 2, 0, 0, 0, 1],
        "E": [0, 1, 1, 1, 0, 0],
        "D": [null, null, 0, 1, 2, 1]
      }
    },
    "m7": {
      "name": "Minor 7th",
      "formula": [3, 4, 3, 2],
      "intervals": ["1", "b3", "5", "b7"],
      "quality": "Minor",
      "degree": "Minor",
      "matchingScale": "Dorian",
      "cagedShapes": {
        "C": [null, 3, 1, 3, 1, null],
        "A": [null, 0, 2, 0, 1, 0],
        "G": [3, 1, 3, 0, null, null],
        "E": [0, 2, 0, 0, 0, 0],
        "D": [null, null, 0, 2, 1, 1]
      }
    },
    "m7b5": {
      "name": "Minor 7b5",
      "intervals": ["1", "b3", "b5", "b7"],
      "formula": [3, 3, 4, 2],
      "quality": "Diminished",
      "degree": "Minor",
      "matchingScale": "Locrian",
      "cagedShapes": {
        "C": [null, 3, 1, 3, 1, 2],
        "A": [null, 0, 1, 0, 1, 0],
        "G": [3, 1, 0, 3, 0, 1],
        "E": [0, 1, 0, 0, 1, 0],
        "D": [null, null, 0, 1, 1, 1]
      }
    },
    "7": {
      "name": "Dominant 7th",
      "formula": [4, 3, 3, 2],
      "intervals": ["1", "3", "5", "b7"],
      "quality": "Dominant",
      "degree": "Major",
      "matchingScale": "Mixolydian",
      "cagedShapes": {
        "C": [null, 3, 2, 3, 1, 0],
        "A": [null, 0, 2, 0, 2, 0],
        "G": [3, 2, 0, 0, 0, 1],
        "E": [0, 2, 0, 1, 0, 0],
        "D": [null, null, 0, 2, 1, 2]
      }
    },
    "9": {
      "name": "9th",
      "intervals": ["1", "3", "5", "b7", "9"],
      "formula": [4, 3, 3, 2, 4],
      "quality": "Dominant",
      "degree": "Major",
      "matchingScale": "Mixolydian",
      "cagedShapes": {
        "C": [null, 3, 2, 3, 3, 0],
        "A": [null, 0, 2, 4, 2, 4],
        "G": [3, 0, 0, 0, 0, 1],
        "E": [0, 2, 0, 1, 0, 2],
        "D": [null, 5, 4, 5, 5, 0]
      }
    },
    "11": {
      "name": "11th",
      "intervals": ["1", "3", "5", "b7", "9", "11"],
      "formula": [4, 3, 3, 2, 4, 5],
      "quality": "Dominant",
      "degree": "Major",
      "matchingScale": "Mixolydian",
      "cagedShapes": {
        "C": [null, 3, 2, 3, 3, 0],
        "A": [null, 0, 2, 4, 2, 5],
        "G": [3, 0, 0, 0, 0, 1],
        "E": [0, 2, 0, 1, 0, 2],
        "D": [null, 5, 4, 5, 5, 7]
      }
    },
    "13": {
      "name": "13th",
      "intervals": ["1", "3", "5", "b7", "9", "13"],
      "formula": [4, 3, 3, 2, 4, 9],
      "quality": "Dominant",
      "degree": "Major",
      "matchingScale": "Mixolydian",
      "cagedShapes": {
        "C": [null, 3, 2, 3, 5, 0],
        "A": [null, 0, 2, 4, 2, 5],
        "G": [3, 0, 0, 0, 0, 1],
        "E": [0, 2, 0, 1, 0, 2],
        "D": [null, 5, 4, 5, 5, 7]
      }
    },
    "minMaj7": {
      "name": "Minor Major 7th",
      "intervals": ["1", "b3", "5", "7"],
      "formula": [3, 4, 4, 4],
      "quality": "Minor",
      "degree": "Minor",
      "matchingScale": "Melodic minor",
      "cagedShapes": {
        "C": [null, 3, 1, 3, 2, 0],
        "A": [null, 0, 2, 1, 1, 0],
        "G": [3, 1, 0, 0, 0, 2],
        "E": [0, 2, 1, 1, 0, 0],
        "D": [null, null, 0, 2, 2, 1]
      }
    },
    "dim7": {
      "name": "Diminished 7th",
      "intervals": ["1", "b3", "b5", "bb7"],
      "formula": [3, 3, 3, 3],
      "quality": "Diminished",
      "degree": "Minor",
      "matchingScale": "Ultra locrian",
      "cagedShapes": {
        "C": [null, 3, 1, 2, 1, 2],
        "A": [null, 0, 1, 0, 1, 0],
        "G": [3, 1, 0, 3, 0, 1],
        "E": [0, 1, 2, 0, 1, 0],
        "D": [null, null, 0, 1, 3, 1]
      }
    },
    "7#5": {
      "name": "Dominant 7#5",
      "intervals": ["1", "3", "#5", "b7"],
      "formula": [4, 4, 2, 2],
      "quality": "Dominant",
      "degree": "Major",
      "matchingScale": "Mixolydian augmented",
      "cagedShapes": {
        "C": [null, 3, 2, 3, 1, 4],
        "A": [null, 0, 3, 0, 2, 1],
        "G": [3, 2, 0, 4, 0, 1],
        "E": [0, 3, 0, 1, 0, 4],
        "D": [null, null, 0, 3, 3, 1]
      }
    },
    "7b5": {
      "name": "Dominant 7b5",
      "intervals": ["1", "3", "b5", "b7"],
      "formula": [4, 2, 5, 2],
      "quality": "Dominant",
      "degree": "Major",
      "matchingScale": "Mixolydian b5",
      "cagedShapes": {
        "C": [null, 3, 2, 3, 1, 2],
        "A": [null, 0, 1, 0, 2, 0],
        "G": [3, 2, 0, 3, 0, 1],
        "E": [0, 1, 0, 1, 0, 2],
        "D": [null, null, 0, 1, 1, 1]
      }
    }
  }
}
