import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    progressionContainer: {
        padding: theme.spacing(2),
    },
    chordDisplay: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    chordButton: {
        marginLeft: theme.spacing(1),
    },
}));

const Progressor = ({ progression, setProgression, playProgression, setProgressionKey, selectedKey, getScaleNotes }) => {
    const classes = useStyles();

    const handlePlay = () => {
        playProgression(progression);
    };

    const handleKeyChange = (event) => {
        const newKey = event.target.value;
        setProgressionKey(newKey);
    };

    return (
        <div className={classes.progressionContainer}>
            <div className={classes.chordDisplay}>
                {progression.map((chord, index) => (
                    <Button key={index} className={classes.chordButton}>
                        {chord.label}
                    </Button>
                ))}
            </div>
            <Button variant="contained" color="primary" onClick={handlePlay}>
                Play Progression
            </Button>
        </div>
    );
};

Progressor.propTypes = {
    progression: PropTypes.array.isRequired,
    setProgression: PropTypes.func.isRequired,
    playProgression: PropTypes.func.isRequired,
    setProgressionKey: PropTypes.func.isRequired,
    selectedKey: PropTypes.string,
    getScaleNotes: PropTypes.func.isRequired,
};

export default Progressor;
