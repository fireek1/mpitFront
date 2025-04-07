import React, { useEffect, useRef } from 'react';

// Типы для Яндекс Карт (если установили @types/yandex-maps)
declare const ymaps: typeof import('yandex-maps');

interface MapsProps {
  apiKey: string; // Ваш API-ключ
  center?: [number, number]; // Координаты центра карты [широта, долгота]
  zoom?: number; // Уровень масштабирования
}

const Maps: React.FC<MapsProps> = ({ apiKey, center = [55.76, 37.64], zoom = 10 }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.ymaps) {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
      script.async = true;
      
      script.onload = () => {
        ymaps.ready(() => {
          if (mapRef.current) {
            new ymaps.Map(mapRef.current, {
              center,
              zoom,
            });
          }
        });
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else {
      ymaps.ready(() => {
        if (mapRef.current) {
          new ymaps.Map(mapRef.current, {
            center,
            zoom,
          });
        }
      });
    }
  }, [apiKey, center, zoom]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default Maps;