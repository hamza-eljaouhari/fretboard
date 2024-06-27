import React, { useState } from 'react';
import { makeStyles, FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@material-ui/core';
import ChordGraph from './ChordGraph';
import guitar from '../config/guitar'; // Import your guitar configuration
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%', // For mobile screens
        [theme.breakpoints.up('sm')]: {
            width: '100%', // For desktop screens
        },
    },
    graph: {
        height: 400,
        width: '100%',
        border: '1px solid black',
    },
    progression: {
        marginBottom: theme.spacing(2),
    },
}));

const initialRomanNumerals = [
    'I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°',
    'i', 'ii°', 'III', 'iv', 'V', 'VI', 'VII'
];

const ChordComposer = ({ addChordToProgression, saveProgression, playProgression }) => {
    const classes = useStyles();
    const [selectedKey, setSelectedKey] = useState('');
    const [selectedQuality, setSelectedQuality] = useState('major');
    const [chordPath, setChordPath] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [showInitial, setShowInitial] = useState(true);

    const handleKeyChange = (event) => {
        setSelectedKey(event.target.value);
    };

    const handleQualityChange = (event) => {
        setSelectedQuality(event.target.value);
    };

    const handleNodeClick = (nodeId) => {
        const chosenRoman = nodeId.split('-')[1];

        const newNodes = initialRomanNumerals
            .filter((numeral) => numeral !== chosenRoman)
            .map((roman, index) => ({
                id: `${selectedKey}-${roman}-${selectedQuality}-${nodes.length + index}`,
                label: roman,
                group: 'roman',
                x: Math.random() * 400,
                y: Math.random() * 400,
            }));

        const newEdges = newNodes.map((node) => ({
            id: `edge-${nodeId}-${node.id}`,
            from: nodeId,
            to: node.id,
        }));

        setNodes([...nodes.filter((n) => n.group !== 'roman'), { id: nodeId, label: chosenRoman, group: 'chosen' }, ...newNodes]);
        setEdges([...edges, ...newEdges]);
        setChordPath([...chordPath, { id: nodeId, label: chosenRoman }]);
        setShowInitial(false);
    };

    const handleSaveProgression = () => {
        chordPath.forEach((chord) => {
            addChordToProgression({
                keySignature: selectedKey,
                chord: chord.label,
            });
        });
        saveProgression();
    };

    const initialNodes = initialRomanNumerals.map((roman, index) => ({
        id: `${selectedKey}-${roman}-${selectedQuality}-${index}`,
        label: roman,
        group: 'roman',
        x: Math.random() * 400,
        y: Math.random() * 400,
    }));

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.progression}>
                        {chordPath.map((chord, index) => (
                            <span key={index}>{chord.label} {index < chordPath.length - 1 ? '→' : ''} </span>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Key</InputLabel>
                        <Select value={selectedKey} onChange={handleKeyChange}>
                            {guitar.notes.sharps.map((note, index) => (
                                <MenuItem key={index} value={note}>{note}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Quality</InputLabel>
                        <Select value={selectedQuality} onChange={handleQualityChange}>
                            <MenuItem value="major">Major</MenuItem>
                            <MenuItem value="minor">Minor</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <ChordGraph nodesData={showInitial ? initialNodes : nodes} edgesData={edges} onNodeClick={handleNodeClick} />
            <Button onClick={handleSaveProgression}>Save Progression</Button>
            <Button onClick={() => playProgression(chordPath)}>Play Progression</Button>
        </div>
    );
};

ChordComposer.propTypes = {
    addChordToProgression: PropTypes.func.isRequired,
    playProgression: PropTypes.func.isRequired,
    saveProgression: PropTypes.func.isRequired,
};

export default ChordComposer;
