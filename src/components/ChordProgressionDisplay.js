import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Typography, CardContent, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import guitar from '../config/guitar';

const ChordProgressionDisplay = ({ progression, setProgression}) => {
    // State to keep track of the chord progression

    // Function to handle the end of a drag event
    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(progression);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setProgression(items);
    };

    if (!progression || progression.length === 0) {
        return <Typography>No chord progression to display.</Typography>;
    }

    const handleDelete = (index) => {
        // Filter out the chord that needs to be deleted
        const newProgression = progression.filter((_, i) => i !== index);
        setProgression(newProgression);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chords">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap', gap: '16px', padding: '20px' }}>
                        {progression.length && progression.map((object, index) => (
                            <Draggable key={index} draggableId={String(index)} index={index}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <Card key={index} style={{ minWidth: '120px', textAlign: 'center', backgroundColor: snapshot.isDragging ? '#f0f0f0' : 'white', position: 'relative' }}>
                                            <IconButton
                                                onClick={() => handleDelete(index)}
                                                style={{ position: 'absolute', right: 0, top: 0 }}
                                                aria-label="Delete chord">
                                                <DeleteIcon />
                                            </IconButton>
                                            <CardContent>
                                                <Typography variant="h6">{guitar.notes.sharps[object.key]}{object.chord}</Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ChordProgressionDisplay;
