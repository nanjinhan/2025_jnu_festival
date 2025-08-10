// src/pages/HomePage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaRegLightbulb,
  FaStore,
  FaClock,
  FaBullhorn,
  FaCommentDots,
} from "react-icons/fa";

import basicDragon from "../assets/image/기본전룡이.png";
import sittingDragon from "../assets/image/앉아있는전룡이.png";

function HomePage() {
  const festDate = new Date("2025-09-24");
  const today = new Date();
  const diff = Math.ceil((festDate - today) / (1000 * 60 * 60 * 24));
  const dDayText = `D-${diff > 0 ? diff : 0}`;

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById("miniMap");
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(35.176833, 126.9091),
        level: 5,
      };

      const map = new window.kakao.maps.Map(container, options);
      const markerPosition = new window.kakao.maps.LatLng(35.176833, 126.9091);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-gray-100 flex flex-col">
      {/* 상단 배너 */}
      <div className="w-full">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVMZdfAnSkYIc_0hIzuFUVWhGP-tOwjjSxw&s"
          alt="전남대 대동제"
          className="w-full h-48 object-cover"
        />
      </div>

      {/* D-day 표시 */}
      <div className="text-center mt-4">
        <p className="inline-block bg-green-100 text-green-800 font-bold px-4 py-2 rounded-full">
          {dDayText}
        </p>
      </div>

      {/* 버튼 좌우 배치 */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* 왼쪽 영역: 지도 + 피드백 */}
        <div className="flex flex-col gap-6">
          {/* 지도 */}
          <Link
            to="/map"
            className="bg-white rounded-3xl shadow overflow-hidden hover:scale-105 transition-transform"
          >
            <div className="w-full aspect-square">
              <div id="miniMap" className="w-full h-full" />
            </div>
            <div className="text-center py-2 text-green-800 font-semibold">
              지도
            </div>
          </Link>

          {/* 방명록 + 기본 전룡이 */}
          <div className="relative">
            <Link
              to="/guestbook"
              className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-3xl p-4 shadow transition text-center"
            >
              <FaCommentDots className="text-gray-600 text-3xl mb-2" />
              <span className="text-gray-800 font-semibold text-sm">방명록</span>
            </Link>
            <img
              src={basicDragon}
              alt="기본 전룡이"
              className="absolute -bottom-10 -left-4 w-16 md:w-20"
            />
          </div>

        </div>

        {/* 오른쪽 영역: 콘텐츠, 부스, 타임테이블, 공지사항 */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6">
          {/* 콘텐츠 + 앉아있는 용 */}
          <div className="relative">
            <Link
              to="/content"
              className="flex flex-col items-center justify-center bg-yellow-100 hover:bg-yellow-200 rounded-3xl p-4 shadow transition text-center"
            >
              <FaRegLightbulb className="text-yellow-600 text-3xl mb-2" />
              <span className="text-yellow-800 font-semibold text-sm">
                콘텐츠
              </span>
            </Link>
            <img
              src={sittingDragon}
              alt="앉은 전룡이"
              className="absolute -top-10 -right-5 w-16 md:w-20"
            />
          </div>

          {/* 부스 */}
          <Link
            to="/booth-list"
            className="flex flex-col items-center justify-center bg-pink-100 hover:bg-pink-200 rounded-3xl p-4 shadow transition text-center"
          >
            <FaStore className="text-pink-600 text-3xl mb-2" />
            <span className="text-pink-800 font-semibold text-sm">부스</span>
          </Link>

          {/* 타임테이블 */}
          <Link
            to="/timetable"
            className="flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-200 rounded-3xl p-4 shadow transition text-center"
          >
            <FaClock className="text-blue-600 text-3xl mb-2" />
            <span className="text-blue-800 font-semibold text-sm">
              타임테이블
            </span>
          </Link>

          {/* 공지사항 */}
          <Link
            to="/notice"
            className="flex flex-col items-center justify-center bg-purple-100 hover:bg-purple-200 rounded-3xl p-4 shadow transition text-center"
          >
            <FaBullhorn className="text-purple-600 text-3xl mb-2" />
            <span className="text-purple-800 font-semibold text-sm">
              공지사항
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
