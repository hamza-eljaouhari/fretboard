import React, { useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import Soundfont from 'soundfont-player';
import { updateStateProperty } from '../redux/actions';
import guitar from '../config/guitar';

const withPlayback = (WrappedComponent) => {
    return (props) => {
        const dispatch = useDispatch();
        const { selectedFretboard, progressions, selectedFretboardIndex } = props;

        const playProgression = useCallback(async (progression) => {
            for (let i = 0; i < progression.length; i++) {
                const { chord, shape, key, notes } = progression[i];
                dispatch(updateStateProperty(selectedFretboard.id, 'generalSettings.choice', 'chord'));
                dispatch(updateStateProperty(selectedFretboard.id, 'chordSettings.chord', chord));
                dispatch(updateStateProperty(selectedFretboard.id, 'chordSettings.shape', shape));
                dispatch(updateStateProperty(selectedFretboard.id, 'chordSettings.notes', notes));
                dispatch(updateStateProperty(selectedFretboard.id, 'keySettings.chord', key));
                displayChordPortion({ key, chord, shape });
                playSelectedNotes();
                await new Promise(r => setTimeout(r, 5000));
            }
        }, [dispatch, progressions, selectedFretboard, selectedFretboardIndex]);

        const playChordNotes = async () => {
            if (selectedFretboardIndex === -1) return;
            const guitarSound = await Soundfont.instrument(new AudioContext(), 'acoustic_guitar_nylon');
            const chordNotes = [];

            selectedFretboard.chordSettings.fretboard.forEach((string, stringIndex) => {
                string.forEach((note, fretIndex) => {
                    if (note.show) {
                        const noteIndex = (selectedFretboard.generalSettings.tuning[stringIndex] + fretIndex) % 12;
                        const displayedNote = guitar.notes.sharps[noteIndex];
                        const octave = calculateOctave(stringIndex, fretIndex, displayedNote);
                        const noteWithOctave = `${displayedNote}${octave}`;
                        chordNotes.push({ note: noteWithOctave, stringIndex, fretIndex });
                    }
                });
            });

            // Sort the notes by stringIndex and fretIndex
            chordNotes.sort((a, b) => {
                if (a.stringIndex === b.stringIndex) {
                    return a.fretIndex - b.fretIndex;
                }
                return a.stringIndex - b.stringIndex;
            });

            // Play each note individually
            for (let i = chordNotes.length - 1; i >= 0; i--) {
                const { note, stringIndex, fretIndex } = chordNotes[i];
                highlightNoteForDuration(stringIndex, fretIndex, 500);
                guitarSound.play(note);
                await new Promise(r => setTimeout(r, 500)); // Adjust delay as needed
            }

            // Play all notes together
            chordNotes.forEach(chordNote => guitarSound.play(chordNote.note));
        };

        const playSelectedNotes = async () => {
            const choice = selectedFretboard.generalSettings.choice;
            const choiceSettings = selectedFretboard[choice + 'Settings'];
            const selectedScale = selectedFretboard.scaleSettings.scale;
            const shape = selectedFretboard[choice + 'Settings'].shape;
            const scale = selectedFretboard[choice + 'Settings'].scale;
            let rootNoteIndex = 0;
            // Function to compute the cumulative intervals for each mode
            const computeModeOffsets = (formula) => {
                let offsets = [0];
                for (let i = 1; i < formula.length; i++) {
                    offsets.push((offsets[i - 1] + formula[i - 1]) % 12);
                }
                return offsets;
            };
    
            if (choice === 'scale') {
                const modeIndex = selectedFretboard.modeSettings.mode || 0;
                const selectedMode = guitar.scales[selectedScale].modes[modeIndex]// Default to Ionian if no mode is selected
                const scaleInfo = guitar.scales[selectedScale.toLowerCase()];
                const modeOffsets = computeModeOffsets(scaleInfo.formula);
                const modeOffset = modeOffsets[modeIndex];
                rootNoteIndex = (selectedFretboard.keySettings[selectedFretboard.generalSettings.choice] + modeOffset) % 12;
            } else if (choice === 'arppegio') {
                const arppegiokey = selectedFretboard.keySettings[choice];
                rootNoteIndex = arppegiokey
            }
    
            if (choice === 'chord') {
                await playChordNotes();
            } else {
                const isArpeggio = choice === 'arppegio';
    
                let selectedCagedShapes = [];
                if (!shape == choice == 'scale') {
                    selectedCagedShapes = guitar.scales[scale].indexes;
                } else if (!shape == choice == 'arppegio') {
                    selectedCagedShapes = guitar.shapes.indexes;
                } else if (shape && choice === 'scale') {
                    const shapeIndex = guitar.shapes.names.indexOf(shape);
                    const scaleIndexes = guitar.scales[scale].indexes;
                    selectedCagedShapes = [scaleIndexes[shapeIndex]];
                } else if (shape && choice === 'arppegio') {
                    const shapeIndex = guitar.shapes.names.indexOf(shape);
                    const arppegioIndexes = guitar.shapes.indexes[shapeIndex];
                    selectedCagedShapes = [arppegioIndexes];
                }
    
                let notesForShape = [];
    
                selectedCagedShapes.forEach((caged) => {
                    const notesInShape = [];
    
                    choiceSettings.fretboard.forEach((string, stringIndex) => {
                        for (let fretIndex = 0; fretIndex < string.length; fretIndex++) {
                            const note = string[fretIndex];
                            if (note.show) {
                                const displayedNote = note.current;
                                const octave = calculateOctave(stringIndex, fretIndex);
                                const noteWithOctave = `${displayedNote}${octave}`;
                                notesInShape.push({ note: noteWithOctave, stringIndex, fretIndex });
                            }
                        }
                    });
    
                    notesForShape.push(notesInShape);
                });
    
                for (const scopedNotes of notesForShape) {
                    if (scopedNotes.length > 0) {
                        // Find the lowest root note
                        const rootNote = scopedNotes.filter(n => n.note.startsWith(guitar.notes.sharps[rootNoteIndex]))
                            .sort((a, b) => b.stringIndex - a.stringIndex || a.fretIndex - b.fretIndex)[0];
    
                        // Sort notes by stringIndex descending and fretIndex ascending
                        scopedNotes.sort((a, b) => b.stringIndex - a.stringIndex || a.fretIndex - b.fretIndex);
    
                        const startNoteIndex = scopedNotes.indexOf(rootNote);
    
                        // Create the desired sequence starting and ending with the lowest root note
                        const downAfterRoot = scopedNotes.slice(startNoteIndex + 1);
                        const upScale = scopedNotes.slice().reverse();
                        const downBeforeRoot = scopedNotes.slice(0, startNoteIndex);
                        const fullSequence = [rootNote, ...downAfterRoot, ...upScale, ...downBeforeRoot, rootNote];
    
                        await playNotesWithinInterval(fullSequence);
                    }
                }
            }
        };
        
        const playNotesWithinInterval = async (notes) => {
            const guitarSound = await Soundfont.instrument(new AudioContext(), 'acoustic_guitar_nylon');
            for (let i = 0; i < notes.length; i++) {
                const { note, stringIndex, fretIndex } = notes[i];
                highlightNoteForDuration(stringIndex, fretIndex, 500);
                guitarSound.play(note);
                await new Promise(r => setTimeout(r, 500)); // Adjust delay as needed
            }
        };

        const highlightNoteForDuration = (stringIndex, fretIndex, duration) => {
            const noteElement = document.getElementById(`note-${selectedFretboardIndex}-${stringIndex}-${fretIndex}`);
            if (noteElement) {
                noteElement.classList.add('note-playing');
                setTimeout(() => {
                    noteElement.classList.remove('note-playing');
                }, duration);
            }
        };
        const calculateOctave = (stringIndex, fretIndex) => {
            const baseOctaves = selectedFretboard.generalSettings.baseOctaves;
            let octave = baseOctaves[stringIndex];
            const tuning = selectedFretboard.generalSettings.tuning;
            const notes = guitar.notes.sharps;

            // Calculate the number of half steps from the open string
            let halfSteps = (tuning[stringIndex] + fretIndex) % 12;
            let currentNoteIndex = tuning[stringIndex] % 12;

            // Loop through each fret and determine if we pass a B note
            for (let i = 0; i <= fretIndex; i++) {
                const note = notes[(currentNoteIndex + i) % 12];
                if (note === 'B') {
                    octave++;
                }
            }

            return octave;
        };

        const displayChordPortion = (chordObject, player) => {
            const { key, chord, shape, notes } = chordObject;
            const { choice } = selectedFretboard.generalSettings;
            const cagedShape = JSON.parse(JSON.stringify(guitar.arppegios[chord]?.cagedShapes[shape]));
    
            if (!cagedShape) return;
    
            const { formula } = guitar.arppegios[chord];
    
            // Calculate chord notes
            let currentNoteIndex = key;
            const chordNotes = [guitar.notes.sharps[currentNoteIndex]];
    
            formula.forEach(step => {
                currentNoteIndex = (currentNoteIndex + step) % 12;
                chordNotes.push(guitar.notes.sharps[currentNoteIndex]);
            });
    
            chordNotes.pop(); // Remove the last note which is a duplicate of the first
    
            const chordIntervals = guitar.arppegios[chord].intervals;
            const newComponent = JSON.parse(JSON.stringify(selectedFretboard));
            const newBoard = newComponent[(player ? 'chord' : choice) + 'Settings'].fretboard;
    
            newBoard.forEach(string => string.forEach(note => {
                note.show = false;
                note.interval = null;  // Reset interval
            }));
    
            newBoard.forEach((string, stringIndex) => {
                string.forEach((note, fretIndex) => {
                    const shapeIndex = guitar.shapes.names.indexOf(shape);
                    const shapeIntervals = guitar.shapes.indexes[shapeIndex];
    
                    const noteIndex = (selectedFretboard.generalSettings.tuning[stringIndex] + fretIndex) % 12;
                    const noteName = guitar.notes.sharps[noteIndex];
    
                    if (chordNotes.includes(noteName) && fretIndex <= shapeIntervals.end + key && fretIndex >= shapeIntervals.start + key) {
                        newBoard[stringIndex][fretIndex].show = true;
                        newBoard[stringIndex][fretIndex].interval = chordIntervals[chordNotes.indexOf(noteName)];
                    }
                });
            });
    
            const oldFretboardSettings = selectedFretboard['chordSettings'].fretboard;
    
            if (JSON.stringify(oldFretboardSettings) !== JSON.stringify(newBoard)) {
                dispatch(updateStateProperty(selectedFretboard.id, 'chordSettings.fretboard', newBoard));
            }
        }

        return (
            <WrappedComponent
                {...props}
                playProgression={playProgression}
                playChordNotes={playChordNotes}
                playSelectedNotes={playSelectedNotes}
            />
        );
    };
};

export default withPlayback;
