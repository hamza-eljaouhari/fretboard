import {useState} from 'react';

import { connect } from "react-redux";
import { toggleNote } from "../redux/actions";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function TabsParser(props){

    const [tabs, setTabs] = useState('');

    function readTabs(e){
        setTabs(e.target.value);
    }

    function play(){
        console.log(tabs);

        var lines = tabs.split('\n');
        
        var cursor = 0;
        while(character !== '|'){
            // read one character per line
            for(let i = 0; i < lines.length; i++){
                var character = lines[i][cursor];
                if(!isNaN(character)){
                    // display on fretboard 
                    props.toggleNote(i, cursor)
                }
            }

            cursor++;
        }
        // map((line) => {
        //     return line.split('');
        // })

        // for each non empty 6 lines
            // read from latest line
    }

    return (
            <form>
                <TextField
                    id="filled-multiline-static"
                    label="Tabs reader"
                    multiline
                    rows={25}
                    fullWidth
                    variant="filled"
                    onChange={(e) => readTabs(e)}/>

                <Button variant="contained" color="primary" onClick={play}>
                    Play on freatboard
                </Button>
            </form>
    );
}

export default connect(null, { toggleNote })(TabsParser);