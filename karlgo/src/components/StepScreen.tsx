import React from 'react';
import TagSelector from './TagSelector';
import StepIndicator from './StepIndicator';
import './StepScreen.css';

type StepScreenProps = {
    step: number;
    selectedTags: string[];
    onAddTag: (tag: string) => void;
    onRemoveTag: (tag: string) => void;
};  

const allTags = ['Инструментальная музыка', 'Уютная атмосфера', 'Авторская кухня', 'Танцевальная площадка', 'Арт-пространство', 'Коворкинг', 'Настольные игры', 'Бар с настолками', 'Ночные кинопоказы', 'Открытый микрофон', 'Живые концерты', 'Художественные выставки', 'Кофейня', 'Завтраки', 'Летняя веранда', 'Кинотеатр', 'Фуд-корт', 'Фотозона'];

const StepScreen: React.FC<StepScreenProps> = ({ step, selectedTags, onAddTag, onRemoveTag }) => {
  return (
    <div>
      {step === 0 && (
        <>
          <h2 className='step-title'>Шаг 2 из 4: Основная информация</h2>
          <StepIndicator currentStep={1} totalSteps={4} />
          <h4 className='input-title'>Название организации</h4>
          <input placeholder="Название" /><br />
          <h4 className='input-title'>ИНН</h4>
          <input placeholder="ИНН" /><br />
          <h4 className='input-title'>Название организации</h4>
          <input placeholder="Тип организации" /><br />
        </>
      )}
      {step === 1 && (
        <>
          <h2 className='step-title'>Шаг 3 из 4: Адрес и контакты</h2>
          <StepIndicator currentStep={2} totalSteps={4} />
          <h4 className='input-title'>Адрес:</h4>
          <input placeholder="Адрес" /><br />
          <h4 className='input-title'>Контакты:</h4>
          <input placeholder="Контакты" /><br />
          <h4 className='input-title'>Данные о руководителе:</h4>
          <input placeholder="Данные о руководителе" /><br />
        </>
      )}
      {step === 2 && (
        <div>
        <h4 className='step-title'>Шаг 4 из 4: Интересы бизнеса</h4>
        <StepIndicator currentStep={3} totalSteps={4} />
        <TagSelector
          allTags={allTags}
          selectedTags={selectedTags}
          onSelect={onAddTag}
          onRemove={onRemoveTag}
        />
      </div>
      )}
    </div>
  );
};

export default StepScreen;