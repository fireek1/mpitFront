import React, { useState } from 'react';
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
    description?: string;
  };
  onFormChange: (field: string, value: string) => void;
  description: string;
  onDescriptionChange: (desc: string) => void;
  isGenerating: boolean;
  errors: { [key: string]: string }; // Add errors prop
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
  description,
  onDescriptionChange,
  isGenerating,
  errors,
}) => {
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});

  const validateField = (field: string, value: string) => {
    let error = '';
    if (field === 'name' && value.trim() === '') {
      error = 'Название организации не может быть пустым.';
    } else if (field === 'inn' && !/^\d{10}$/.test(value)) {
      error = 'ИНН должен содержать 10 цифр.';
    } else if (field === 'organizationType' && value.trim() === '') {
      error = 'Тип организации не может быть пустым.';
    } else if (field === 'city' && value.trim() === '') {
      error = 'Город не может быть пустым.';
    } else if (field === 'address' && value.trim() === '') {
      error = 'Адрес не может быть пустым.';
    } else if (field === 'director' && value.trim() === '') {
      error = 'ФИО руководителя не может быть пустым.';
    } else if (field === 'businessSphere' && value.trim() === '') {
      error = 'Сфера деятельности не может быть пустой.';
    }
    setLocalErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const handleFieldChange = (field: string, value: string) => {
    onFormChange(field, value); // Update the state first
    validateField(field, value); // Then validate the field
  };

  const fetchDescription = async () => {
    try {
      const response = await fetch(`/v1/owner/company/${localStorage.getItem('myCompanies')}/generate-description`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      onFormChange('description', data.description || 'Описание не удалось сгенерировать');
    } catch (error) {
      console.error('Ошибка генерации описания:', error);
      onFormChange('description', 'Ошибка при генерации описания.');
    }
  };

  return (
    <div>
      {step === 0 && (
        <>
          <h2 className='step-title'>Шаг 2 из 5: Основная информация</h2>
          <StepIndicator currentStep={1} totalSteps={5} />
          <h4 className='input-title'>Название организации</h4>
          {errors.name && <p className="error-text" style={{ color: 'red' }}>{errors.name}</p>}
          <input
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
          />
          <h4 className='input-title'>ИНН</h4>
          {errors.inn && <p className="error-text" style={{ color: 'red' }}>{errors.inn}</p>}
          <input
            value={formData.inn}
            type='text'
            maxLength={10} // Restrict input to 10 characters
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
              handleFieldChange('inn', value); // Update and validate
            }}
          />
          <h4 className='input-title'>Тип организации</h4>
          {errors.organizationType && <p className="error-text" style={{ color: 'red' }}>{errors.organizationType}</p>}
          <input
            value={formData.organizationType}
            onChange={(e) => handleFieldChange('organizationType', e.target.value)}
          />
        </>
      )}

      {step === 1 && (
        <>
          <h2 className='step-title'>Шаг 3 из 5: Адрес и контакты</h2>
          <StepIndicator currentStep={2} totalSteps={5} />
          <h4 className='input-title'>Город:</h4>
          {errors.city && <p className="error-text" style={{ color: 'red' }}>{errors.city}</p>}
          <input
            value={formData.city}
            onChange={(e) => handleFieldChange('city', e.target.value)}
          />
          <h4 className='input-title'>Адрес:</h4>
          {errors.address && <p className="error-text" style={{ color: 'red' }}>{errors.address}</p>}
          <input
            value={formData.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
          />
          <h4 className='input-title'>ФИО руководителя:</h4>
          {errors.director && <p className="error-text" style={{ color: 'red' }}>{errors.director}</p>}
          <input
            value={formData.director}
            onChange={(e) => handleFieldChange('director', e.target.value)}
          />
        </>
      )}

      {step === 2 && (
        <>
          <h4 className='step-title'>Шаг 4 из 5: Интересы бизнеса</h4>
          <StepIndicator currentStep={3} totalSteps={5} />
          <h4 className='input-title'>Сфера деятельности</h4>
          {errors.businessSphere && <p className="error-text" style={{ color: 'red' }}>{errors.businessSphere}</p>}
          <input
            value={formData.businessSphere}
            onChange={(e) => handleFieldChange('businessSphere', e.target.value)}
          />
          <TagSelector
            allTags={allTags}
            selectedTags={selectedTags}
            onSelect={onAddTag}
            onRemove={onRemoveTag}
          />
        </>
      )}

      {step === 3 && (
        <>
          <h4 className='step-title'>Шаг 5 из 5: Описание бизнеса</h4>
          <StepIndicator currentStep={4} totalSteps={5} />

          <h4 className='input-title'>Описание:</h4>
          <textarea
            style={{ width: '100%', minHeight: '120px', marginBottom: '16px', padding: '10px', borderRadius: '8px' }}
            value={isGenerating ? 'Генерация...' : description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Описание будет сгенерировано автоматически..."
            disabled={isGenerating}
          />
          <button
          onClick={fetchDescription} // ← теперь генерация только по клику
          style={{
            marginTop: '12px',
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: '#FF6A00',
            color: '#fff',
            border: 'none',
          }}
        >
          Сгенерировать описание
        </button>
        </>
      )}
    </div>
  );
};

export default StepScreen;