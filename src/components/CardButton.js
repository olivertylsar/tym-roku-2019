import React from 'react';

const CardButton = ({ onClick, icon }) => {
  return (
    <button className='rounded-btn' onClick={onClick}>
      <span className={`rounded-btn__icon rounded-btn__icon--${icon}`}></span>
    </button>
  );
};

export default CardButton;
