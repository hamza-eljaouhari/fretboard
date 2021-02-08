import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import './circle-of-fifths.css'

var xValues = [];
var yValues = [];

var centerX = 50 / 3;
var centerY = 50 / 3
var radius = 50;
var steps = 12
for (var i = 0; i < steps; i++) {
    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
}

console.log([...xValues, ...yValues ])

const useStyles = makeStyles((theme) => ({
    keysPositions: {
        
    }
}));

function CircleOfFifths(){
    const [degreesPositions, setDegreesPositions] = useState([]);
    
    useEffect(() => {
        getDegreesPositions()
    }, [])

   
    function getDegreesPositions(){
        var degreesPositions = []
        
        var xValues = [];
        var yValues = [];

        var center = 50;
        
        var radius = 40;
        
        var steps = 12
        
        for (var i = 0; i < steps; i++) {
            degreesPositions.push({
                top: center + radius * Math.cos(2 * Math.PI * i / steps) + "%",
                left: (center + radius * Math.sin(2 * Math.PI * i / steps)) + "%"
            })
        }
        
        setDegreesPositions(degreesPositions)
    }

    const degrees = degreesPositions.map((degree, index) => {
        return <div className="key" key={index} style={degree}>D</div>
    })

    console.log(degreesPositions)

    return(
        <section className="circleOfFifths">
            <div className="outterCircle">
                <div className="innerCircle">
                    { degrees }
                    <div className="keysh">V</div>
                </div>    
            </div>
        </section>
    );
}

export default CircleOfFifths;