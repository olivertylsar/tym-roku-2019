import React, { Component } from 'react';
import NomineeCard from './NomineeCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Nominees extends Component {
    render() {
        const {
            squad,
            onNomineePick,
            onCancelPick,
            formation,
            availableNominees,
            fieldCardSelected
        } = this.props;
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
            <section className='Nominees' ref={this.props.scrollRef}>
                <h2 className='heading-2 Nominees__heading'>Nominovaní</h2>
                <TransitionGroup className='Nominees__content'>
                    {nomineesCards}
                </TransitionGroup>
            </section>
        );
    }
}

export default Nominees;
