import React, { useContext } from 'react';
import { getFormationLabels } from '../helpers';
import SquadContext from '../context/SquadContext';

const Header = props => {
  const {
    onClearSquad,
    onSubmitSquad,
    onFormationSelect,
    selectedFormation
  } = props;

  const { squad, selectedFieldCard } = useContext(SquadContext);
  const isFieldCardSelected = selectedFieldCard !== null;

  // check if squad is complete to enable submit button
  const enableSubmitButton = !squad.includes(null) && !isFieldCardSelected;
  // check if squad is not empty to enable clear squad button
  const enableClearSquadButton =
    !squad.every(val => val === null) && !isFieldCardSelected;

  const formationOptions = getFormationLabels().map(formation => (
    <option key={formation}>{formation}</option>
  ));

  return (
    <>
      <h1 className='heading-1 Header__heading'>
        Vyber si svůj <span>tým roku!</span>
      </h1>
      <div className='Header__actions'>
        <select
          className='Header__select'
          onChange={onFormationSelect}
          value={selectedFormation}
        >
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
