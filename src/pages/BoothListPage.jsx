// src/pages/BoothListPage.jsx
import React from 'react';
import { booths } from '../data/booths';

function BoothListPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">부스 목록</h1>
      <div className="space-y-4">
        {booths.map((booth) => (
          <div
            key={booth.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col"
          >
            <span className="text-lg font-semibold">{booth.name}</span>
            <span className="text-sm text-gray-600">{booth.location}</span>
            <span className="text-sm text-gray-600">분류: {booth.category}</span>
            <span className="text-sm text-gray-600">주최: {booth.host}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoothListPage;
