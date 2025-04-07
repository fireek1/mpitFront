import React from 'react';
import TagSelector from './TagSelector';

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
          <h2>Шаг 1: Основная информация</h2>
          <input placeholder="Название" /><br />
          <input placeholder="ИНН" /><br />
          <input placeholder="Тип организации" /><br />
        </>
      )}
      {step === 1 && (
        <>
          <h2>Шаг 2: Адрес и контакты</h2>
          <input placeholder="Город" /><br />
          <input placeholder="Адрес" /><br />
          <input placeholder="Контакты" /><br />
          <input placeholder="Данные о руководителе" /><br />
        </>
      )}
      {step === 2 && (
        <div>
        <h4>Шаг 3: Интересы бизнеса</h4>
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
