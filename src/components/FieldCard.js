import React from 'react';

function FieldCard(props) {
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

    // const iconPlus = <svg className='rounded-btn__icon'><use xlinkHref='images/sprite.svg#icon-plus'></use></svg>;
    // const iconChange = <svg className='rounded-btn__icon'><use xlinkHref='images/sprite.svg#icon-cycle'></use></svg>;
    // const iconClose = <svg className='rounded-btn__icon'><use xlinkHref='images/sprite.svg#icon-cross'></use></svg>;

    return (
        <figcaption className={isSelected ? 'FieldCard FieldCard--selected' : 'FieldCard'}>
            <div className='FieldCard__image-window'>
                {hasPlayerData ? (
                    <img
                        alt={player.lastname}
                        src={`/images/players/${player.image}`}
                        className='FieldCard__image FieldCard__image--player'
                    />
                ) : (
                    <img alt='default' src='/images/players/default.png' className='FieldCard__image FieldCard__image--default' />
                )}
            </div>
            <p className='FieldCard__name'>{hasPlayerData ? player.lastname : ''}</p>
            {!isSelected ? (
                hasPlayerData ? (
                    <button className='rounded-btn' onClick={() => onFieldCardPick(fieldCardIndex, category)}>
                        ⇄
                    </button>
                ) : (
                    <button className='rounded-btn' onClick={() => onFieldCardPick(fieldCardIndex, category)}>
                        +
                    </button> 
                )
            ) : (
                <button className='rounded-btn' onClick={onCancelPick}>
                    ×
                </button>
            )}
        </figcaption>
    );
}

export default FieldCard;
