import React, { useState, useEffect } from 'react'
import './circle-of-fifths.css'
import guitar from '../config/guitar';
 
function CircleOfFifths({pageX, pageY}){
    
    const [width, setWidth] = useState(1000);
    const [height, setHeight] = useState(1000);
    const [resize, setResize] = useState(false);
    const [circleOfFifthsOffsets, setCircleOfFifthsOffsets] = useState({});

    const svgHeight = 1000;
    const svgWidth = svgHeight;
    const fontSize = 26;
    const strokeWidth = 240;
    const innerCircleRadius = svgWidth / 4 - 10; // 240
    const greenOutterOutlinePadding = 60;
    const outterOulineRadius = 420;
    const greenCircleRadius = innerCircleRadius + greenOutterOutlinePadding;
    const outterCircleRadius = 350;
    const xPositionCenterCircle = svgWidth / 2; // 500
    const yPositionCenterCircle = svgWidth / 2; // 500
    const outterCircleCenter = Math.sqrt(outterCircleRadius / ( 2 * Math.PI)) + yPositionCenterCircle;
    const innerCircleCenter = Math.sqrt(innerCircleRadius / ( 2 * Math.PI)) + xPositionCenterCircle;
      
    function resizeCircle(e){
        if(!resize){
            return;
        }

        var newWidth = e.pageX;
        var newHeight = e.pageY;

        setWidth(newWidth);
        setHeight(newHeight)
    }

    function mouseUp(){
        setResize(false);
    }

    useEffect(() => {
        console.log("widthoooo", width)
    }, [width])

    function mouseDown(e){
        setResize(true)
        console.log(e.target.parentElement)
        setCircleOfFifthsOffsets({
            top: e.target.parentElement.offsetTop,
            left: e.target.parentElement.offsetLeft
        })

        console.log({
            top: e.target.parentElement.offsetTop,
            left: e.target.parentElement.offsetLeft
        })
    }

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
            <div onMouseOut={resizeCircle} onMouseMove={resizeCircle} className="circleOfFifths" >
                <svg style={{height: height, minWidth: width}} >
                    <circle  r={outterOulineRadius} fill="white" strokeWidth="2" stroke="black" cx={xPositionCenterCircle} cy={yPositionCenterCircle}/>
                    
                    <circle transform="rotate(15, 500, 500)" r={greenCircleRadius} fill="#fff" strokeWidth={strokeWidth} stroke="darkslategrey" strokeDasharray="1107 1885" cx={xPositionCenterCircle} cy={yPositionCenterCircle}/>
                    
                    <circle  r={greenCircleRadius} fill="#fff" strokeWidth="2" stroke="darkslategrey" cx={xPositionCenterCircle} cy={yPositionCenterCircle}/>
                    
                    <circle id="dashes-circle" r={greenCircleRadius} fill="rgba(1,1,1,0.2)" strokeWidth={strokeWidth} stroke="#0F0F0F" strokeDasharray="1 157" transform="rotate(15, 500, 500)" cx={xPositionCenterCircle} cy={yPositionCenterCircle}/>

                    <circle  r={innerCircleRadius - 50} fill="white" strokeWidth="2" stroke="black" cx={xPositionCenterCircle} cy={yPositionCenterCircle}/>

                    {relatives}
                    {keys}
                </svg>

                <div id="resizer" onMouseDown={mouseDown} onMouseUp={mouseUp}>|||</div>
            </div>
    );
}

export default CircleOfFifths;