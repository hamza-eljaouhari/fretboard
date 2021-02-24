import React, { useState } from 'react'
import './circle-of-fifths.css'
import guitar from '../config/guitar';
 
function CircleOfFifths({circleOfFifthsRotation, dashesRotation}){
    
    const [dimensions, setDimensions] = useState({
        width: 500,
        height: 500,
        centerX: 250,
        centerY: 250,
        fontSize: 16, // yes
        strokeWidth: 110,
        
        dashedStrokeWidth: 140,

        outterOutlinedCircleRadius: 248,
        firstInnerOutlinedCircleRadius: 110,
        secondInnerOutlinedCircleRadius: 180,
        innerDashedCircleRadius: 180,

        majorScalePointingCircle: 192,
        keysRadius: 215,
        relativesRadius: 140,
    })

    function getCircle(center, radius, steps = 12){
        var elements = []
        
        for (var i = 0; i < steps; i++) {
            elements.push({
                top: center + radius * Math.cos(2 * Math.PI * (( i - 3  ) % 12) / steps) - 26,
                left: center + radius * Math.sin(2 * Math.PI * (( i - 3) % 12) / steps)
            })
        }
        
        return elements;
    }

    const relatives = getCircle(dimensions.centerX + 10, dimensions.relativesRadius).map((style, index) => {
        const relativeMusicalKey = guitar.circleOfFifths[index].relative;
        // return <div className="musical-key" key={relativeMusicalKey} style={style}>{relativeMusicalKey}</div>
        return ( <text key={index} x={style.top} y={style.left}
                    fontFamily="Verdana"
                    fontSize={dimensions.fontSize}
                    onClick={() => alert(relativeMusicalKey)}>
                {relativeMusicalKey}
            </text> );
    })

    const keys = getCircle(dimensions.centerX + 10, dimensions.keysRadius).map((style, index) => {
        const musicalKey = guitar.circleOfFifths[index].key;
        return ( <text key={index} x={style.top} y={style.left}
            fontFamily="Verdana"
            fontSize={dimensions.fontSize}>
        {musicalKey}
    </text> );
    })

    return(
            <div id="circleOfFifths" style={{height: dimensions.height, minWidth: dimensions.width}} >
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
                        strokeDasharray='700 1206'
                        transform={`rotate(${circleOfFifthsRotation}, 250, 250)`} 
                        cx={dimensions.centerY} 
                        cy={dimensions.centerY}/>

                    <circle
                        className="rotation-effect"
                        r={dimensions.innerDashedCircleRadius} 
                        fill="white" 
                        strokeWidth={dimensions.dashedStrokeWidth} 
                        stroke="black" 
                        strokeDasharray="1 94" 
                        transform={`rotate(${dashesRotation}, 250, 250)`}
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
            </div>
    );
}

export default CircleOfFifths;