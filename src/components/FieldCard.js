import React from 'react';
import CardButton from './CardButton';

const FieldCard = props => {
  const {
    fieldCardIndex,
    onFieldCardPick,
    onCancelPick,
    category,
    fieldCardSelected,
    player
  } = props;

  const isSelected = fieldCardSelected === fieldCardIndex;
  const hasPlayerData = player !== null;

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
            alt={player.lastname}
            src={`/images/players/${player.image}`}
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
      <p className='FieldCard__name'>{hasPlayerData ? player.lastname : ''}</p>
      {!isSelected ? (hasPlayerData ? buttonSwap : buttonAdd) : buttonClose}
    </figcaption>
  );
};

export default FieldCard;
