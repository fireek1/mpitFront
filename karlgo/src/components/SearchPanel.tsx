import React from 'react';
import './SearchPanel.css';

const SearchPanel: React.FC = () => {
  return (
    <div className="search-panel">
      <input type="text" className="search-input" placeholder="Куда бы вы хотели пойти ?" />
      <div className="category-buttons">
        <button className="category-button active">Отели</button>
        <button className="category-button">Рестораны</button>
        <button className="category-button">Мероприятия</button>
      </div>
    </div>
  );
};

export default SearchPanel;