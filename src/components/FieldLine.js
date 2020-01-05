import React, { Component } from 'react';
import FieldCard from './FieldCard';

class FieldLine extends Component {
    renderFieldCards(formationIndexes, category) {
        const {
            players,
            squad,
            onFieldCardPick,
            onCancelPick,
            fieldCardSelected
        } = this.props;

        let fieldCards = [];
        const firstIndex = formationIndexes[0];
        const lastIndex = formationIndexes[formationIndexes.length - 1];

        for (let i = firstIndex; i <= lastIndex; i++) {
            const playerId = squad[i];
            const isFieldCardVacant = playerId === null;
            const playerData = !isFieldCardVacant
                ? players.find(player => player.id === playerId)
                : null;

            fieldCards.push(
                <FieldCard
                    squadIndex={i}
                    key={i}
                    onFieldCardPick={onFieldCardPick}
                    onCancelPick={onCancelPick}
                    category={category}
                    fieldCardSelected={fieldCardSelected}
                    player={playerData}
                />
            );
        }
        return fieldCards;
    }
    render() {
        const { label, data, category } = this.props;
        const fieldCards = this.renderFieldCards(data, category);
        return (
            <div className='FieldLine'>
                <h2 className='FieldLine__label'>&nbsp;{label}</h2>
                <div className='FieldLine__players'>{fieldCards}</div>
            </div>
        );
    }
}

export default FieldLine;
