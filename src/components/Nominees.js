import React, { Component } from 'react';
import NomineeCard from './NomineeCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Nominees extends Component {
    render() {
        const {
            availableNominees,
            scrollRef,
            ...nomineeCardProps
        } = this.props;
        
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
    }
}

export default Nominees;
