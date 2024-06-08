import './circle-of-fifths.css';
import guitar from '../config/guitar';
import React from 'react';

const CircleOfFifths = ({
    setKeyForChoice,
    selectedTone,
    quality,
    selectedFretboardIndex,
    choice,
    onElementChange
}) => {
    const majorRadius = 150; // Radius of the circle for major tones
    const minorRadius = 110; // Radius for the inner circle of minor tones
    const majorTones = guitar.circleOfFifths.map((key) => key.key);
    const minorTones = guitar.circleOfFifths.map((key) => key.relative);

    console.log("tone ", selectedTone);
    console.log("quality ", quality);
    
    const calculatePosition = (angleDegrees, radius) => {
        const radians = ((angleDegrees - 90) * Math.PI) / 180; // Adjusting the starting angle by -90 degrees to move 'C' to the top
        return {
            x: radius * Math.cos(radians),
            y: radius * Math.sin(radians)
        };
    };

    const selectKey = (tone) => {
        const indexOfTone = guitar.notes.flats.indexOf(tone.replace('m', '')); // Remove 'm' for minor tones
        setKeyForChoice(selectedFretboardIndex, choice, indexOfTone);
        onElementChange(indexOfTone, 'key');
    };

    let rotationAngle = 0;
    let selectedMajorTone = selectedTone;
    let selectedMinorTone = selectedTone;

    if (quality === "Major") {
        const majorIndex = majorTones.indexOf(selectedTone);
        if (majorIndex !== -1) {
            rotationAngle = -30 * majorIndex;
            selectedMinorTone = guitar.circleOfFifths[majorIndex].relative;
        }
    } else {
        const minorIndex = minorTones.indexOf(selectedTone + 'm');
        if (minorIndex !== -1) {
            rotationAngle = -30 * minorIndex;
            selectedMajorTone = guitar.circleOfFifths.find(key => key.relative === selectedTone)?.key;
        }
    }

    const shouldBeHighlighted = (index, isMajor) => {
        const tones = isMajor ? majorTones : minorTones;
        const selectedIndex = tones.indexOf(isMajor ? selectedMajorTone : selectedMinorTone);
        if (selectedIndex === -1) return false;

        const highlightedIndices = [];
        for (let i = -1; i <= 5; i++) {
            highlightedIndices.push((selectedIndex + i + tones.length) % tones.length);
        }

        return highlightedIndices.includes(index);
    };

    return (
        <div>
            <svg width="400" height="400" viewBox="-200 -200 400 400" xmlns="http://www.w3.org/2000/svg">
                <g className="circleOfFifthsTransition" transform={`rotate(${rotationAngle}, 0, 0)`}>
                    <circle cx="0" cy="0" r={majorRadius} fill="none" stroke="black" />
                    <circle cx="0" cy="0" r={minorRadius} fill="none" stroke="black" />
                    {majorTones.map((tone, index) => {
                        const position = calculatePosition(index * 30, majorRadius);
                        const counterRotationAngle = -rotationAngle;
                        const isHighlighted = shouldBeHighlighted(index, true);

                        return (
                            <g key={tone} transform={`translate(${position.x}, ${position.y})`}>
                                <circle cx="0" cy="0" r="20" fill={isHighlighted ? "#D04848" : "white"} stroke="black" />
                                <text
                                    x="0"
                                    y="0"
                                    fontSize="12"
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    transform={`rotate(${counterRotationAngle})`}
                                    onClick={() => selectKey(tone)}
                                >
                                    {tone}
                                </text>
                            </g>
                        );
                    })}
                    {minorTones.map((tone, index) => {
                        const position = calculatePosition(index * 30, minorRadius);
                        const counterRotationAngle = -rotationAngle;
                        const isHighlighted = shouldBeHighlighted(index, false);

                        return (
                            <g key={`minor-${tone}-${index}`} transform={`translate(${position.x}, ${position.y})`}>
                                <circle cx="0" cy="0" r="15" fill={isHighlighted ? "#1E90FF" : "white"} stroke="black" />
                                <text
                                    x="0"
                                    y="0"
                                    fontSize="10"
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    transform={`rotate(${counterRotationAngle})`}
                                    onClick={() => selectKey(tone.replace('m', ''))} // Strip 'm' when selecting key
                                    fill="black"
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
