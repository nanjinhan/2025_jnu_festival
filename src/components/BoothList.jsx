import React, { useState, useEffect } from 'react';
import { fetchBooths } from '../services/api'; // 방금 만든 API 서비스 함수를 import

const BoothList = ({ isVisible, onClose }) => {
  // 서버로부터 받아온 부스 목록을 저장할 state
  const [booths, setBooths] = useState([]);
  // 데이터 로딩 상태를 관리할 state
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.
  useEffect(() => {
    // API를 호출하여 부스 데이터를 가져옵니다.
    fetchBooths().then(data => {
      setBooths(data);      // 받아온 데이터로 state 업데이트
      setIsLoading(false);  // 로딩 상태를 false로 변경
    });
  }, []); // 빈 배열을 의존성으로 전달하여 최초 1회만 실행되도록 함

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-10 bg-white rounded-t-2xl shadow-2xl
        transition-transform duration-500 ease-in-out
        ${isVisible ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}
      `}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-bold">부스 목록</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="목록 닫기">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 max-h-[60vh] overflow-y-auto">
        {/* 로딩 중일 때와 데이터가 없을 때의 UI 처리 */}
        {isLoading ? (
          <p className="text-center text-gray-500">목록을 불러오는 중입니다...</p>
        ) : booths.length > 0 ? (
          <div className="space-y-3">
            {booths.map((booth) => (
              <div key={booth.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <p className="font-bold text-md text-blue-600">{booth.name}</p>
                <p className="text-sm text-gray-700 mt-1">{booth.description}</p>
                <p className="text-xs text-gray-500 mt-2">위치: {booth.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">등록된 부스가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BoothList;