import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import MapPage from './pages/MapPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        {/*  Route 컴포넌트로 각 경로와 해당 경로에서 보여줄 컴포넌트를 지정*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;
