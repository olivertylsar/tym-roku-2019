import React from 'react';

const Header = props => {
  const {
    onClearSquad,
    onSubmitSquad,
    enableClearSquadButton,
    enableSubmitButton,
    formations,
    handleSelectFormation
  } = props;
  const formationOptions = Object.keys(formations).map(formation => (
    <option key={formation}>{formation}</option>
  ));

  return (
    <>
      <h1 className='heading-1 Header__heading'>
        Vyber si svůj <span>tým roku!</span>
      </h1>
      <div className='Header__actions'>
        <select className='Header__select' onChange={handleSelectFormation}>{formationOptions}</select>
        <button
          className='btn btn--delete Header__btn'
          onClick={onClearSquad}
          disabled={!enableClearSquadButton}
        >
          Smazat <span>mužstvo</span>
        </button>
        <button
          className='btn btn--submit Header__btn'
          onClick={onSubmitSquad}
          disabled={!enableSubmitButton}
        >
          Odeslat <span>mužstvo</span>
        </button>
      </div>
    </>
  );
};

export default Header;
