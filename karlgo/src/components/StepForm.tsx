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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Название организации не может быть пустым.';
      if (!/^\d{10}$/.test(formData.inn)) newErrors.inn = 'ИНН должен содержать 10 цифр.';
      if (!formData.organizationType.trim()) newErrors.organizationType = 'Тип организации не может быть пустым.';
    } else if (step === 1) {
      if (!formData.city.trim()) newErrors.city = 'Город не может быть пустым.';
      if (!formData.address.trim()) newErrors.address = 'Адрес не может быть пустым.';
      if (!formData.director.trim()) newErrors.director = 'ФИО руководителя не может быть пустым.';
    } else if (step === 2) {
      if (!formData.businessSphere.trim()) newErrors.businessSphere = 'Сфера деятельности не может быть пустой.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step < totalSteps - 1) {
      if (validateFields()) {
        if (step === 3) {
          handleSubmit(); // отправка данных на шаге 4
        } else {
          setStep(step + 1);
        }
      }
    } else {
      handleUpdateDescription(); // отправка финального описания на шаге 5
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

        // сохранить в localStorage
        const stored = localStorage.getItem('myCompanies');
        const myCompanies = stored ? JSON.parse(stored) : [];
        localStorage.setItem('myCompanies', JSON.stringify([...myCompanies, data.id]));

        setStep(step + 1); // перейти на шаг 5
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
        onFormChange={(field, value) => {
          setErrors((prev) => ({ ...prev, [field]: '' })); // Clear error on change
          handleFormChange(field, value);
        }}
        description={description}
        onDescriptionChange={setDescription}
        isGenerating={isGenerating}
        errors={errors} // Pass errors to StepScreen
      />

      <div className='buttons'>
        <button className='button-back' onClick={prevStep}>
          <BackArrow />
        </button>
        <button
          className='button-forward'
          onClick={() => {
            if (validateFields()) {
              nextStep();
            }
          }}
        >
          {step === totalSteps - 1 ? 'Сохранить' : 'Продолжить'}
        </button>
      </div>
    </div>
  );
};

export default StepForm;