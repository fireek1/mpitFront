import React, { useState } from 'react';
import './GuestForm.css';

const allTags = ['Музыка', 'Спорт', 'Еда', 'Путешествия', 'Технологии', 'Кино', 
    'Искусство', 'Чтение', 'Игры', 'Природа', 'Животные', 'Картины', 'Тусовки', 
    'Концерты', 'Фотография', 'Танцы', 'Видеоблоги', 'Мода'];

const GuestForm: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    const userData = {
      age,
      gender,
      interests: selectedTags
    };
  
    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.reload();
  };

  return (
    <div className="main">
      <h2 className="screen-title">Гостевой режим</h2>

      <label className="form-label">Возраст:</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Введите возраст"
      />

      <label className="form-label">Пол:</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Выберите пол</option>
        <option value="Мужской">Мужской</option>
        <option value="Женский">Женский</option>
        <option value="Другое">Другое</option>
      </select>

      <label className="form-label">Выберите интересы (макс. 3):</label>
      <div className="tag-container">
        {allTags.map(tag => (
          <div
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`tag ${selectedTags.includes(tag) ? 'tag-selected' : ''}`}
          >
            {tag}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!age || !gender || selectedTags.length === 0}
        className="button-submit"
      >
        Продолжить
      </button>
    </div>
  );
};

export default GuestForm;
