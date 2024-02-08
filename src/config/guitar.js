// futher, derive everythings from one formula using intersection ? useful ?

const config = {
    "notes": {
        "sharps": [
            "C", // 0 - 0
            "C#", // 1 - 7 
            "D",  // 2 - 2
            "D#", // 3 - 9
            "E",  // 4 - 4
            "F",  // 5 - 11  
            "F#", // 6  "" - 6
            "G",  // 7 - 1
            "G#", // 8 - 8
            "A",  // 9 - 3
            "A#", // 10 - 10
            "B",  // 11 - 5
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
        {
            "key": "C",
            "relative": "Am"
        },
        {
            "key": "G",
            "relative": "Em"
        },
        {
            "key": "D",
            "relative": "Bm"
        },
        {
            "key": "A",
            "relative": "F#m"
        },
        {
            "key": "E",
            "relative": "C#m"
        },
        {
            "key": "B",
            "flat": "Cb",
            "relative": "G#m",
        },
        {
            "key": "Gb",
            "sharp": "F#",
            "relative": "F#m",
        },
        {
            "key": "Db", 
            "sharp": "C#",
            "relative": "A#m",
        },
        {
            "key": "Ab", 
            "relative": "Fm",
        },
        {
            "key": "Eb", 
            "relative": "Cm",
        },
        {
            "key": "Bb",
            "relative": "Gm"
        },
        {
            "key": "F",
            "relative": "Dm" 
        }
    ],
    "numberOfStrings": 6,
    "numberOfFrets": 25,
    "tuning": [
        4, 11, 7, 2, 9, 4
    ], // E, A, D, G, B, E standard tuning
    "shapes": {
        "names": [
            'C',
            'A',
            'G',
            'E',
            'D'
        ],
        "indexes": [
            {
                "start": 0,
                "end": 3
            },
            {
                "start": 2,
                "end": 6
            },
            
            {
                "start": 4,
                "end": 8
            },
            
            {
                "start": 7,
                "end": 10
            },
            
            {
                "start": 9,
                "end": 13
            }
        ]
    },
    "scales": {
        "major": {
            "name": "Major",
            "formula": [2, 2, 1, 2, 2, 2, 1],
            "intervals": ['1', '2', '3', '4', '5', '6', '7'],
            "isModal": true,
            "modes": [
                {
                    "name": "Ionian",
                    "intervals": ['1', '2', '3', '4', '5', '6', '7'] 
                },
                {
                    "name": "Dorian",
                    "intervals": ['1', '2', 'b3', '4', '5', '6', 'b7'] 
                },
                {
                    "name": "Phrygian",
                    "intervals": ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'] 
                },
                {
                    "name": "Lydian",
                    "intervals": ['1', '2', '3', '#4', '5', '6', '7'] 
                },
                {
                    "name": "Mixolydian",
                    "intervals": ['1', '2', '3', '4', '5', '6', 'b7'] 
                },
                {
                    "name": "Aeolioan",
                    "intervals": ['1', '2', 'b3', '4', '5', 'b6', 'b7'] 
                },
                {
                    "name": "Locrian",
                    "intervals": ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'] 
                },
            ]
        },
        "harmonic": {
            "name": "Harmonic",
            "formula": [2, 1, 2, 2, 1, 3, 1],
            "intervals": ['1', '2', 'b3', '4', '5', 'b6', '7'],
            "isModal": true,
            "modes": [
                {
                    "name": "Harmonic minor",
                    "intervals": ['1', '2', 'b3', '4', '5', 'b6', '7'] 
                },
                {
                    "name": "Locrian #6",
                    "intervals": ['1', 'b2', 'b3', '4', 'b5', '6', 'b7'] 
                },
                {
                    "name": "Ionian augmented",
                    "intervals": ['1', '2', '3', '#4', '5', '6', '7'] 
                },
                {
                    "name": "Romanian",
                    "intervals": ['1', '2', 'b3', '#4', '5', '6', '7'] 
                },
                {
                    "name": "Phrygian dominant",
                    "intervals": ['1', 'b2', '3', '4', '5', 'b6', 'b7'] 
                },
                {
                    "name": "Lydian #2",
                    "intervals": ['1', '#2', '3', '#4', '5', '6', '7'] 
                },
                {
                    "name": "Ultra locrian",
                    "intervals": ['1', 'b2', 'b3', 'b4', 'b5', 'b6', 'bb7'] 
                },
            ]
        },
        "melodic": {
            "name": "Melodic",
            "formula": [2, 1, 2, 2, 2, 2, 1],
            "intervals": ['1', '2', 'b3', '4', '5', '6', '7'],
            "isModal": true,
            "modes": [
                {
                    "name": "Melodic minor",
                    "intervals": ['1', '2', 'b3', '4', '5', '6', '7'] 
                },
                {
                    "name": "Javanese",
                    "intervals": ['1', 'b2', 'b3', '4', '5', '6', 'b7'] 
                },
                {
                    "name": "Lydian augmented",
                    "intervals": ['1', '2', 'b', '#4', '#5', '6', '7'] 
                },
                {
                    "name": "Lydian dominant",
                    "intervals": ['1', '2', '3', '#4', '5', '6', '7'] 
                },
                {
                    "name": "Hindu",
                    "intervals": ['1', '2', 'b3', '4', '5', '6', '7'] 
                },
                {
                    "name": "Locrian #2",
                    "intervals": ['1', '2', 'b3', '4', 'b5', 'b6', 'b7'] 
                },
                {
                    "name": "Super locrian",
                    "intervals": ['1', 'b2', 'b3', '3', 'b5', 'b6', 'b7'] 
                },
            ]
        },
        "blues-minor":{
            "name": "Blues minor",
            "isModal": false,
            "intervals": ['1', 'b3', '4', 'b5', '5', 'b7'],
            "formula": [3, 2, 2, 3, 2],
        },
        "blues-major":{
            "name": "Blues major",
            "formula": [2, 2, 3, 2, 3],
            "isModal": false,
            "intervals": ['1', '2', 'b3', '3', '5', '6'],

        }
    },
    "arppegios": {
        "M": {
          "name": "Major",
          "formula": [4, 3, 4],
          "intervals": ["1", "3", "5"],
          "quality": "Major"
        },
        "m": {
          "name": "Minor",
          "formula": [3, 4, 5],
          "intervals": ["1", "b3", "5"],
          "quality": "Minor"
        },
        "aug": {
          "name": "Augmented",
          "intervals": ["1", "3", "#5"],
          "formula": [4, 4, 4],
          "quality": "Augmented"
        },
        "dim": {
          "name": "Diminished",
          "intervals": ["1", "b3", "b5"],
          "formula": [3, 3, 3],
          "quality": "Diminished"
        },
        "sus2": {
          "name": "sus2",
          "intervals": ["1", "2", "b5"],
          "formula": [5, 2, 5],
          "quality": "Suspended"
        },
        "sus4": {
          "name": "sus4",
          "intervals": ["1", "4", "5"],
          "formula": [2, 5, 5],
          "quality": "Suspended"
        },
        "add4": {
          "name": "add4",
          "intervals": ["1", "3", "4", "5"],
          "formula": [4, 1, 2, 2],
          "quality": "Added Tone"
        },
        "add2": {
          "name": "add2",
          "intervals": ["1", "2", "3", "5"],
          "formula": [2, 2, 3, 3],
          "quality": "Added Tone"
        },
        "6": {
          "name": "6th",
          "intervals": ["1", "3", "5", "6"],
          "formula": [4, 3, 2, 3],
          "quality": "Major"
        },
        "min6": {
          "name": "Minor 6th",
          "intervals": ["1", "b3", "5", "6"],
          "formula": [3, 4, 2, 3],
          "quality": "Minor"
        },
        "minb6": {
          "name": "Minor b6th",
          "intervals": ["1", "b3", "5", "b6"],
          "formula": [3, 4, 1, 4],
          "quality": "Minor"
        },
        "M7": {
          "name": "Major 7th",
          "formula": [4, 3, 4, 1],
          "intervals": ["1", "3", "5", "7"],
          "quality": "Major"
        },
        "M7b5": {
          "name": "Major 7b5",
          "formula": [4, 2, 5, 1],
          "intervals": ["1", "3", "b5", "7"],
          "quality": "Other"
        },
        "m7": {
          "name": "Minor 7th",
          "formula": [3, 4, 3, 2],
          "intervals": ["1", "b3", "5", "b7"],
          "quality": "Minor"
        },
        "7": {
          "name": "Dominant 7th",
          "formula": [4, 3, 3, 2],
          "intervals": ["1", "3", "5", "b7"],
          "quality": "Dominant"
        },
        "minMaj7": {
          "name": "Minor Major 7th",
          "intervals": ["1", "b3", "5", "7"],
          "formula": [3, 4, 4, 4],
          "quality": "Minor"
        },
    }
}

export default config;