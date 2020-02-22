import React, { useState, useEffect } from 'react';
import NomineeCard from './NomineeCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import players from '../players.json';
import { getFieldCardCategory, filterNominees } from '../helpers';

const Nominees = props => {
  const {
    scrollRef,
    fieldCardSelected,
    squad,
    formationDetail,
    ...other
  } = props;
  const [availableNominees, setAvailableNominees] = useState(players);

  // load possible nominees
  useEffect(() => {
    let category =
      fieldCardSelected !== null
        ? getFieldCardCategory(formationDetail, Number(fieldCardSelected))
        : null;
    setAvailableNominees(filterNominees(squad, category));
  }, [squad, fieldCardSelected, formationDetail]);

  const nomineesCards = availableNominees.map(nominee => (
    <CSSTransition key={nominee.id} timeout={500} classNames='Nominee'>
      <NomineeCard
        key={nominee.id}
        nomineeData={nominee}
        fieldCardSelected={fieldCardSelected}
        squad={squad}
        formationDetail={formationDetail}
        {...other}
      />
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
