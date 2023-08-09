import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

import { 
    toggleNote
} from "../redux/actions";

const useStyles = makeStyles((theme) => ({
    formElement: {
        flex: '1 0 21%',
        margin: '10px'
    },
}));

function TabReader({toggleNote}){
    const [tabs, setTabs] = useState("e|--------------------------------------------------------------------|\nB|-------10h12b15---10-12----------7----------------------------------|\nG|--/11-------------------9----7-9---7--------------------------------|\nD|-------------------------------------8----9h11p9p7b8----------------|\nA|--------------------------------------------------------------------|\nE|--------------------------------------------------------------------|`");
    const classes = useStyles();

    const readTabs = () => {
        var explodedStrings = tabs.split('\n');

        const tuning = explodedStrings.map((string) => {
            return string[0];
        });

        console.log("tuning : ", tuning);

        // extract the notes
        var notesFrets = explodedStrings.map((string, stringIndex) => {
            return [...string.matchAll('[0-9]{1,2}|-')].map((match) => {
                var note = parseInt(match[0]);

                if(isNaN(note)){
                    return null;
                }else {
                    return {
                        string: stringIndex,
                        fret: note
                    };
                }
            });
        });

        // flip array to read in correct order of appearance (from left to right)
        var flippedArray = notesFrets[0].map((_, colIndex) => notesFrets.map((row) => row[colIndex]));

        // extact notes
        const notes = [].concat.apply([], flippedArray).filter((note) => {
            return note !== null && note !== undefined;
        });

        // play notes
        notes.forEach((note, noteIndex) => {
            setTimeout(() => {
                toggleNote(note.string, note.fret);
                setTimeout(() => {
                    toggleNote(note.string, note.fret);
                }, 2000)
            }, 2000 * noteIndex)
        })
    }

    return (
        <section>
            <TextField 
                rows={12}
                multiline={true}
                id="filled-basic" 
                label="Filled" 
                variant="filled" 
                value={tabs}
                fullWidth={true}
            />
            <Button
                className={classes.formElement}
                variant="contained"
                color="primary"
                size="medium"
                onClick={readTabs}
            >
                Read tabss 
            </Button>
        </section>
    );
}

const mapStateToProps = state => {
    return state;
};

export default connect(
    mapStateToProps,
    { 
        toggleNote
    }
)(TabReader);