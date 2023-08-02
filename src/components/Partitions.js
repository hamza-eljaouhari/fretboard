import './partitions.css';
import { useEffect } from 'react';

import { connect } from "react-redux";
import guitar from '../config/guitar';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { 
    setChordProgression
} from "../redux/actions";

const queryString = require('query-string');

const Partitions = withRouter(({chordProgression, history}) => {
    var search = queryString.parse(history.location.search);
    const chordOrder = parseInt(search['chordOrder']);
    
    var setsOfFours = [];
    let oneSetOfFour = [];
    
    for(let i = 0; i < chordProgression.length; i++){

        oneSetOfFour.push(chordProgression[i]);

        if((i + 1) % 4 === 0){
            setsOfFours.push(oneSetOfFour);
            oneSetOfFour = [];
        }

        if(i === chordProgression.length - 1 && oneSetOfFour.length < 4){
            setsOfFours.push(oneSetOfFour);
        }
    }

    var toHighlight = false;

    const chordsTable = setsOfFours.map((set, setIndex) => {
        return (
            <tr key={setIndex}>
                {set.map((chordObject, chordIndex) => {

                    toHighlight = 4 * setIndex + chordIndex === chordOrder;
                    return (
                        <td key={chordIndex} className={toHighlight ? "chord highlighted-chord" : "chord"}>
                                <Typography 
                                style={{
                                    fontSize: '64px',
                                    color: 'rgba(0, 0, 0, 0.8)'
                                }}
                                variant="h6">
                                { guitar.notes.sharps[chordObject.key] + chordObject.chord}
                            </Typography>
                        </td>
                    )
                })}
            </tr>
        )
    })

    return (
        <section className="partitions">
            <table>
                <tbody>
                    {
                        chordsTable
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