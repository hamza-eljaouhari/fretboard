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
    "intervals": [
        "1",
        "2",
        "b3",
        "3",
        "4",
        "5",
        "b6",
        "6",
        "b7",
        "7"
    ],
    "numberOfStrings": 6,
    "numberOfFrets": 24,
    "tuning": [
        4, 11, 7, 2, 9, 4
    ], // E, A, D, G, B, E standard tuning
    "scales": {
        "minor": {
            "formula": [2, 1, 2, 2, 1, 2, 2],
            "intervals": ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
            "triad": [0, 2, 4] // 1 3 5
        },
        "major": {
            "formula": [2, 2, 1, 2, 2, 2, 1],
            "modes": [
                "Inonian",
                "Dorian",
                "Phrygian",
                "Lydian",
                "Mixolydian",
                "Aeolian",
                "Locrian"
            ]
        },
        "harmonic": {
            "formula": [2, 1, 2, 2, 1, 3, 1],
            "modes": [
                "Harmonic minor",
                "Locrian #6",
                "Ionian augmented",
                "Romanian",
                "Phrygian dominant",
                "Lydian #2",
                "Ultra locrian"
            ]
        },
        "melodic": {
            "formula": [2, 1, 2, 2, 2, 2, 1],
            "modes": [
                "Melodic minor",
                "Javanese",
                "Lydian augmented",
                "Lydian dominant",
                "Hindu",
                "Locrian #2",
                "Super locrian"
            ]
        },
        "blues-minor":{
            "formula": [3, 2, 2, 3, 2],
            "modes": []
        },
        "blues-major":{
            "formula": [2, 2, 3, 2, 3],
            "modes": []
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