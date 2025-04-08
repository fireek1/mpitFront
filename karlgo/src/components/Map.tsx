import React, { useEffect, useRef, useState } from 'react';
import customStyles from './../assets/styles_black.json';
import './Map.css';

interface MapsProps {
  apiKey: string;
  zoom?: number;
}

declare global {
  interface Window {
    ymaps3: any;
  }
}

const Maps: React.FC<MapsProps> = ({ apiKey, zoom = 15 }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Получение геопозиции
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([longitude, latitude]); // Yandex использует порядок: [долгота, широта]
      },
      (error) => {
        console.error('Ошибка получения геопозиции:', error);
        setUserPosition([37.64, 55.76]); // Москва по умолчанию
      }
    );
  }, []);

  useEffect(() => {
    if (!userPosition) return;

    const loadMap = async () => {
      if (!mapRef.current) return;

      const isScriptLoaded = !!window.ymaps3;

      if (!isScriptLoaded && !document.querySelector('script[src*="api-maps.yandex.ru/v3"]')) {
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
        script.async = true;
        document.head.appendChild(script);

        await new Promise<void>((resolve) => {
          script.onload = () => {
            console.log('Yandex Maps loaded');
            resolve();
          };
        });
      }

      await window.ymaps3.ready;

      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = window.ymaps3;

      const map = new YMap(mapRef.current, {
        location: { center: userPosition, zoom },
      });

      const schemeLayer = new YMapDefaultSchemeLayer({
        customization: customStyles,
      });

      map.addChild(schemeLayer);
      map.addChild(new YMapDefaultFeaturesLayer());

      mapInstance.current = map;
    };

    loadMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [userPosition, apiKey, zoom]);

  return (
    <div className='Yandex'
      ref={mapRef}
      style={{
        width: 'calc(100vw - 32px)',
        height: '100vh',
        backgroundColor: '#222',
      }}
    />
  );
};

export default Maps;
