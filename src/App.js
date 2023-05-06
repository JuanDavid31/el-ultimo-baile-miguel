import React from 'react';
import Home from './modules/Home.js';
import Questions from './modules/Questions.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Questions" element={<Questions />} />
      </Routes>
    </div>
  );
}

export default App;
