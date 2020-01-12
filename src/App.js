import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
import Field from './components/Field';
import Nominees from './components/Nominees';
import Modal from './components/Modal';
import players from './data.json';
import { filterNominees, initiateSquad } from './helpers';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            squad: initiateSquad(),
            formation: {
                attackers: [0, 1],
                midfielders: [2, 3, 4, 5],
                defenders: [6, 7, 8, 9],
                goalkeepers: [10]
            },
            fieldCardSelected: null,
            availableNominees: players,
            showModal: false
        };
        this.handleFieldCardPick = this.handleFieldCardPick.bind(this);
        this.handleNomineePick = this.handleNomineePick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleClearSquad = this.handleClearSquad.bind(this);
        this.scrollToNominees = this.scrollToNominees.bind(this);
        this.handleSubmitSquad = this.handleSubmitSquad.bind(this);
        this.handleSubmitDone = this.handleSubmitDone.bind(this);

        this.sectionNominees = React.createRef();
    }

    handleFieldCardPick(fieldCardIndex, category) {
        const availableNominees = filterNominees(this.state.squad, category);

        this.setState({
            fieldCardSelected: fieldCardIndex,
            availableNominees
        });

        setTimeout(this.scrollToNominees, 300);
    }

    scrollToNominees() {
        window.scrollTo({
            top: this.sectionNominees.current.offsetTop,
            behavior: 'smooth'
        });
    }

    handleNomineePick(pickedNominee) {
        let { squad, fieldCardSelected } = this.state;

        // do this in case a nominee is added without FieldCard being selected
        if (this.state.fieldCardSelected === null) {
            const fieldsInCategory = this.state.formation[
                pickedNominee.category
            ];
            // check if there is an empty FieldCard (has to be right category) to be taken by that nominee
            fieldCardSelected = fieldsInCategory.find(index => {
                return squad[index] === null;
            });
        }

        const squadAfterPick = [...squad];
        squadAfterPick[fieldCardSelected] = pickedNominee.id;

        const availableNominees = filterNominees(squadAfterPick);

        this.setState({
            squad: squadAfterPick,
            fieldCardSelected: null,
            availableNominees
        });
    }

    handleCancel() {
        const availableNominees = filterNominees(this.state.squad);

        this.setState({
            fieldCardSelected: null,
            availableNominees
        });
    }

    handleClearSquad() {
        const clearedSquad = initiateSquad();
        this.setState({
            squad: clearedSquad,
            availableNominees: filterNominees(clearedSquad)
        });
    }

    handleSubmitSquad() {
        this.setState({
            showModal: true
        });
    }

    handleSubmitDone() {
        this.handleClearSquad();
        this.setState({
            showModal: false
        });
    }

    render() {
        const {
            squad,
            formation,
            fieldCardSelected,
            availableNominees,
            showModal
        } = this.state;

        // check if squad is complete to enable submit button
        const enableSubmitButton = !squad.includes(null);
        // check if squad is not empty to enable clear squad button
        const enableClearSquadButton = !squad.every(val => val === null);

        return (
            <>
                <div className='container'>
                    <Header
                        onClearSquad={this.handleClearSquad}
                        onSubmitSquad={this.handleSubmitSquad}
                        enableClearSquadButton={enableClearSquadButton}
                        enableSubmitButton={enableSubmitButton}
                    />
                    <Field
                        players={players}
                        squad={squad}
                        onFieldCardPick={this.handleFieldCardPick}
                        onCancelPick={this.handleCancel}
                        formation={formation}
                        fieldCardSelected={fieldCardSelected}
                    />
                    <Nominees
                        scrollRef={this.sectionNominees}
                        squad={squad}
                        onNomineePick={this.handleNomineePick}
                        onCancelPick={this.handleCancel}
                        formation={formation}
                        availableNominees={availableNominees}
                        fieldCardSelected={fieldCardSelected}
                    />
                </div>
                {showModal && <Modal onSubmitDone={this.handleSubmitDone} />}
            </>
        );
    }
}

export default App;
