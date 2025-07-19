import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import MapPage from './pages/MapPage';
import HomePage from './pages/HomePage';
import BoothListPage from './pages/BoothListPage'; 
import TimetablePage from './pages/TimetablePage';
import NoticePage from './pages/NoticePage';
import {ContentSchedulePage} from './pages/ContentSchedulePage'; 
import FeedbackPage from './pages/FeedbackPage';

function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        {/* Route 컴포넌트로 각 경로와 해당 경로에서 보여줄 컴포넌트를 지정*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/content" element={<ContentSchedulePage />} />*/
        <Route path="/booth-list" element={<BoothListPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </div>
  );
}

export default App;