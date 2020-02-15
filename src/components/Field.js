import React from 'react';
import FieldLine from './FieldLine';

const Field = props => {
  const { formation, ...other } = props;

  const categories = ['attackers', 'midfielders', 'defenders', 'goalkeepers'];

  const labels = ['útočníci', 'záložníci', 'obránci', 'brankář'];
  const fieldLines = categories.map((category, index) => {
    return (
      <FieldLine
        key={index}
        label={labels[index]}
        fieldLineIndexes={formation[category]}
        category={category}
        {...other}
      />
    );
  });

  return <div className='Field'>{fieldLines}</div>;
};

export default Field;
