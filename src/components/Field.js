import React, { Component } from 'react';
import FieldLine from './FieldLine';

class Field extends Component {
    render() {
        const {
            players,
            formation,
            squad,
            onFieldCardPick,
            onCancelPick,
            fieldCardSelected
        } = this.props;

        const categories = [
            'attackers',
            'midfielders',
            'defenders',
            'goalkeepers'
        ];
        const labels = ['útočníci', 'záložníci', 'obránci', 'brankář'];
        const fieldLines = categories.map((category, index) => (
            <FieldLine
                key={index}
                label={labels[index]}
                data={formation[category]}
                players={players}
                squad={squad}
                onFieldCardPick={onFieldCardPick}
                onCancelPick={onCancelPick}
                fieldCardSelected={fieldCardSelected}
                category={category}
            />
        ));

        return (
            <div className='Field'>
                {fieldLines}
            </div>
        );
    }
}

export default Field;
