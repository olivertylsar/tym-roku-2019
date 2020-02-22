import React from 'react';
import FieldCard from './FieldCard';
import players from '../players.json';

const renderFieldCards = fieldCardProps => {
  const {
    fieldLineIndexes,
    category,
    squad,
    resetSquadIndex,
    ...other
  } = fieldCardProps;

  const fieldCards = fieldLineIndexes.map(fieldCardIndex => {
    const playerId = squad[fieldCardIndex];
    const isFieldCardVacant = !playerId;

    const playerData = !isFieldCardVacant
      ? players.find(player =>
          playerId === player.id
            ? category === player.category
              ? true
              : function() {
                  resetSquadIndex(fieldCardIndex);
                  return false;
                }()
            : false
        )
      : null;

    return (
      <FieldCard
        key={fieldCardIndex}
        fieldCardIndex={fieldCardIndex}
        player={playerData ? playerData : null}
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
      <h2 className='FieldLine__label'>{label}</h2>
      <div className='FieldLine__players'>{fieldCards}</div>
    </div>
  );
};

export default FieldLine;
