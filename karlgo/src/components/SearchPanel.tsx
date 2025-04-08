import React, { useState } from 'react';
import './SearchPanel.css';

const categories = ['Отели', 'Рестораны', 'Мероприятия', 'Кино', 'Музеи', 'Парки', 'Клубы'];

const SearchPanel: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Отели');
  const [isDragging, setIsDragging] = useState(false);

  let startX = 0;
  let scrollLeft = 0;

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = e.currentTarget;
    setIsDragging(false);
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      setIsDragging(true);
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setTimeout(() => setIsDragging(false), 50);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleClick = (name: string) => {
    if (!isDragging) {
      setActiveCategory(name);
    }
  };

  return (
    <div className="search-panel">
      <input type="text" className="search-input" placeholder="Куда бы вы хотели пойти?" />
      <div className="category-buttons-scroll" onMouseDown={onMouseDown}>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchPanel;
