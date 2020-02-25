import React, { useContext } from 'react';
import FieldLine from './FieldLine';
import SquadContext from '../context/SquadContext';

const Field = props => {
  const { formationDetail } = useContext(SquadContext);

  const categories = ['attackers', 'midfielders', 'defenders', 'goalkeepers'];
  const labels = ['útočníci', 'záložníci', 'obránci', 'brankář'];

  const fieldLines = categories.map((category, index) => {
    return (
      <FieldLine
        key={index}
        label={labels[index]}
        fieldLineIndexes={formationDetail[category]}
        category={category}
        {...props}
      />
    );
  });

  return <div className='Field'>{fieldLines}</div>;
};

export default Field;
