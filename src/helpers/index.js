import players from '../players.json';
import formations from '../formations.json';

export const filterNominees = (squad, category = null) => {
  return Object.values(players).filter(player => {
    const isInCategory = category ? player.category === category : true;
    const isPlayerInField = squad.includes(player.id);
    return isInCategory && !isPlayerInField;
  });
};

export const initiateSquad = () => Array(11).fill(null);

export const getFieldCardCategory = (formationDetail, fieldCardSelected) => {
  console.log(fieldCardSelected);
  const category = Object.keys(formationDetail).find(cat =>
    formationDetail[cat].includes(fieldCardSelected)
  );
  return category;
};

export const getFormationDetail = formation => formations[formation];
export const getFormationLabels = () => Object.keys(formations);
