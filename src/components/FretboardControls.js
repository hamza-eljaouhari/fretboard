import React from 'react';
import { Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import guitar from '../config/guitar.js';

const FretboardControls = ({
    classes,
    choice,
    handleChoiceChange,
    keySignature,
    onElementChange,
    buttonText,
    scaleModes,
    arppegiosNames,
    onCleanFretboard,
    onCopyLink,
    addChordToProgression,
    playChordProgression,
    saveProgression,
    selectedMode,
    selectedScale,
    selectedChord,
    selectedArppegio,
    selectedFret,
    selectedShape
}) => {
    // Helper function to capitalize the first letter of each choice
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    const handleButtonClick = (newChoice) => {
        handleChoiceChange(newChoice);
    };

    return (
        <footer className={classes.footer}>
            <FormControl  className={`${classes.formControl} ${classes.fixedWidth}`}>
                <InputLabel id="key-signature-label">Choose Key</InputLabel>
                <Select
                    labelId="key-signature-label"
                    id="key-signature-select"
                    value={keySignature}
                    onChange={(e) => onElementChange(e.target.value, 'key')}
                    displayEmpty
                >
                    {guitar.notes.sharps.map((key, index) => (
                        <MenuItem key={index} value={index}>{key}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Buttons for choosing between scales, chords, and arpeggios */}
            <div className={classes.buttonGroup}>
                <Button
                    size="small"
                    variant={choice === 'scales' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleButtonClick('scales')}
                    className={classes.choiceButton}
                >
                    Scales
                </Button>
                <Button
                    size="small"
                    variant={choice === 'chords' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleButtonClick('chords')}
                    className={classes.choiceButton}
                >
                    Chords
                </Button>
                <Button
                    size="small"
                    variant={choice === 'arpeggios' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleButtonClick('arpeggios')}
                    className={classes.choiceButton}
                >
                    Arpeggios
                </Button>
            </div>

            {choice === 'scales' && (
                <>
                    <FormControl  className={`${classes.formControl} ${classes.fixedWidth}`}>
                        <InputLabel id="scale-name-label">Choose Scale</InputLabel>
                        <Select
                            labelId="scale-name-label"
                            id="scale-name-select"
                            value={selectedScale} // Adjust this as necessary
                            onChange={(e) => onElementChange(e.target.value, 'scale')}
                            displayEmpty
                        >
                            {Object.keys(guitar.scales).map((scaleName, index) => (
                                <MenuItem key={index} value={scaleName}>{capitalize(scaleName)}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    { scaleModes && (
                        <FormControl  className={`${classes.formControl} ${classes.fixedWidth}`}>
                            <InputLabel id="scale-mode-label">Choose Mode</InputLabel>
                            <Select
                                labelId="scale-mode-label"
                                id="scale-mode-select"
                                value={selectedMode} // Adjust based on your state management for modes
                                onChange={(e) => onElementChange(e.target.value, 'mode')}
                                displayEmpty
                            >
                                {scaleModes.map((mode, index) => (
                                    <MenuItem key={index} value={index}>{mode.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </>
            )}

            {/* Chord Selection, shown if 'chords' is the current choice */}
            {choice === 'chords' && (
                <>
                    <FormControl  className={`${classes.formControl} ${classes.fixedWidth}`}>
                        <InputLabel id="chord-name-label">Choose Chord</InputLabel>
                        <Select
                            labelId="chord-name-label"
                            id="chord-name-select"
                            value={selectedChord} // Adjust based on your state management for chords
                            onChange={(e) => onElementChange(e.target.value, 'chord')}
                            displayEmpty
                        >
                            {Object.keys(guitar.arppegios).map((chordName, index) => (
                                <MenuItem key={index} value={chordName}>{chordName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            )}

            {/* Arpeggio Selection, shown if 'arpeggios' is the current choice */}
            {choice === 'arpeggios' && (
                <>
                    <FormControl  className={`${classes.formControl} ${classes.fixedWidth}`}>
                        <InputLabel id="arpeggio-name-label">Choose Arpeggio</InputLabel>
                        <Select
                            labelId="arpeggio-name-label"
                            id="arpeggio-name-select"
                            value={selectedArppegio} // Adjust based on your state management for arpeggios
                            onChange={(e) => onElementChange(e.target.value, 'arpeggio')}
                            displayEmpty
                        >
                            {arppegiosNames.map((arpeggioName, index) => (
                                <MenuItem key={index} value={arpeggioName}>{arpeggioName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            )}

            {/* Shape Selection, if applicable */}
            {choice === 'chords' && (
                <FormControl  className={`${classes.formControl} ${classes.fixedWidth}`}>
                    <InputLabel id="shape-label">Choose Shape</InputLabel>
                    <Select
                        labelId="shape-label"
                        id="shape-select"
                        value={selectedShape} // Adjust based on your state management for shapes
                        onChange={(e) => onElementChange(e.target.value, 'shape')}
                        displayEmpty
                    >
                        {guitar.shapes.names.map((shapeName, index) => (
                            <MenuItem key={index} value={index}>{shapeName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {/* Fret Selection, potentially applicable to various choices */}
            {choice === 'chords' && (
                <FormControl  className={`${classes.formControl} ${classes.fixedWidth}`}>
                    <InputLabel id="fret-label">Choose Fret</InputLabel>
                    <Select
                        labelId="fret-label"
                        id="fret-select"
                        value={selectedFret} // This could be a dynamic value based on user interaction
                        onChange={(e) => onElementChange(e.target.value, 'fret')}
                        displayEmpty
                    >
                        {Array.from({ length: guitar.numberOfFrets }, (_, i) => i + 1).map((fretNumber, index) => (
                            <MenuItem key={index} value={fretNumber}>{fretNumber}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <Button
                 className={`${classes.formControl} ${classes.fixedWidth}`}
                variant="contained"
                color="primary"
                size="medium"
                onClick={onCleanFretboard}
            >
                Clean
            </Button>

            {/* Additional buttons as needed */}
        </footer>
    );
};

export default FretboardControls;

// import React from 'react';
// import { Card, CardContent, Typography, Button } from '@material-ui/core';

// const FretboardControls = ({
//     classes,
//     choice,
//     handleChoiceChange,
//     keySignature,
//     guitar,
//     onElementChange,
//     buttonText,
//     scaleModes,
//     arppegiosNames,
//     onCleanFretboard,
//     onCopyLink,
//     addChordToProgression,
//     playChordProgression,
//     saveProgression
// }) => {
//     // Helper function to capitalize the first letter of each choice
//     const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    
//     return (
//         <section className="controls">
//             <Typography color="textPrimary" style={{ marginBottom: '8px' }}>
//                 Choose Key :
//             </Typography>
//             <form  className={classes.form}>
//             {
//                 guitar.notes.sharps.map((key, index) => {
//                     return (
//                         <Card className={classes.card} key={index}>
//                             <CardContent>
//                                 <Typography onClick={() => onElementChange(index, 'key')} className={classes.title} color="textSecondary">
//                                     {key}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     )    
//                 })
//             }
//             </form>
//         {
//             keySignature !== "unset" && (
//                 <>
//                 <Typography color="textPrimary" style={{ marginBottom: '8px' }}>
//                     Choose Display Element:
//                 </Typography>
//                 <form className={classes.form}>
//                     {
//                         ['scales', 'chords', 'arpeggios'].map(choice => (
//                             <Card key={choice} className={classes.card}>
//                                 <CardContent>
//                                     <Typography onClick={() => handleChoiceChange(choice)} className={classes.title} color="textSecondary">
//                                     {capitalize(choice)}
//                                     </Typography>
//                                 </CardContent>
//                             </Card>
//                         ))
//                     }
//                 </form>
//                 </>

//             )
//         }
//         {
//             choice === 'scales' &&
//             (
//             <div>
//                 <Typography color="textPrimary" style={{ marginBottom: '8px' }}>
//                     Choose Scale :
//                 </Typography>
//                 {
//                     Object.keys(guitar.scales).map((scaleName, index) => {
//                         return (
//                             <Card className={classes.card} key={index}>
//                                 <CardContent>
//                                     <Typography onClick={(e) => onElementChange(scaleName, 'scale')} className={classes.title} color="textSecondary">
//                                         {scaleName}
//                                     </Typography>
//                                 </CardContent>
//                             </Card>
//                         )    
//                     })
//                 }
//                 <Typography color="textPrimary" style={{ marginBottom: '8px' }}>
//                     Choose Mode :
//                 </Typography>
//                 {
//                 scaleModes && scaleModes.map((mode, index) => {
//                         return (
//                             <Card className={classes.card} key={index}>
//                             <CardContent>
//                                 <Typography onClick={(e) => onElementChange(index, 'mode')} className={classes.title} color="textSecondary">
//                                     {mode.name}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                         )    
//                     })
//                 }
//             </div> 
//             )
//         }
//         {
//             choice === 'chords' &&
//             ( 
//                 <div>
//                     <div>
//                         <Typography color="textPrimary" style={{ marginBottom: '8px' }}>
//                             Choose Mode :
//                         </Typography>
//                         {
//                             arppegiosNames.map((chord, index) => {
//                                 return (
//                                     <Card className={classes.card} key={index}>
//                                     <CardContent>
//                                         <Typography onClick={(e) => onElementChange(chord, 'chord')} className={classes.title} color="textSecondary">
//                                             {chord}
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                                 )    
//                             })
//                         }
//                     </div>
                    
//                     <div>
//                         <Typography color="textPrimary" style={{ marginBottom: '8px' }}>
//                             Choose Shape :
//                         </Typography>
//                         {
//                             guitar.shapes.names.map((shape, index) => {
//                                 return (
//                                     <Card className={classes.card} key={index}>
//                                     <CardContent>
//                                         <Typography onClick={(e) => onElementChange(index, 'shape')} className={classes.title} color="textSecondary">
//                                             {shape}
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                                 )    
//                             })
//                         }
                        
//                     </div>
                                        
//                     <div>
//                         <Typography color="textPrimary" style={{ marginBottom: '8px' }}>
//                             Choose Fret :
//                         </Typography>
//                         {
//                             Array.from(Array(guitar.numberOfFrets - 3).keys(), (_, i) => i + 1).map((fret, index) => {
//                                 return (
//                                     <Card className={classes.card} key={index}>
//                                     <CardContent>
//                                         <Typography onClick={(e) => onElementChange(fret, 'fret')} className={classes.title} color="textSecondary">
//                                             {fret}
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                                 )    
//                             })
//                         }

//                     </div>
                    
//                 </div>
//             )
//         }
//         {
//             choice === 'arpeggios' && 
//             (
//                 <>
//                 <Typography color="textPrimary" style={{ marginBottom: '8px' }}>
//                     Choose Mode :
//                 </Typography>
//                 {
//                     arppegiosNames.map((arppegio, index) => {
//                         return (
//                             <Card className={classes.card} key={index}>
//                             <CardContent>
//                                 <Typography onClick={(e) => onElementChange(index, 'arppegio')} className={classes.title} color="textSecondary">
//                                     {arppegio}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                         )    
//                     })
//                 }

//                 </>

//             )
//         }
//             <Button
//                 className={classes.formElement}
//                 variant="contained"
//                 color="primary"
//                 size="medium"
//                 onClick={(e) => onElementChange(e, 'notesDisplay')}
//             >
//                 { buttonText } 
//             </Button>

//             <Button
//                 className={classes.formElement}
//                 variant="contained"
//                 color="primary"
//                 size="medium"
//                 onClick={onCleanFretboard}
//             >
//                 Clean
//             </Button>

//             <Button
//                 className={classes.formElement}
//                 variant="contained"
//                 color="primary"
//                 size="medium"
//                 onClick={onCopyLink}
//             >
//                 Copy link
//             </Button>

//             <Button
//                 className={classes.formElement}
//                 variant="contained"
//                 color="primary"
//                 size="medium"
//                 onClick={addChordToProgression}
//             >
//                 Add chord to progression
//             </Button>
            

//             <Button
//                 className={classes.formElement}
//                 variant="contained"
//                 color="primary"
//                 size="medium"
//                 onClick={playChordProgression}
//             >
//                 Play progession
//             </Button>

//             <Button
//                 className={classes.formElement}
//                 variant="contained"
//                 color="primary"
//                 size="medium"
//                 onClick={saveProgression}
//             >
//                 Save progression
//             </Button>

//             <Typography 
//                 className={classes.seperator}
//                 variant="h6">
//                 Coming soon :
//             </Typography>

//             <Button
//                 className={classes.formElement}
//                 variant="contained"
//                 color="primary"
//                 size="medium"
//             >
//                 Detect
//             </Button>

//             <Button
//                 className={classes.formElement}
//                 variant="contained"
//                 color="primary"
//                 size="medium"
//             >
//                 Print
//             </Button>
//         </section>
//     )
// };

// export default FretboardControls;
