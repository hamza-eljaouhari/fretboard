import './circle-of-fifths.css'
import guitar from '../config/guitar';
import { connect } from "react-redux";
import React, { useState } from 'react';

import { 
    setKey,
    setScale,
    setMode
} from "../redux/actions";

const outterCirlce = guitar.circleOfFifths.map((key) => {return key.key });
const innerCircle = guitar.circleOfFifths.map((key) => { return key.relative });

const CircleOfFifths = ({
    setKey,
    setScale,
    setMode,
    selectedTone,
    onElementChange
}) => {
    const majorRadius = 150; // Radius of the circle for major tones
    const minorRadius = 110; // Radius for the inner circle of minor tones
    const majorTones = outterCirlce;
    const minorTones = innerCircle; // Relative minors
    
    // Function to calculate position for each tone, adjusting so 'C' starts at the top
    const calculatePosition = (angleDegrees, radius) => {
        // Adjusting the starting angle by -90 degrees to move 'C' to the top
        const radians = ((angleDegrees - 180) * Math.PI) / 180;
        return {
            x: radius * Math.cos(radians),
            y: radius * Math.sin(radians)
        };
    };

    const selectKey = (tone) => {
        const indexOfTone = guitar.notes.flats.indexOf(tone);
        onElementChange(indexOfTone, 'key');
    }

    // Calculate rotation based on selected tone, keeping 'C' at the top
    const rotationAngle = -30 * majorTones.indexOf(selectedTone) + 90; // Add 90 to correct for the initial offset

    return (
        <div>
            <svg width="400" height="400" viewBox="-200 -200 400 400" xmlns="http://www.w3.org/2000/svg">
                <g className="circleOfFifthsTransition" transform={`rotate(${rotationAngle}, 0, 0)`}>
                    <circle cx="0" cy="0" r={majorRadius} fill="none" stroke="black" />
                    <circle cx="0" cy="0" r={minorRadius} fill="none" stroke="black" />
                    {majorTones.map((tone, index) => {
                        const position = calculatePosition(index * 30, majorRadius);
                        const counterRotationAngle = -rotationAngle; // Counter rotation to keep text upright
                        return (
                            <g key={tone} transform={`translate(${position.x}, ${position.y})`}>
                                <circle cx="0" cy="0" r="20" fill="white" stroke="black" />
                                <text
                                    x="0"
                                    y="0"
                                    fontSize="12"
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    transform={`rotate(${counterRotationAngle})`} // Apply counter rotation here
                                    onClick={() => selectKey(tone)}
                                >
                                    {tone}
                                </text>
                            </g>
                        );
                    })}
                    {minorTones.map((tone, index) => {
                        const position = calculatePosition(index * 30, minorRadius);
                        const counterRotationAngle = -rotationAngle; // Counter rotation to keep text upright
                        return (
                            <g key={`minor-${tone}`} transform={`translate(${position.x}, ${position.y})`}>
                                <circle cx="0" cy="0" r="15" fill="white" stroke="black" /> {/* Smaller circle for minors */}
                                <text
                                    x="0"
                                    y="0"
                                    fontSize="10" // Smaller font size for minors
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    transform={`rotate(${counterRotationAngle})`} // Apply counter rotation here
                                    fill="black"
                                     // Different text color for minors
                                >
                                    {tone}
                                </text>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};

export default CircleOfFifths;
