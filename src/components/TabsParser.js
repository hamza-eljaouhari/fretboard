import {useState} from 'react';

import { connect } from "react-redux";
import { displayNote } from "../redux/actions";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function TabsParser(props){

    const [tabs, setTabs] = useState('');

    function readTabs(e){
        setTabs(e.target.value);
    }

    function format(){

    }
    
    function play(){

        format();

        var strings = tabs.split('\n');
        
        var cursor = 2;
        
        var character = '';

        var count = 0;

        while(character !== '|'){
            for(let i = 0; i < strings.length; i++){
                character = strings[i][cursor]
                let next = strings[i][cursor + 1]
                let prev = strings[i][cursor - 1];
                
                if(!isNaN(character)){
                    if(!isNaN(next)){
                        character = parseInt(character.toString() + next.toString());
                    }

                    if(isNaN(prev)){
                        count++;
                        // props.displayNote(i, parseInt(character));
                        
                        function emitDisplay(i, j){
                            console.log([i, j]);
                            props.displayNote(i, j);
                        }

                        setTimeout(emitDisplay, count * 500, i, parseInt(character))  
                    }
                }
            }   

            cursor++;
        }
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

export default connect(null, { displayNote })(TabsParser);