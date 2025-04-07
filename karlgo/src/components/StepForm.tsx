import React, { useState } from 'react';
import StepScreen from './StepScreen';
import StepIndicator from './StepIndicator';

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
    <div>
      <h3>{isGuest ? 'Гостевой режим' : 'Регистрация бизнеса'}</h3>
      <StepScreen
        step={step}
        selectedTags={selectedTags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}/>
      <StepIndicator currentStep={step} totalSteps={totalSteps} />
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={prevStep} disabled={step === 0}>Назад</button>
        <button onClick={nextStep} disabled={step === totalSteps - 1}>Далее</button>
      </div>
    </div>
  );
};

export default StepForm;