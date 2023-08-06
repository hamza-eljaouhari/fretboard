import React from 'react'
import './circle-of-fifths.css'
import guitar from '../config/guitar';
import { connect } from "react-redux";

import { 
    setKey,
    setScale,
    setMode
} from "../redux/actions";

function CircleOfFifths(props){
    
    const dimensions =  {
        width: 500,
        height: 500,
        
        centerX: 250,
        centerY: 250,
        
        fontSize: 16, // yes
        strokeWidth: 140 - 2 * 3,
        
        dashedStrokeWidth: 140,

        
        outterOutlinedCircleRadius: 248, // stoke with 2
        
        secondInnerOutlinedCircleRadius: 180, // - 68
        innerMaskingDashedCircleRadius: 180, // - 68 for text
        firstInnerOutlinedCircleRadius: 110, // - 70 for text
        majorScalePointingCircle: 180,
        keysRadius: 215,
        relativesRadius: 140,
    };

    function pointToKey(index, isMajor){
        var keySignature = guitar.notes.flats.indexOf(guitar.circleOfFifths[index].key);
        props.setKey(keySignature);
        props.setScale("major");
        props.setMode(isMajor === true ? 0 : 5);
        
    }

    function getCircle(center, radius, steps = 12){
        var elements = []
        
        for (var i = steps; i > 0; i--) {
            elements.push({
                top: center + radius * Math.cos(2 * Math.PI * (( i + 6) % 12) / steps),
                left: center + radius * Math.sin(2 * Math.PI * (( i + 6) % 12) / steps)
            })
        }
        
        return elements;
    }

    const relatives = getCircle(dimensions.centerX, dimensions.relativesRadius).map((style, index) => {
        const relativeMusicalKey = guitar.circleOfFifths[index].relative;
        return ( <text key={index} y={style.top} x={style.left - (dimensions.fontSize * relativeMusicalKey.length) / 2 }
                    fontFamily="Verdana"
                    fontSize={dimensions.fontSize}
                    onClick={() => { pointToKey(index, false)}}>
                {relativeMusicalKey}
            </text> );
    })

    const keys = getCircle(dimensions.centerX, dimensions.keysRadius).map((style, index) => {
        const musicalKey = guitar.circleOfFifths[index].key;
        return ( <text key={index} y={style.top} x={style.left - (dimensions.fontSize * musicalKey.length) / 2 }
            fontFamily="Verdana"
            fontSize={dimensions.fontSize}
            onClick={() => { pointToKey(index, true)}}>
        {musicalKey}
    </text> );
    })

    return(
            <section id="circleOfFifths" style={{height: dimensions.height, minWidth: dimensions.width}} >
                <svg height="100%" width="100%">
                    <circle 
                        r={dimensions.outterOutlinedCircleRadius} 
                        fill="white" 
                        strokeWidth="2" 
                        stroke="black"
                        cx={dimensions.centerX} 
                        cy={dimensions.centerY}/>

                    <circle
                        className="rotation-effect"
                        r={dimensions.majorScalePointingCircle} 
                        fill="white" 
                        stroke="#cd5c5c"
                        strokeWidth={dimensions.strokeWidth} 
                        strokeDasharray='656 1206'
                        transform={`rotate(${props.circleOfFifthsRotation}, 250, 250)`} 
                        cx={dimensions.centerY} 
                        cy={dimensions.centerY}/>

                    <circle
                        className="rotation-effect"
                        r={dimensions.innerMaskingDashedCircleRadius} 
                        fill="white" 
                        strokeWidth={dimensions.dashedStrokeWidth} 
                        stroke="black" 
                        strokeDasharray="1 94" 
                        transform={`rotate(${props.dashedCircleRotation}, 250, 250)`}
                        cx={dimensions.centerX} 
                        cy={dimensions.centerY}/>

                    <circle  
                        r={dimensions.firstInnerOutlinedCircleRadius} 
                        fill="#E0E0E0" 
                        strokeWidth="2" 
                        stroke="black" 
                        cx={dimensions.centerX} 
                        cy={dimensions.centerY}/>
                   
                   <circle  
                        r={dimensions.secondInnerOutlinedCircleRadius} 
                        fill="transparent" 
                        strokeWidth="2" 
                        stroke="black" 
                        cx={dimensions.centerX} 
                        cy={dimensions.centerY}/>

                    {relatives}
                    {keys}
                </svg>
            </section>
    );
}



const mapStateToProps = state => {

    var keySignature = state.fretboard.keySignature;

    var circleOfFifthsRotation = state.circleOfFifths.circleOfFifthsRotation;
    var dashedCircleRotation = state.circleOfFifths.dashedCircleRotation;

    if(keySignature !== "unset"){

        var orderOfNote = parseInt(keySignature);

        if(orderOfNote % 2 !== 0){
            orderOfNote = orderOfNote > 6 ? orderOfNote - 6 : orderOfNote + 6;
        }

        circleOfFifthsRotation = (((orderOfNote / 12 ) * 360) + 226) % 360;
        dashedCircleRotation = ((orderOfNote + 1) * 30) + 14;
    }

    return { 
        circleOfFifthsRotation: circleOfFifthsRotation,
        dashedCircleRotation: dashedCircleRotation 
    };
};
  
export default connect(
    mapStateToProps,
    {
        setKey,
        setScale,
        setMode
    })(CircleOfFifths);