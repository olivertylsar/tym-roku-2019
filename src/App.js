import React, { useState, useRef, useEffect } from 'react';
import './App.scss';
import Header from './components/Header';
import Field from './components/Field';
import Nominees from './components/Nominees';
import Modal from './components/Modal';
import Layout from './components/Layout';
import { initiateSquad, getFormationDetail } from './helpers';
import { SquadProvider } from './context/SquadContext';

const App = () => {
  const localData = {
    squad: JSON.parse(localStorage.getItem('squad')) || initiateSquad(),
    selectedFormation: localStorage.getItem('selectedFormation') || '4-4-2'
  };

  const [squad, setSquad] = useState(localData.squad);
  const [selectedFieldCard, setSelectedFieldCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(
    localData.selectedFormation
  );

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
    if (selectedFieldCard !== null) {
      setTimeout(scrollToNominees, 300);
    }
    return clearTimeout();
  });

  const handleFieldCardPick = fieldCardIndex => {
    setSelectedFieldCard(fieldCardIndex);
  };

  const handleNomineePick = pickedNominee => {
    let fieldCardPosition = selectedFieldCard;
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
    setSelectedFieldCard(null);
  };

  const handleCancel = () => {
    setSelectedFieldCard(null);
  };

  const handleFormationSelect = e => {
    setSelectedFormation(e.currentTarget.value);
  };

  const resetSquadIndex = squadIndex => {
    let newSquad = [...squad];
    newSquad[squadIndex] = null;
    setSquad(newSquad);
  };

  const handleClearSquad = () => {
    if (window.confirm('Opravdu si přejete mužstvo smazat?')) {
      setSquad(initiateSquad());
    }
  };

  const handleSubmitSquad = () => {
    setShowModal(true);
  };

  const handleSubmitDone = () => {
    setSquad(initiateSquad());
    setShowModal(false);
  };

  return (
    <>
      <Layout>
        <SquadProvider value={{ squad, formationDetail, selectedFieldCard }}>
          <Header
            onClearSquad={handleClearSquad}
            onSubmitSquad={handleSubmitSquad}
            onFormationSelect={handleFormationSelect}
            selectedFormation={selectedFormation}
          />
          <Field
            onFieldCardPick={handleFieldCardPick}
            onCancelPick={handleCancel}
            resetSquadIndex={resetSquadIndex}
          />
          <Nominees
            scrollRef={sectionNominees}
            onNomineePick={handleNomineePick}
            onCancelPick={handleCancel}
          />
        </SquadProvider>
      </Layout>
      {showModal && <Modal onSubmitDone={handleSubmitDone} />}
    </>
  );
};

export default App;
