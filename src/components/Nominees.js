import React from 'react';
import NomineeCard from './NomineeCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function Nominees(props) {
    const {
        squad,
        onNomineePick,
        onCancelPick,
        formation,
        availableNominees,
        fieldCardSelected
    } = props;
    const nomineesCards = availableNominees.map(nominee => (
        <CSSTransition key={nominee.id} timeout={500} classNames='Nominee'>
            <NomineeCard
                key={nominee.id}
                squad={squad}
                onNomineePick={onNomineePick}
                onCancelPick={onCancelPick}
                formation={formation}
                nomineeData={nominee}
                fieldCardSelected={fieldCardSelected}
            />
        </CSSTransition>
    ));

    return (
        <section className='Nominees'>
            <h2 className='heading-2 Nominees__heading'>Nominovaní</h2>
            <TransitionGroup className='Nominees__content'>
                {nomineesCards}
            </TransitionGroup>
        </section>
    );
}

export default Nominees;
