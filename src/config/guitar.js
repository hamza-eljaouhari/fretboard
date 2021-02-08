// futher, derive everythings from one formula using intersection ? useful ?

const config = {
    "notes": {
        "sharps": [
            "C", 
            "C#",
            "D", 
            "D#",
            "E",
            "F", 
            "F#",
            "G", // 2
            "G#",
            "A", // 1
            "A#",// 
            "B",
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
    "numberOfStrings": 6,
    "numberOfFrets": 24,
    "tuning": [
        4, 11, 7, 2, 9, 4
    ], // E, A, D, G, B, E standard tuning
    "scales": {
        "major": {
            "name": "Major scale",
            "formula": [2, 2, 1, 2, 2, 2, 1],
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
            "name": "Harmonic scale",
            "formula": [2, 1, 2, 2, 1, 3, 1],
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
            "name": "Melodic scale",
            "formula": [2, 1, 2, 2, 2, 2, 1],
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
    "chords": {

    },
    "arppegios": {
        "M7": {
            "formula": [4, 3, 4, 1],
            "intervals": ['1', '3', '5', '7']
        },
        "minor": {
            "formula": [3, 4, 5],
            "intervals": ['1', 'b3', '5']
        },
        "m7": {
            "formula": [3, 4, 4, 2],
            "intervals": ['1', 'b3', '5', 'b7']
        },
        "7": {
            "formula": [4, 3, 3, 2],
            "intervals": ['1', '3', '5', 'b7']
        },
        "D13th": {
            "intervals": ['1', '3', '6', 'b7'],
            "formula": [2, 2, 5, 1, 2]
        },
        "M": {
            "formula": [4, 3, 4],
            "intervals": ['1', '3', '5']
        },
        "M9th": {
            "formula": [2, 2, 3, 4, 1],
            "intervals": ['1', '9', '3', '5', '7']
        },
        "D7b5": {
            "formula": [4, 2, 4, 2],
            "intervals": ['1', '3', 'b5', 'b7']
        },
        "m9th": {
            "formula": [2, 1, 4, 3],
            "intervals": ['1', '9', 'b3', 'b7']
        },
    }
}

export default config;