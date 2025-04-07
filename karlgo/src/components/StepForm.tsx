import React, { useState } from 'react';
import StepScreen from './StepScreen';
import './StepForm.css';
import OrangeLogo from '../assets/OrangeLogo';
import BackArrow from '../assets/BackArrow';

type Props = {
  isGuest: boolean;
};

const StepForm: React.FC<Props> = ({ isGuest }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
    }
    };

    const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    };

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className='main'>
      <OrangeLogo></OrangeLogo>
      <h3 className='screen-title'>{isGuest ? 'Гостевой режим' : 'Создайте аккаунт'}</h3>
      <StepScreen
        step={step}
        selectedTags={selectedTags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}/>
      
      <div className='buttons'>
        <button className='button-back' onClick={prevStep} disabled={step === 0}><BackArrow></BackArrow></button>
        <button className='button-forward' onClick={nextStep} disabled={step === totalSteps - 1}>Далее</button>
      </div>
    </div>
  );
};

export default StepForm;