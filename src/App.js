import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainPage from './MainPage';
import Gpt from './Gpt';


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Gpt />} />
                <Route path="/a" element={<MainPage />} />
            </Routes>
        </div>
    );
}

export default App;
