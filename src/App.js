import React, { useState, useRef, useEffect } from 'react';
import './App.scss';
import Header from './components/Header';
import Field from './components/Field';
import Nominees from './components/Nominees';
import Modal from './components/Modal';
import players from './players.json';
import formations from './formations.json';
import { filterNominees, initiateSquad, getFieldCardCategory } from './helpers';

const App = () => {
  const localData = {
    squad: JSON.parse(localStorage.getItem('squad')) || initiateSquad(),
    selectedFormation: localStorage.getItem('formation') || '4-4-2'
  };

  const [squad, setSquad] = useState(localData.squad);
  const [fieldCardSelected, setFieldCardSelected] = useState(null);
  const [availableNominees, setAvailableNominees] = useState(players);
  const [showModal, setShowModal] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(
    localData.selectedFormation
  );

  const formation = formations[selectedFormation];

  // persist squad and formation into localStorage to prevent data loss after refresh
  useEffect(() => {
    localStorage.setItem('squad', JSON.stringify(squad));
    localStorage.setItem('formation', selectedFormation);
  }, [squad, selectedFormation]);

  // load possible nominees
  useEffect(() => {
    let category =
      fieldCardSelected !== null
        ? getFieldCardCategory(formation, Number(fieldCardSelected))
        : null;
    setAvailableNominees(filterNominees(squad, category));
  }, [squad, fieldCardSelected, formation]);

  const sectionNominees = useRef();
  const scrollToNominees = () => {
    window.scrollTo({
      top: sectionNominees.current.offsetTop,
      behavior: 'smooth'
    });
  };

  // scroll to nominees after field card is selected
  useEffect(() => {
    if (fieldCardSelected !== null) {
      setTimeout(scrollToNominees, 300);
    }
    return clearTimeout();
  });

  const handleFieldCardPick = fieldCardIndex => {
    setFieldCardSelected(fieldCardIndex);
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

    setSquad(squadAfterPick);
    setFieldCardSelected(null);
  };

  const handleCancel = () => {
    setFieldCardSelected(null);
  };

  const handleSelectFormation = e => {
    setSelectedFormation(e.currentTarget.value);
  };

  const resetSquadIndex = squadIndex => {
    let newSquad = [...squad];
    newSquad[squadIndex] = null;
    setSquad(newSquad);
  };

  const handleClearSquad = () => {
    const clearedSquad = initiateSquad();
    setSquad(clearedSquad);
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
          formations={formations}
          handleSelectFormation={handleSelectFormation}
          selectedFormation={selectedFormation}
        />
        <Field
          players={players}
          squad={squad}
          onFieldCardPick={handleFieldCardPick}
          onCancelPick={handleCancel}
          formation={formation}
          fieldCardSelected={fieldCardSelected}
          resetSquadIndex={resetSquadIndex}
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
