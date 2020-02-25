import React, { useContext } from 'react';
import FieldCard from './FieldCard';
import players from '../players.json';
import SquadContext from '../context/SquadContext';

const renderFieldCards = fieldCardProps => {
  const {
    fieldLineIndexes,
    category,
    resetSquadIndex,
    squad,
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
              : (function() {
                  resetSquadIndex(fieldCardIndex);
                  return false;
                })()
            : false
        )
      : null;

    return (
      <FieldCard
        key={fieldCardIndex}
        fieldCardIndex={fieldCardIndex}
        playerData={playerData ? playerData : null}
        category={category}
        {...other}
      />
    );
  });

  return fieldCards;
};

const FieldLine = ({ label, ...other }) => {
  const { squad } = useContext(SquadContext);
  const fieldCards = renderFieldCards({ ...other, squad });

  return (
    <div className='FieldLine'>
      <h2 className='FieldLine__label'>{label}</h2>
      <div className='FieldLine__players'>{fieldCards}</div>
    </div>
  );
};

export default FieldLine;
