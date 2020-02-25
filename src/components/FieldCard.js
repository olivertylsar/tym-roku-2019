import React, { useContext } from 'react';
import CardButton from './CardButton';
import SquadContext from '../context/SquadContext';

const FieldCard = props => {
  const {
    fieldCardIndex,
    onFieldCardPick,
    onCancelPick,
    category,
    playerData
  } = props;

  const { selectedFieldCard } = useContext(SquadContext);
  const isSelected = selectedFieldCard === fieldCardIndex;
  const hasPlayerData = playerData !== null;

  const handleFieldCardPick = () => onFieldCardPick(fieldCardIndex, category);

  const buttonAdd = <CardButton onClick={handleFieldCardPick} icon='add' />;
  const buttonSwap = <CardButton onClick={handleFieldCardPick} icon='swap' />;
  const buttonClose = <CardButton onClick={onCancelPick} icon='close' />;

  return (
    <figcaption
      className={isSelected ? 'FieldCard FieldCard--selected' : 'FieldCard'}
    >
      <div className='FieldCard__image-window'>
        {hasPlayerData ? (
          <img
            alt={playerData.lastname}
            src={`/images/players/${playerData.image}`}
            className='FieldCard__image FieldCard__image--player'
          />
        ) : (
          <img
            alt='default'
            src='/images/players/default.png'
            className='FieldCard__image FieldCard__image--default'
          />
        )}
      </div>
      <p className='FieldCard__name'>{hasPlayerData ? playerData.lastname : ''}</p>
      {!isSelected ? (hasPlayerData ? buttonSwap : buttonAdd) : buttonClose}
    </figcaption>
  );
};

export default FieldCard;
