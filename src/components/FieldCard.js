import React from 'react';

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

    const buttonAdd = (
        <button
            className='rounded-btn'
            onClick={() => onFieldCardPick(fieldCardIndex, category)}
        >
            <span className='rounded-btn__icon rounded-btn__icon--add'></span>
        </button>
    );

    const buttonChange = (
        <button
            className='rounded-btn'
            onClick={() => onFieldCardPick(fieldCardIndex, category)}
        >
            <span className='rounded-btn__icon rounded-btn__icon--change'></span>
        </button>
    );

    const buttonClose = (
        <button className='rounded-btn' onClick={onCancelPick}>
            <span className='rounded-btn__icon rounded-btn__icon--close'></span>
        </button>
    );

    return (
        <figcaption
            className={
                isSelected ? 'FieldCard FieldCard--selected' : 'FieldCard'
            }
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
            <p className='FieldCard__name'>
                {hasPlayerData ? player.lastname : ''}
            </p>
            {!isSelected
                ? hasPlayerData
                    ? buttonChange
                    : buttonAdd
                : buttonClose}
        </figcaption>
    );
};

export default FieldCard;
