import React from 'react';

function NomineeCard(props) {
    const { squad, onNomineePick, formation, nomineeData, fieldCardSelected } = props;
    const possibleSquadIndexes = formation[nomineeData.category];
    const showButton = fieldCardSelected !== null || possibleSquadIndexes.map(index => squad[index]).some(index => index === null);

    return (
        <figcaption className='NomineeCard'>
            <div className='NomineeCard__image-window'>
                <img
                    src={`/images/players/${nomineeData.image}`}
                    alt=''
                    className='NomineeCard__image'
                />
            </div>
            <p className='NomineeCard__name'>{nomineeData.lastname}</p>
            <p className='NomineeCard__club'>{nomineeData.club}</p>
            <p className='NomineeCard__number'>{nomineeData.number}</p>
            {showButton &&
            <button className='rounded-btn' onClick={() => onNomineePick(nomineeData)}>
                <svg className='rounded-btn__icon'>
                    <use xlinkHref='images/sprite.svg#icon-plus'></use>
                </svg>
            </button>
            }
        </figcaption>
    );
}

export default NomineeCard;
