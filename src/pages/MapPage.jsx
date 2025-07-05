import React from 'react';
import { Link } from 'react-router-dom'; 
import MapComponent from '../components/MapComponent';

function MapPage() {
  return (
    <div className="p-4 md:p-8 h-full bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg h-full flex flex-col">
        <header className="mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">축제 지도</h1>
            <p className="text-gray-500 mt-1">지도에서 부스 위치와 주요 시설을 확인하세요.</p>
          </div>
          {/* 2. button 대신 Link 컴포넌트를 사용하고, to 속성으로 홈 경로('/')를 지정합니다. */}
          <Link
            to="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            홈으로
          </Link>
        </header>
        <div className="flex-grow rounded-xl overflow-hidden">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}

export default MapPage;
