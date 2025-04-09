import React, { useState, useEffect } from 'react';
import StepForm from './components/StepForm';
import GuestForm from './components/GuestForm';
import StartScreen from './components/StartScreen';
import Map from './components/Map';

import MainScreen from './components/MainScreen';

const App: React.FC = () => {
  const [hasChosen, setHasChosen] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddBusinessForm, setShowAddBusinessForm] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChoice = (guest: boolean) => {
    setIsGuest(guest);
    setHasChosen(true);
  };

  if (isLoggedIn) {
  if (showAddBusinessForm) {
    return (
      <StepForm
        isGuest={false}
        onSuccessGuest={() => {
          setShowAddBusinessForm(false);
        }}
      />
    );
  }

  return <MainScreen onAddBusinessClick={() => setShowAddBusinessForm(true)} />;
}


  return (
    <>
      {!hasChosen ? (
        <StartScreen onSelect={handleChoice} />
      ) : isGuest ? (
        <GuestForm />
      ) : (
        <StepForm isGuest={false} onSuccessGuest={() => {
          setIsLoggedIn(true)
          setIsGuest(true)
        }} />
      )}
    </>
  );
};

export default App;