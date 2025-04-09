import React, { useEffect, useRef, useState } from 'react';
import customStyles from './../assets/styles_black.json';
import './Map.css';

interface MapsProps {
  apiKey: string;
  zoom?: number;
}

interface Company {
  id: number;
  name: string;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
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
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([longitude, latitude]);
      },
      () => {
        setUserPosition([37.64, 55.76]);
      }
    );
  }, []);

  // Загрузка компаний
  useEffect(() => {
    fetch('v1/geocoder/cords/geo/companies')
      .then(res => res.json())
      .then(data => setCompanies(data))
      .catch(err => console.error('Ошибка загрузки компаний:', err));
  }, []);

  // useEffect(() => {
  //   fetch('/v1/geocoder/cords/geo/companies')
  //     .then(res => res.json())
  //     .then(data => setCompanies(data))
  //     .catch(err => console.error('Ошибка загрузки компаний:', err));
  // }, []);

  // Загрузка карты
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
          script.onload = () => resolve();
        });
      }

      await window.ymaps3.ready;
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = window.ymaps3;

      const map = new YMap(mapRef.current, {
        location: { center: userPosition, zoom },
      });

      map.addChild(new YMapDefaultSchemeLayer({ customization: customStyles }));
      map.addChild(new YMapDefaultFeaturesLayer());

      companies.forEach(company => {
        const marker = new YMapMarker(
          {
            coordinates: [parseFloat(company.longitude), parseFloat(company.latitude)],
          },
          document.createElement('div')
        );

        marker.element.className = 'custom-marker';
        marker.element.innerText = company.name[0].toUpperCase();

        map.addChild(marker);
      });

      mapInstance.current = map;
    };

    loadMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [userPosition, companies]);

  return (
    <div
      className="Yandex"
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
