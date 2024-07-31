import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Gpt from './Gpt';
import MainPage from './MainPage';
import Test from './Test';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/gpt" element={<Gpt />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/t" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
