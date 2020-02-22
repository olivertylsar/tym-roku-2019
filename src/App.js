import React, { useState, useRef, useEffect } from 'react';
import './App.scss';
import Header from './components/Header';
import Field from './components/Field';
import Nominees from './components/Nominees';
import Modal from './components/Modal';
import { initiateSquad, getFormationDetail } from './helpers';
import Layout from './components/Layout';

const App = () => {
  const localData = {
    squad: JSON.parse(localStorage.getItem('squad')) || initiateSquad(),
    selectedFormation: localStorage.getItem('selectedFormation') || '4-4-2'
  };

  const [squad, setSquad] = useState(localData.squad);
  const [fieldCardSelected, setFieldCardSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(
    localData.selectedFormation
  );

  const isFieldCardSelected = fieldCardSelected !== null;
  const formationDetail = getFormationDetail(selectedFormation);

  // persist squad and formation into localStorage to prevent data loss after refresh
  useEffect(() => {
    localStorage.setItem('squad', JSON.stringify(squad));
    localStorage.setItem('selectedFormation', selectedFormation);
  }, [squad, selectedFormation]);

  const sectionNominees = useRef();
  const scrollToNominees = () => {
    window.scrollTo({
      top: sectionNominees.current.offsetTop,
      behavior: 'smooth'
    });
  };

  // scroll to nominees after field card is selected
  useEffect(() => {
    if (isFieldCardSelected) {
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
      const fieldLineIndexesInCategory =
        formationDetail[pickedNominee.category];
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
  const enableSubmitButton = !squad.includes(null) && !isFieldCardSelected;
  // check if squad is not empty to enable clear squad button
  const enableClearSquadButton =
    !squad.every(val => val === null) && !isFieldCardSelected;
  

  return (
    <>
      <Layout>
        <Header
          onClearSquad={handleClearSquad}
          onSubmitSquad={handleSubmitSquad}
          enableClearSquadButton={enableClearSquadButton}
          enableSubmitButton={enableSubmitButton}
          handleSelectFormation={handleSelectFormation}
          selectedFormation={selectedFormation}
        />
        <Field
          squad={squad}
          onFieldCardPick={handleFieldCardPick}
          onCancelPick={handleCancel}
          formationDetail={formationDetail}
          fieldCardSelected={fieldCardSelected}
          resetSquadIndex={resetSquadIndex}
        />
        <Nominees
          scrollRef={sectionNominees}
          squad={squad}
          onNomineePick={handleNomineePick}
          onCancelPick={handleCancel}
          formationDetail={formationDetail}
          fieldCardSelected={fieldCardSelected}
        />
      </Layout>
      {showModal && <Modal onSubmitDone={handleSubmitDone} />}
    </>
  );
};

export default App;
