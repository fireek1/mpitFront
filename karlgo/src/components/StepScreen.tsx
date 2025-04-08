import React from 'react';
import TagSelector from './TagSelector';
import StepIndicator from './StepIndicator';
import './StepScreen.css';

type StepScreenProps = {
  step: number;
  selectedTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  formData: {
    name: string;
    inn: string;
    organizationType: string;
    address: string;
    city: string;
    businessSphere: string;
    director: string;
  };
  onFormChange: (field: string, value: string) => void;
};

const allTags = [
  'Инструментальная музыка',
  'Уютная атмосфера',
  'Авторская кухня',
  'Танцевальная площадка',
  'Арт-пространство',
  'Коворкинг',
];

const StepScreen: React.FC<StepScreenProps> = ({
  step,
  selectedTags,
  onAddTag,
  onRemoveTag,
  formData,
  onFormChange,
}) => {
  return (
    <div>
      {step === 0 && (
        <>
          <h2 className='step-title'>Шаг 2 из 4: Основная информация</h2>
          <StepIndicator currentStep={1} totalSteps={4} />
          <h4 className='input-title'>Название организации</h4>
          <input value={formData.name} onChange={(e) => onFormChange('name', e.target.value)} />
          <h4 className='input-title'>ИНН</h4>
          <input value={formData.inn} onChange={(e) => onFormChange('inn', e.target.value)} />
          <h4 className='input-title'>Тип организации</h4>
          <input value={formData.organizationType} onChange={(e) => onFormChange('organizationType', e.target.value)} />
        </>
      )}
      {step === 1 && (
        <>
          <h2 className='step-title'>Шаг 3 из 4: Адрес и контакты</h2>
          <StepIndicator currentStep={2} totalSteps={4} />
          <h4 className='input-title'>Город:</h4>
          <input value={formData.city} onChange={(e) => onFormChange('city', e.target.value)} />
          <h4 className='input-title'>Адрес:</h4>
          <input value={formData.address} onChange={(e) => onFormChange('address', e.target.value)} />
          <h4 className='input-title'>ФИО руководителя:</h4>
          <input value={formData.director} onChange={(e) => onFormChange('director', e.target.value)} />
        </>
      )}
      {step === 2 && (
        <>
          <h4 className='step-title'>Шаг 4 из 4: Интересы бизнеса</h4>
          <StepIndicator currentStep={3} totalSteps={4} />
          <h4 className='input-title'>Сфера деятельности</h4>
          <input value={formData.businessSphere} onChange={(e) => onFormChange('businessSphere', e.target.value)} />
          <TagSelector
            allTags={allTags}
            selectedTags={selectedTags}
            onSelect={onAddTag}
            onRemove={onRemoveTag}
          />
        </>
      )}
    </div>
  );
};

export default StepScreen;
