import React from 'react';

type Props = {
  currentStep: number;
  totalSteps: number;
};

const StepIndicator: React.FC<Props> = ({ currentStep, totalSteps }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            margin: '0 5px',
            backgroundColor: i === currentStep ? '#5A4FCF' : '#ccc',
          }}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
