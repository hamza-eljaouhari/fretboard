import React, { useState, useEffect, useRef } from 'react'
import './circle-of-fifths.css'
import guitar from '../config/guitar';
 
function CircleOfFifths({pageX, pageY}){
    
    const circleOfFifths = useRef(null);

    const width = 500;
    const height = 500;
    const fontSize = 26;
    const strokeWidth = 10;
    const innerCircleRadius = width / 4 - 10; // 240
    const greenOutterOutlinePadding = 60;
    const outterOulineRadius = 230;
    const greenCircleRadius = innerCircleRadius + greenOutterOutlinePadding;
    const outterCircleRadius = 200;
    const xPositionCenterCircle = width / 2; // 500
    const yPositionCenterCircle = width / 2; // 500
    const outterCircleCenter = Math.sqrt(outterCircleRadius / ( 2 * Math.PI)) + yPositionCenterCircle;
    const innerCircleCenter = Math.sqrt(innerCircleRadius / ( 2 * Math.PI)) + xPositionCenterCircle;
      
    useEffect(() => {
        function updateWidthAndHeight(e) {
            console.log("eeeeeeeeeeeee", e)
        }

        if (circleOfFifths && circleOfFifths.current) {
            circleOfFifths.current.addEventListener("onchange", updateWidthAndHeight, false);
            
            return function cleanup() {
                circleOfFifths.current.removeEventListener("resize", updateWidthAndHeight, false);
            };
        }
    }, [])

    function getCircle(center, radius, steps = 12){
        var elements = []
        
        for (var i = 0; i < steps; i++) {
            elements.push({
                top: center + radius * Math.cos(2 * Math.PI * i / steps) - 26,
                left: center + radius * Math.sin(2 * Math.PI * i / steps)
            })
        }
        
        return elements;
    }

    const relatives = getCircle(innerCircleCenter, innerCircleRadius).map((style, index) => {
        const relativeMusicalKey = guitar.circleOfFifths[index].relative;
        // return <div className="musical-key" key={relativeMusicalKey} style={style}>{relativeMusicalKey}</div>
        return ( <text key={index} x={style.top} y={style.left}
                    fontFamily="Verdana"
                    fontSize={fontSize}>
                {relativeMusicalKey}
            </text> );
    })

    const keys = getCircle(outterCircleCenter, outterCircleRadius).map((style, index) => {
        const musicalKey = guitar.circleOfFifths[index].key;
        return ( <text key={index} x={style.top } y={style.left}
            fontFamily="Verdana"
            fontSize={fontSize}>
        {musicalKey}
    </text> );
    })

    return(
            <div id="circleOfFifths" style={{height: height, width: width}} >
                <svg height="100%" width="100%" style={{transform: `scale(1, 1)`}}>
                    <circle  r={outterOulineRadius} fill="white" strokeWidth="2" stroke="black" cx={xPositionCenterCircle} cy={yPositionCenterCircle}/>
                    
                    <circle transform="rotate(15, 250, 250)" r={greenCircleRadius} fill="#fff" strokeWidth={strokeWidth} stroke="darkslategrey" strokeDasharray="1107 1885" cx={xPositionCenterCircle} cy={yPositionCenterCircle}/>
                    
                    <circle  r={greenCircleRadius} fill="#fff" strokeWidth="2" stroke="darkslategrey" cx={xPositionCenterCircle} cy={yPositionCenterCircle}/>
                    
                    <circle id="dashes-circle" r={greenCircleRadius} fill="rgba(1,1,1,0.2)" strokeWidth={strokeWidth} stroke="#0F0F0F" strokeDasharray="1 157" transform="rotate(15, 250, 250)" cx={xPositionCenterCircle} cy={yPositionCenterCircle}/>

                    <circle  r={innerCircleRadius - 50} fill="white" strokeWidth="2" stroke="black" cx={xPositionCenterCircle} cy={yPositionCenterCircle}/>

                    {relatives}
                    {keys}
                </svg>
            </div>
    );
}

export default CircleOfFifths;