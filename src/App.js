import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Gpt from './Gpt';
import MainPage from './MainPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/gpt" element={<Gpt />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
