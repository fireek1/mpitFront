import React from 'react';
import './StartScreen.css';
import backgroundImage from './../assets/start_bg.png';
import Logo from './../assets/Logo.tsx';

interface StartScreenProps {
  onSelect: (isGuest: boolean) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onSelect }) => {
  return (
    <div
      className="start-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="start-screen__header">
        <Logo></Logo>
      </div>

      <div className="start-screen__buttons">
        <h2 className="start-screen__title">Находите новые места в вашем городе</h2>
        <button className="start-screen__button--primary" onClick={() => onSelect(false)}>
          Зарегистрировать бизнес
        </button>
        <button className="start-screen__button--secondary" onClick={() => onSelect(true)}>
          Войти как гость
        </button>
      </div>
    </div>
  );
};

export default StartScreen;