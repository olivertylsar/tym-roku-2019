import players from '../data.json';

export const filterNominees = (squad, category = null) => {
    return Object.values(players).filter(player => {
        const isInCategory = category ? player.category === category : true;
        const isPlayerInField = squad.includes(player.id);
        return isInCategory && !isPlayerInField;
    });
}

export const initiateSquad = () => Array(11).fill(null);
