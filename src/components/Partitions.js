import './partitions.css';
import { connect } from "react-redux";
import React, { useState } from 'react';
import guitar from '../config/guitar';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withRouter } from 'react-router-dom';
import { 
    setChordProgression,
    setKey,
    setChord,
    setFret,
    setShape
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
    const chordOrder = parseInt(search['chordOrder']);
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

    const displayChord = (chordObject) => {
        const chordObjectKeys = Object.keys(chordObject);

        const searchObject = {};

        chordObjectKeys.forEach((key) => {
            searchObject[key] = chordObject[key];
        });

        const newLocation = queryString.stringify(searchObject);

        history.push('/?' + newLocation);
    }

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

    const moveBy = (chordObject, step) => {
        var newChordProgression = [...chordProgression];

        const chordIndex = newChordProgression.indexOf(chordObject);
        const temp = newChordProgression[chordIndex];
        newChordProgression[chordIndex] = newChordProgression[chordIndex + step];
        newChordProgression[chordIndex + step] = temp;

        setChordProgression(newChordProgression);
    }

    // Divide into sets of 4's
    const setsOfFours = (() => {
        const sets = [];
        let set = [];
        for (let i = 0; i < chordProgression.length; i++) {
          set.push(chordProgression[i]);
          if ((i + 1) % 4 === 0) {
            sets.push({ id: sets.length + 1, chords: set });
            set = [];
          }
        }
        if (set.length > 0) {
          sets.push({ id: sets.length + 1, chords: set });
        }
        return sets;
    })();

    return (
        <section className="partitions">
            <table>
                <tbody>
                    {
                        setsOfFours.map((set) => {
                            return (
                                <tr key={'set-area-' + set.id}>
                                    {
                                        set.chords.map((chordObject, chordIndex) => {
                                            const current = 4 * (set.id - 1) + chordIndex;
                                            const firstChord = current === 0;
                                            const lastChord = current === chordProgression.length - 1; 
                                            return (
                                                <td 
                                                    key={'chord-area-' + chordIndex} 
                                                    onClick={() => displayChord(chordObject)} 
                                                    className={current === chordOrder ? "chord highlighted-chord" : "chord"}>
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
                                                    <div className="chord-container">
                                                        {
                                                            !firstChord && <IconButton
                                                                className="chord-element prev-chord"
                                                                aria-label="prev-chord"
                                                                aria-controls="prev-chord"
                                                                aria-haspopup="true"
                                                                size="small"
                                                                onClick={() => moveBy(chordObject, -1)}
                                                            >
                                                                <ChevronLeftIcon />
                                                            </IconButton>
                                                        }
                                                        <Typography 
                                                            className={firstChord ? "current-chord first-chord" : (lastChord ? "current-chord last-chord" : "current-chord")   }
                                                            style={{
                                                                fontSize: '32px'
                                                            }}>
                                                            
                                                                { guitar.notes.sharps[chordObject.key] + chordObject.chord}
                                                        </Typography>
                                                        { 
                                                            !lastChord && <IconButton
                                                                className="chord-element next-chord"
                                                                aria-label="next-chord"
                                                                aria-controls="next-chord"
                                                                aria-haspopup="true"
                                                                size="small"
                                                                onClick={() => moveBy(chordObject, +1)}
                                                            >
                                                                <ChevronRightIcon />
                                                            </IconButton>
                                                        }
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
        setChordProgression,
        setKey,
        setChord,
        setFret,
        setShape
    }
)(Partitions);
