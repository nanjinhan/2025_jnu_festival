import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  // 축제 D-Day 계산
  const festDate = new Date('2025-09-24'); // 축제 시작일
  const today = new Date();
  const diff = Math.ceil((festDate - today) / (1000 * 60 * 60 * 24));
  const dDayText = `D-${diff > 0 ? diff : 0}`;

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      {/* 상단 배너 이미지 */}
      <div className="w-full">
        <img
          src="/images/festival-banner.jpg"
          alt="전남대 대동제"
          className="w-full h-48 object-cover"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold text-gray-800">2025년도 전남대학교 대동제</h1>
        <p className="text-lg text-gray-600 mt-2">
          {dDayText}
          <br />
          이서연과 함께 개쩌는 축제를
          <br />
          (근데 별로 막 쩔지는 않는듯)
        </p>
      </div>

      {/* 버튼 그리드 영역 */}
      <div className="p-6 grid grid-cols-2 gap-4 mt-8">
        <Link
          to="/map"
          className="flex flex-col items-center justify-center bg-white rounded-3xl p-6 shadow hover:bg-gray-50 transition"
        >
          <span className="text-gray-700 font-semibold">안내</span>
        </Link>

        <Link
          to="/content"
          className="flex flex-col items-center justify-center bg-white rounded-3xl p-6 shadow hover:bg-gray-50 transition"
        >
          <span className="text-gray-700 font-semibold">콘텐츠</span>
        </Link>

        <Link
          to="/booth-list"
          className="flex flex-col items-center justify-center bg-white rounded-3xl p-6 shadow hover:bg-gray-50 transition"
        >
          <span className="text-gray-700 font-semibold">부스</span>
        </Link>

        <Link
          to="/timetable"
          className="flex flex-col items-center justify-center bg-white rounded-3xl p-6 shadow hover:bg-gray-50 transition"
        >
          <span className="text-gray-700 font-semibold">타임테이블</span>
        </Link>

        <Link
          to="/notice"
          className="flex flex-col items-center justify-center bg-white rounded-3xl p-6 shadow hover:bg-gray-50 transition"
        >
          <span className="text-gray-700 font-semibold">공지사항</span>
        </Link>

        <Link
          to="/feedback"
          className="flex flex-col items-center justify-center bg-white rounded-3xl p-6 shadow hover:bg-gray-50 transition"
        >
          <span className="text-gray-700 font-semibold">피드백</span>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
