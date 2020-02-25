import React, { useState, useEffect, useContext } from 'react';
import NomineeCard from './NomineeCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import players from '../players.json';
import { getFieldCardCategory, filterNominees } from '../helpers';
import SquadContext from '../context/SquadContext';

const Nominees = ({ scrollRef, ...other }) => {
  const [availableNominees, setAvailableNominees] = useState(players);
  const { squad, formationDetail, selectedFieldCard } = useContext(
    SquadContext
  );

  // load possible nominees
  useEffect(() => {
    let category =
      selectedFieldCard !== null
        ? getFieldCardCategory(formationDetail, Number(selectedFieldCard))
        : null;
    setAvailableNominees(filterNominees(squad, category));
  }, [squad, selectedFieldCard, formationDetail]);

  const nomineesCards = availableNominees.map(nominee => (
    <CSSTransition key={nominee.id} timeout={500} classNames='Nominee'>
      <NomineeCard key={nominee.id} playerData={nominee} {...other} />
    </CSSTransition>
  ));

  return (
    <section className='Nominees' ref={scrollRef}>
      <h2 className='heading-2 Nominees__heading'>Nominovaní</h2>
      <TransitionGroup className='Nominees__content'>
        {nomineesCards}
      </TransitionGroup>
    </section>
  );
};

export default Nominees;
