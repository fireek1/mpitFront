import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const allTags = [
  'Музыка', 'Спорт', 'Технологии', 'Путешествия', 'Мода', 'Игры',
  'Кино', 'Еда', 'Искусство', 'Фотография', 'Книги', 'Наука',
];

const GuestForm: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const availableTags = allTags.filter(tag => !selectedTags.includes(tag));

  const handleTagClick = (tag: string) => {
    if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const isFormValid = (): boolean => {
    const ageNumber = parseInt(age, 10);
    return (
      ageNumber > 0 &&
      ageNumber <= 120 &&
      gender !== '' &&
      selectedTags.length > 0
    );
  };

  const handleSubmit = () => {
    const guestData = {
      age,
      gender,
      interests: selectedTags,
    };

    localStorage.setItem('guestData', JSON.stringify(guestData));
    navigate('/map');
  };

  return (
    <div>
      <h2>Гостевой режим</h2>

      <label>Возраст:</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Введите возраст"
        min={1}
        max={120}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Пол:</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      >
        <option value="">Выберите пол</option>
        <option value="Мужской">Мужской</option>
        <option value="Женский">Женский</option>
        <option value="Другое">Другое</option>
      </select>

      <label>Выберите интересы (макс. 3):</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
        {availableTags.map(tag => (
          <div
            key={tag}
            onClick={() => handleTagClick(tag)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#eee',
              borderRadius: '20px',
              color: 'black',
              cursor: 'pointer'
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      <label>Выбранные:</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {selectedTags.map(tag => (
          <div
            key={tag}
            onClick={() => handleRemoveTag(tag)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#a68df5',
              color: 'white',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            {tag} ✕
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid()}
        style={{ marginTop: '20px', width: '100%' }}
      >
        Продолжить
      </button>
    </div>
  );
};

export default GuestForm;
