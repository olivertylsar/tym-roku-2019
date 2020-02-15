import React, { useState, useRef } from 'react';
import './App.scss';
import Header from './components/Header';
import Field from './components/Field';
import Nominees from './components/Nominees';
import Modal from './components/Modal';
import players from './players.json';
import { filterNominees, initiateSquad } from './helpers';

const App = () => {
  const [squad, setSquad] = useState(initiateSquad());
  const [fieldCardSelected, setFieldCardSelected] = useState(null);
  const [availableNominees, setAvailableNominees] = useState(players);
  const [showModal, setShowModal] = useState(false);

  const sectionNominees = useRef();

  const formation = {
    attackers: [0, 1],
    midfielders: [2, 3, 4, 5],
    defenders: [6, 7, 8, 9],
    goalkeepers: [10]
  };

  const handleFieldCardPick = (fieldCardIndex, category) => {
    const availableNominees = filterNominees(squad, category);

    setFieldCardSelected(fieldCardIndex);
    setAvailableNominees(availableNominees);

    setTimeout(scrollToNominees, 300);
  };

  const scrollToNominees = () => {
    window.scrollTo({
      top: sectionNominees.current.offsetTop,
      behavior: 'smooth'
    });
  };

  const handleNomineePick = pickedNominee => {
    let fieldCardPosition = fieldCardSelected;
    // do this in case a nominee is added without FieldCard being selected
    if (fieldCardPosition === null) {
      const fieldLineIndexesInCategory = formation[pickedNominee.category];
      // check if there is an empty FieldCard (has to be right category) to be taken by that nominee
      fieldCardPosition = fieldLineIndexesInCategory.find(index => {
        return squad[index] === null;
      });
    }

    const squadAfterPick = [...squad];
    squadAfterPick[fieldCardPosition] = pickedNominee.id;

    const availableNominees = filterNominees(squadAfterPick);

    setSquad(squadAfterPick);
    setFieldCardSelected(null);
    setAvailableNominees(availableNominees);
  };

  const handleCancel = () => {
    const availableNominees = filterNominees(squad);
    setFieldCardSelected(null);
    setAvailableNominees(availableNominees);
  };

  const handleClearSquad = () => {
    const clearedSquad = initiateSquad();
    setSquad(clearedSquad);
    setAvailableNominees(filterNominees(clearedSquad));
  };

  const handleSubmitSquad = () => {
    setShowModal(true);
  };

  const handleSubmitDone = () => {
    handleClearSquad();
    setShowModal(false);
  };

  // check if squad is complete to enable submit button
  const enableSubmitButton = !squad.includes(null);
  // check if squad is not empty to enable clear squad button
  const enableClearSquadButton = !squad.every(val => val === null);

  return (
    <>
      <div className='container'>
        <Header
          onClearSquad={handleClearSquad}
          onSubmitSquad={handleSubmitSquad}
          enableClearSquadButton={enableClearSquadButton}
          enableSubmitButton={enableSubmitButton}
        />
        <Field
          players={players}
          squad={squad}
          onFieldCardPick={handleFieldCardPick}
          onCancelPick={handleCancel}
          formation={formation}
          fieldCardSelected={fieldCardSelected}
        />
        <Nominees
          scrollRef={sectionNominees}
          squad={squad}
          onNomineePick={handleNomineePick}
          onCancelPick={handleCancel}
          formation={formation}
          availableNominees={availableNominees}
          fieldCardSelected={fieldCardSelected}
        />
      </div>
      {showModal && <Modal onSubmitDone={handleSubmitDone} />}
    </>
  );
};

export default App;
