import React, { useContext } from 'react';
import CardButton from './CardButton';
import SquadContext from '../context/SquadContext';

const NomineeCard = ({ onNomineePick, playerData }) => {
  const { squad, formationDetail, selectedFieldCard } = useContext(
    SquadContext
  );

  const possibleSquadIndexes = formationDetail[playerData.category];
  const showButton =
    selectedFieldCard !== null ||
    possibleSquadIndexes
      .map(index => squad[index])
      .some(player => player === null);

  return (
    <figcaption className='NomineeCard'>
      <div className='NomineeCard__image-window'>
        <img
          src={`/images/players/${playerData.image}`}
          alt={playerData.lastname}
          className='NomineeCard__image'
        />
      </div>
      <p className='NomineeCard__name'>{playerData.lastname}</p>
      <p className='NomineeCard__club'>{playerData.club}</p>
      <p className='NomineeCard__number'>{playerData.number}</p>
      {showButton && (
        <CardButton onClick={() => onNomineePick(playerData)} icon='add' />
      )}
    </figcaption>
  );
};

export default NomineeCard;
