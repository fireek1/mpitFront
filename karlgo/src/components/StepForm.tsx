import React, { useState, useEffect } from 'react';
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
  const totalSteps = 5;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [createdCompanyId, setCreatedCompanyId] = useState<number | null>(null);
  const [description, setDescription] = useState<string>('Генерация...');
  const [isGenerating, setIsGenerating] = useState(false);

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
    const isValid = validateStep();
    if (!isValid) return; // не переходим дальше
  
    if (step < totalSteps - 1) {
      if (step === 3) {
        handleSubmit(); // если это последний шаг перед генерацией
      } else {
        setStep(step + 1);
      }
    } else {
      handleUpdateDescription(); // если это финальный шаг
    }
  };
  
  

  const prevStep = () => {
    if (step === 0) {
      window.location.reload();
    } else {
      setStep(step - 1);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      organization_type: formData.organizationType,
      business_sphere: formData.businessSphere,
      owner_id: 1,
      tags: selectedTags,
    };

    try {
      const response = await fetch('/v1/owner/company/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data?.id) {
        setCreatedCompanyId(data.id);

        const stored = localStorage.getItem('myCompanies');
        const myCompanies = stored ? JSON.parse(stored) : [];
        localStorage.setItem('myCompanies', JSON.stringify([...myCompanies, data.id]));

        setStep(step + 1);
      }
    } catch (err) {
      console.error('Ошибка при создании компании:', err);
    }
  };

  const fetchDescription = async () => {
    if (!createdCompanyId) return;
    setIsGenerating(true);

    try {
      const res = await fetch(`/v1/owner/company/${16}/generate-description`);
      const data = await res.json();
      if (data?.description) {
        setDescription(data.description);
      }
    } catch (err) {
      console.error('Ошибка генерации описания:', err);
      setDescription('Не удалось сгенерировать описание.');
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (step === 4 && createdCompanyId) {
      fetchDescription();
    }
  }, [step, createdCompanyId]);

  const handleUpdateDescription = async () => {
    if (!createdCompanyId) return;

    try {
      await fetch(`/v1/owner/company/${createdCompanyId}/update-description`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      onSuccessGuest();
    } catch (err) {
      console.error('Ошибка обновления описания:', err);
    }
  };

  const validateStep = (): boolean => {
    switch (step) {
      case 0:
        if (!formData.name.trim()) {
          alert('Название организации не может быть пустым');
          return false;
        }
        if (!/^\d{10}(\d{2})?$/.test(formData.inn)) {
          alert('ИНН должен содержать 10 или 12 цифр');
          return false;
        }
        if (!formData.organizationType.trim()) {
          alert('Тип организации обязателен');
          return false;
        }
        break;
  
      case 1:
        if (!formData.city.trim()) {
          alert('Введите город');
          return false;
        }
        if (!formData.address.trim()) {
          alert('Введите адрес');
          return false;
        }
        if (!formData.director.trim()) {
          alert('Введите ФИО руководителя');
          return false;
        }
        break;
  
      case 2:
        if (!formData.businessSphere.trim()) {
          alert('Введите сферу деятельности');
          return false;
        }
        if (selectedTags.length === 0) {
          alert('Выберите хотя бы один интерес');
          return false;
        }
        break;
  
      default:
        return true;
    }
  
    return true;
  };  

  return (
    <div className='main'>
      <OrangeLogo />
      <h3 className='screen-title'>{isGuest ? 'Заполните данные' : 'Создайте аккаунт'}</h3>

      <StepScreen
        step={step}
        selectedTags={selectedTags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        formData={formData}
        onFormChange={handleFormChange}
        description={description}
        onDescriptionChange={setDescription}
        isGenerating={isGenerating}
      />

      <div className='buttons'>
        <button className='button-back' onClick={prevStep}>
          <BackArrow />
        </button>
        <button className='button-forward' onClick={nextStep}>
          {step === totalSteps - 1 ? 'Сохранить' : 'Продолжить'}
        </button>
      </div>
    </div>
  );
};

export default StepForm;