import React from 'react';
import FieldCard from './FieldCard';

function FieldLine(props) {
    const renderFieldCards = props => {
        const {
            fieldLineIndexes,
            category,
            players,
            squad,
            onFieldCardPick,
            onCancelPick,
            fieldCardSelected
        } = props;

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
                    onFieldCardPick={onFieldCardPick}
                    onCancelPick={onCancelPick}
                    category={category}
                    fieldCardSelected={fieldCardSelected}
                />
            );
        });

        return fieldCards;
    };

    const { label, ...fieldCardProps } = props;
    const fieldCards = renderFieldCards(fieldCardProps);

    return (
        <div className='FieldLine'>
            <h2 className='FieldLine__label'>&nbsp;{label}</h2>
            <div className='FieldLine__players'>{fieldCards}</div>
        </div>
    );
}

export default FieldLine;
