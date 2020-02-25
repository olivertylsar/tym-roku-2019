import { createContext } from 'react';

const SquadContext = createContext();

export const SquadProvider = SquadContext.Provider;
export const SquadConsumer = SquadContext.Consumer;
export default SquadContext;
