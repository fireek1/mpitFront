import React, { useState } from 'react';
import StepForm from './components/StepForm';
import GuestForm from './components/GuestForm';
import StartScreen from './components/StartScreen';

const App: React.FC = () => {
  const [hasChosen, setHasChosen] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const handleChoice = (guest: boolean) => {
    setIsGuest(guest);
    setHasChosen(true);
  };

  return (
    <>
      {!hasChosen ? (
        <StartScreen onSelect={handleChoice} />
      ) : isGuest ? (
        <GuestForm />
      ) : (
        <StepForm isGuest={false} />
      )}
    </>
  );
};

export default App;