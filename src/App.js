import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
import Field from './components/Field';
import Nominees from './components/Nominees';
import players from './data.json';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            squad: Array(11).fill(null),
            formation: {
                attackers: [0, 1],
                midfielders: [2, 3, 4, 5],
                defenders: [6, 7, 8, 9],
                goalkeepers: [10]
            },
            fieldCardSelected: null,
            availableNominees: players,
            showNominees: true
        };
        this.handleFieldCardPick = this.handleFieldCardPick.bind(this);
        this.handleNomineePick = this.handleNomineePick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleClearSquad = this.handleClearSquad.bind(this);
    }

    handleFieldCardPick(fieldCardIndex, category) {
        this.setState({
            fieldCardSelected: fieldCardIndex
        });
        const availableNominees = Object.values(players).filter(player => {
            const isInCategory = player.category === category;
            const isPlayerInField = this.state.squad.includes(player.id);
            return isInCategory && !isPlayerInField;
        });

        this.setState({
            showNominees: true,
            availableNominees
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
                return squad[index] === null
            });
        }

        const squadAfterPick = [...squad];
        squadAfterPick[fieldCardSelected] = pickedNominee.id;

        const availableNominees = Object.values(players).filter(player => {
            const isPlayerInField = squadAfterPick.includes(player.id);
            return !isPlayerInField;
        });

        this.setState({
            squad: squadAfterPick,
            fieldCardSelected: null,
            availableNominees
        });
    }

    handleCancel() {
        const availableNominees = Object.values(players).filter(player => {
            const isPlayerInField = this.state.squad.includes(player.id);
            return !isPlayerInField;
        });

        this.setState({
            fieldCardSelected: null,
            availableNominees
        });
    }

    handleClearSquad() {
        this.setState({
            squad: Array(11).fill(null),
            availableNominees: players
        });
    }

    render() {
        const {
            squad,
            formation,
            fieldCardSelected,
            availableNominees
        } = this.state;

        return (
            <div className='container'>
                <Header onClearSquad={this.handleClearSquad} />
                <Field
                    players={players}
                    squad={squad}
                    onFieldCardPick={this.handleFieldCardPick}
                    onNomineePick={this.handleNomineePick}
                    onCancelPick={this.handleCancel}
                    formation={formation}
                    fieldCardSelected={fieldCardSelected}
                />
                <Nominees
                    squad={squad}
                    onNomineePick={this.handleNomineePick}
                    onCancelPick={this.handleCancel}
                    formation={formation}
                    availableNominees={availableNominees}
                    fieldCardSelected={fieldCardSelected}
                />
            </div>
        );
    }
}

export default App;
