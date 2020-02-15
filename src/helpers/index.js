import players from '../players.json';

export const filterNominees = (squad, category = null) => {
  return Object.values(players).filter(player => {
    const isInCategory = category ? player.category === category : true;
    const isPlayerInField = squad.includes(player.id);
    return isInCategory && !isPlayerInField;
  });
};

export const initiateSquad = () => Array(11).fill(null);

export const getFieldCardCategory = (formation, fieldCardSelected) => {
  console.log(fieldCardSelected);
  const category = Object.keys(formation).find(cat =>
    formation[cat].includes(fieldCardSelected)
  );
  return category;
};