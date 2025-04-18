import React, { useState, useEffect } from 'react';
import './SearchPanel.css';
import PinButton from '../assets/pinButton';
import Next from '../assets/Next';

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

  const categories = ['Отели', 'Рестораны'];

  return (
    <div className="container-wrapper">
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
              <button className='button-onmap'>
                <div className="button-onmap-pin"><PinButton /></div>
                <p className="button-onmap-text">На карте</p>
              </button>
              <div className="card-bottom">
                <h3 className='card-title'>{company.name}</h3>
                <button className="button-on"><Next /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
