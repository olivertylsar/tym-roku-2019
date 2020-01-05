import React from 'react';
import NomineeCard from './NomineeCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Nominees = props => {
    const { availableNominees, scrollRef, ...nomineeCardProps } = props;

    const nomineesCards = availableNominees.map(nominee => (
        <CSSTransition key={nominee.id} timeout={500} classNames='Nominee'>
            <NomineeCard
                key={nominee.id}
                nomineeData={nominee}
                {...nomineeCardProps}
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
