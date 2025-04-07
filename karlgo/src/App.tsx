import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import GuestForm from './components/GuestForm';
import Map from './components/Map';
import StepForm from './components/StepForm';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>Добро пожаловать!</h1>
      <p>Выберите режим входа:</p>
      <button onClick={() => navigate('/guest')} style={{ margin: '10px' }}>
        Гостевой режим
      </button>
      <button onClick={() => navigate('/register')} style={{ margin: '10px' }}>
        Регистрация бизнеса
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guest" element={<GuestForm />} />
        <Route path="/register" element={<StepForm isGuest={false} />} />
        <Route path="/map" element={<Map apiKey={import.meta.env.VITE_YANDEX_MAPS_API_KEY} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
