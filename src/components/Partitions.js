import './partitions.css';
import { connect } from "react-redux";
import React, { useState } from 'react';
import guitar from '../config/guitar';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router-dom';
import { 
    setChordProgression
} from "../redux/actions";


const options = [
    {
        id: 1,
        name: 'Delete chord'
    },
    {
        id: 2,
        name: 'Display chord'
    },
    {
        id: 3,
        name: 'Get chord scale'
    },
    {
        id: 4,
        name: 'Get chord arppegio'
    },
    {
        id: 5,
        name: 'Copy chord link'
    }
];

const queryString = require('query-string');

const Partitions = withRouter(({chordProgression, setChordProgression, history}) => {
    var search = queryString.parse(history.location.search);
    const chordOrder = parseInt(search['chordOrder'])|| -1;
    const [anchorEls, setAnchorEls] = useState([]);

    const handleClick = (event, chordIndex) => {
        var newAnchorEls = [...anchorEls]
        
        newAnchorEls = Array(chordProgression.length).fill(null);

        newAnchorEls[chordIndex] = event.currentTarget;
        
        setAnchorEls(newAnchorEls);
    };
    
    const handleClose = () => {
        setAnchorEls(Array(chordProgression.length).fill(null));
    };

    const handleMenuOption = (optionId, chordObject) => {

        if(optionId === 1){
            var newChordProgression = [...chordProgression];
            const indexOfCurrentChord = newChordProgression.indexOf(chordObject)
            newChordProgression.splice(indexOfCurrentChord, 1);
            setChordProgression(newChordProgression);
        }else if (optionId === 2){

        }else if (optionId === 3){
            
        }else if (optionId === 4){
            
        }else if (optionId === 5){
            
        } else {

        }

        handleClose();
    }


    // Divide into sets of 4's
    let setsOfFours = [];
    let oneSetOfFour = [];

    for(let i = 0; i < chordProgression.length; i++){

        oneSetOfFour.push(chordProgression[i]);

        if((i + 1) % 4 === 0){
            setsOfFours.push({
                id: setsOfFours.length + 1, 
                oneSetOfFour
            });
            oneSetOfFour = [];
        }

        if(i === chordProgression.length - 1 && oneSetOfFour.length < 4){
            setsOfFours.push({
                id: setsOfFours.length + 1,
                oneSetOfFour
            });
        }
    }

    return (
        <section className="partitions">
            <table>
                <tbody>
                    {
                        setsOfFours.map((set) => {
                                return (
                                <tr key={'set-area-' + set.id}>
                                    {
                                        set.oneSetOfFour.map((chordObject, chordIndex) => {
                                            let current = 4 * (set.id - 1) + chordIndex;
                                            
                                            return (
                                                <td key={'chord-area-' + chordIndex} className={current === chordOrder ? "chord highlighted-chord" : "chord"}>
                                                    <div className="context-menu">
                                                        <IconButton
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                            onClick={(e) => handleClick(e, current)}
                                                        >
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                        <Menu
                                                            id="long-menu"
                                                            anchorEl={anchorEls[current]}
                                                            keepMounted
                                                            open={Boolean(anchorEls[current])}
                                                            onClose={() => handleClose()}
                                                            PaperProps={{
                                                                style: {
                                                                    width: '20ch',
                                                                },
                                                            }}
                                                        >
                                                            {
                                                                options.map((option) => {
                                                                    return (
                                                                        <MenuItem key={'option-' + option.id} onClick={() => handleMenuOption(option.id, chordObject) }>
                                                                            {option.name}
                                                                        </MenuItem>
                                                                    );  
                                                                })
                                                            }
                                                        </Menu>
                                                    </div>
                                                    <div className="chord-name">
                                                        <Typography 
                                                                style={{
                                                                    fontSize: '48px',
                                                                    color: 'rgba(0, 0, 0, 0.8)',
                                                                }}
                                                                variant="h6">
                                                                { guitar.notes.sharps[chordObject.key] + chordObject.chord}
                                                        </Typography>
                                                    </div>
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </section>
    );
})

const mapStateToProps = state => {
    return { 
        chordProgression: state.partitions.chordProgression,
    };
};
  
export default connect(
    mapStateToProps,
    {
        setChordProgression
    }
)(Partitions);
