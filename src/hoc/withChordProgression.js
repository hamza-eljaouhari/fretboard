import React from 'react';
import { useDispatch } from 'react-redux';
import { setProgression } from '../redux/actions';

const withChordProgression = (WrappedComponent) => {
    return (props) => {
        const dispatch = useDispatch();
        const { progressions, selectedFretboard, selectedKey } = props;

        const addChordToProgression = () => {
            const { keySignature, chord, shape, fret } = selectedFretboard;
            if (!keySignature || !chord || (!shape && !fret)) return;
            const chordObject = {
                key: keySignature,
                chord,
                shape,
                fret: parseInt(fret, 10),
                highlighted: false,
                id: progressions.length + 1
            };
            const newChordProgression = [...progressions, chordObject];
            dispatch(setProgression(newChordProgression));
            localStorage.setItem('progression', JSON.stringify(newChordProgression));
        };

        const saveProgression = () => {
            if (progressions.length) {
                localStorage.setItem("progression", JSON.stringify(progressions));
            }
        };

        return (
            <WrappedComponent
                {...props}
                addChordToProgression={addChordToProgression}
                saveProgression={saveProgression}
            />
        );
    };
};

export default withChordProgression;
