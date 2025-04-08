import React, { useState, useEffect } from 'react';
import './SearchPanel.css';

type Company = {
  id: number;
  name: string;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
};

const SearchPanel: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Отели');
  const [companies, setCompanies] = useState<Company[]>([]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  // useEffect(() => {
  //   fetch('http://158.160.47.233:8080/v1/geocoder/cords/geo/companies')
  //     .then(response => response.json())
  //     .then(data => setCompanies(data))
  //     .catch(error => console.error('Ошибка загрузки компаний:', error));
  // }, []);

  useEffect(() => {
    fetch('/v1/geocoder/cords/geo/companies')
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => console.error('Ошибка загрузки компаний:', error));
  }, []);

  const categories = ['Отели', 'Рестораны', 'Мероприятия'];

  return (
    <div className="search-panel">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Куда бы вы хотели пойти?" 
      />
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="company-list">
        {companies.map(company => (
          <div className="company-card" key={company.id}>
            <h3>{company.name}</h3>
            <p>{company.city}</p>
            <p>{company.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPanel;
