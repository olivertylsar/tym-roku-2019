import React from 'react';
import CardButton from './CardButton';

const NomineeCard = props => {
  const {
    squad,
    onNomineePick,
    formation,
    nomineeData,
    fieldCardSelected
  } = props;

  const possibleSquadIndexes = formation[nomineeData.category];
  const showButton =
    fieldCardSelected !== null ||
    possibleSquadIndexes
      .map(index => squad[index])
      .some(player => player === null);

  return (
    <figcaption className='NomineeCard'>
      <div className='NomineeCard__image-window'>
        <img
          src={`/images/players/${nomineeData.image}`}
          alt={nomineeData.lastname}
          className='NomineeCard__image'
        />
      </div>
      <p className='NomineeCard__name'>{nomineeData.lastname}</p>
      <p className='NomineeCard__club'>{nomineeData.club}</p>
      <p className='NomineeCard__number'>{nomineeData.number}</p>
      {showButton && (
        <CardButton onClick={() => onNomineePick(nomineeData)} icon='add' />
      )}
    </figcaption>
  );
};

export default NomineeCard;
