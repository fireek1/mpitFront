import React from 'react';
import './StepIndicator.css';

type Props = {
  currentStep: number;
  totalSteps: number;
};

const StepIndicator: React.FC<Props> = ({ currentStep, totalSteps }) => {
  return (
    <div className='indication'>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div className="indicator"
          key={i}
          style={{
            backgroundColor: i === currentStep ? '#FFF' : '#4F4F4F',
          }}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
