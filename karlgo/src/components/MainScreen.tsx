import React, { useRef, useState, useEffect } from 'react';
import Maps from './Map';
import SearchPanel from './SearchPanel';
import './MainScreen.css';
import OrangeLogo from '../assets/OrangeLogo2';
import anal from '../assets/main-block.png';

type MainScreenProps = {
  onAddBusinessClick: () => void;
};

const MainScreen: React.FC<MainScreenProps> = ({ onAddBusinessClick }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isSwipingOverMap = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    isSwipingOverMap.current = target.closest('.map-container') !== null;
    if (isSwipingOverMap.current) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isSwipingOverMap.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isSwipingOverMap.current) return;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchEndX.current - touchStartX.current;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0 && currentScreen > 0) {
          setCurrentScreen((prev) => prev - 1);
        } else if (deltaX < 0 && currentScreen < 2) {
          setCurrentScreen((prev) => prev + 1);
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const gap = 64;
        const width = containerRef.current.offsetWidth;
        const totalGap = gap * (3 - 1); // 3 экрана
        const slideW = (width - totalGap) / 3;
        setSlideWidth(slideW + gap);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      className="main-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="top-bar">
        <OrangeLogo />
        <button className="reg-new" onClick={onAddBusinessClick}>
          Добавить бизнес
        </button>
      </div>

      <div
        className="screen-container"
        ref={containerRef}
        style={{
          transform: `translateX(-${currentScreen * slideWidth}px)`
        }}
      >
        <div className="screen-slide">
          <div className="inner-screen map-container">
            <Maps apiKey={import.meta.env.VITE_YANDEX_API_KEY} />
          </div>
        </div>
        <div className="screen-slide">
          <div className="inner-screen">
            <SearchPanel />
          </div>
        </div>
        <div className="screen-slide">
          <div className="inner-screen screen-anal">
          <img src={anal} style={{height: '100%'}}/>
          </div>
        </div>
      </div>

      <div className="screen-indicator">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`dot ${currentScreen === i ? 'active' : ''}`}
            onClick={() => setCurrentScreen(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
