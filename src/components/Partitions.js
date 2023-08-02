import './partitions.css';
import { connect } from "react-redux";
import guitar from '../config/guitar';

const Partitions = ({chordProgression}) => {

    const divideProgessionByFours = () => {
        
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

        return (
            setsOfFours.map((set, index) => {
                return (
                    <tr key={index}>
                        {set.map((chordObject, index) => {
                            return (
                                <td key={index} className="chord">
                                    { guitar.notes.sharps[chordObject.key] + chordObject.chord}
                                </td>
                            )
                        })}
                    </tr>
                )
            })
        );
    }

    const chordsTable = divideProgessionByFours();

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
}


const mapStateToProps = state => {
    return { 
        chordProgression: state.partitions.chordProgression,
    };
};
  
export default connect(
    mapStateToProps,
    {
    }
)(Partitions);