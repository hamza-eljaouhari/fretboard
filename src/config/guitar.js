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
        "major": {
            "intervals": [1, 3, 5],
        },
        "minor": {
            "formula": [],
            "intervals": []
        },
        "m7": {
            "intevals": [1, 3, 5, 7]
        },
        "7": {
            "intervals": [1, 3, 5, 7]
        },
    }
}

export default config;