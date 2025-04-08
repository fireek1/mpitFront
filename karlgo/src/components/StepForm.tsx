import React, { useState } from 'react';
import StepScreen from './StepScreen';
import './StepForm.css';
import OrangeLogo from '../assets/OrangeLogo';
import BackArrow from '../assets/BackArrow';

type Props = {
  isGuest: boolean;
  onSuccessGuest: () => void;
};

const StepForm: React.FC<Props> = ({ isGuest, onSuccessGuest }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    inn: '',
    organizationType: '',
    address: '',
    city: '',
    businessSphere: '',
    director: '',
  });

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
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step === 0) {
      window.location.reload();
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      inn: formData.inn,
      organization_type: formData.organizationType,
      address: formData.address,
      city: formData.city,
      business_sphere: formData.businessSphere,
      owner_id: 1,
      tags: selectedTags,
    };
  
    try {
      // const response = await fetch('http://158.160.47.233:8080/v1/owner/company/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // });

      const response = await fetch('/v1/owner/company/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        onSuccessGuest(); // переходим в гостевой режим
      } else {
        console.error('Ошибка отправки!');
      }
    } catch (error) {
      console.error('Ошибка подключения!', error);
    }
  };  

  return (
    <div className='main'>
      <OrangeLogo />
      <h3 className='screen-title'>{isGuest ? 'Гостевой режим' : 'Создайте аккаунт'}</h3>
      <StepScreen
        step={step}
        selectedTags={selectedTags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        formData={formData}
        onFormChange={handleFormChange}
      />

      <div className='buttons'>
        <button className='button-back' onClick={prevStep}>
          <BackArrow />
        </button>
        <button
          className='button-forward'
          onClick={nextStep}
        >
          {step === totalSteps - 1 ? 'Отправить' : 'Продолжить'}
        </button>
      </div>
    </div>
  );
};

export default StepForm;
