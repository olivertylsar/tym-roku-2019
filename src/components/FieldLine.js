import React from 'react';
import FieldCard from './FieldCard';

const renderFieldCards = fieldCardProps => {
    const {
        fieldLineIndexes,
        category,
        players,
        squad,
        ...other
    } = fieldCardProps;

    const fieldCards = fieldLineIndexes.map(fieldCardIndex => {
        const playerId = squad[fieldCardIndex];
        const isFieldCardVacant = playerId === null;
        const playerData = !isFieldCardVacant
            ? players.find(player => player.id === playerId)
            : null;

        return (
            <FieldCard
                key={fieldCardIndex}
                fieldCardIndex={fieldCardIndex}
                player={playerData}
                category={category}
                {...other}
            />
        );
    });

    return fieldCards;
};

const FieldLine = props => {
    const { label, ...other } = props;
    const fieldCards = renderFieldCards(other);

    return (
        <div className='FieldLine'>
            <h2 className='FieldLine__label'>&nbsp;{label}</h2>
            <div className='FieldLine__players'>{fieldCards}</div>
        </div>
    );
};

export default FieldLine;
