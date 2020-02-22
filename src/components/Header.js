import React from 'react';
import { getFormationLabels } from '../helpers';

const Header = props => {
  const {
    onClearSquad,
    onSubmitSquad,
    enableClearSquadButton,
    enableSubmitButton,
    handleSelectFormation,
    selectedFormation
  } = props;

  const formationOptions = getFormationLabels().map(formation => (
    <option key={formation}>{formation}</option>
  ));

  return (
    <>
      <h1 className='heading-1 Header__heading'>
        Vyber si svůj <span>tým roku!</span>
      </h1>
      <div className='Header__actions'>
        <select className='Header__select' onChange={handleSelectFormation} value={selectedFormation}>
          {formationOptions}
        </select>
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
