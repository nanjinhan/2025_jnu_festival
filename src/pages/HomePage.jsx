import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaRegLightbulb,
  FaStore,
  FaClock,
  FaBullhorn,
  FaCommentDots,
} from "react-icons/fa";

function HomePage() {
  const festDate = new Date("2025-09-24");
  const today = new Date();
  const diff = Math.ceil(
    (festDate - today) / (1000 * 60 * 60 * 24)
  );
  const dDayText = `D-${diff > 0 ? diff : 0}`;

  // 여기에 카카오맵 초기화 코드
  useEffect(() => {
    const container = document.getElementById("miniMap");
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(35.176833, 126.909100),
      level: 5,
    };

    const map = new window.kakao.maps.Map(container, options);

    const markerPosition = new window.kakao.maps.LatLng(35.176833, 126.909100);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-gray-100 flex flex-col">
      {/* 상단 배너 이미지 */}
      <div className="w-full">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVMZdfAnSkYIc_0hIzuFUVWhGP-tOwjjSxw&s"
          alt="전남대 대동제"
          className="w-full h-48 object-cover"
        />
      </div>

      {/* D-Day 텍스트 */}
      <div className="text-center mt-4">
        <p className="inline-block bg-green-100 text-green-800 font-bold px-4 py-2 rounded-full">
          {dDayText}
        </p>
      </div>

      {/* 버튼 그리드 */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {/* 지도 미리보기 */}
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

        {/* 나머지 버튼들 */}

        <Link
          to="/content"
          className="flex flex-col items-center justify-center bg-yellow-100 hover:bg-yellow-200 rounded-3xl p-4 shadow transition text-center"
        >
          <FaRegLightbulb className="text-yellow-600 text-3xl mb-2" />
          <span className="text-yellow-800 font-semibold text-sm">콘텐츠</span>
        </Link>

        <Link
          to="/booth-list"
          className="flex flex-col items-center justify-center bg-pink-100 hover:bg-pink-200 rounded-3xl p-4 shadow transition text-center"
        >
          <FaStore className="text-pink-600 text-3xl mb-2" />
          <span className="text-pink-800 font-semibold text-sm">부스</span>
        </Link>

        <Link
          to="/timetable"
          className="flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-200 rounded-3xl p-4 shadow transition text-center"
        >
          <FaClock className="text-blue-600 text-3xl mb-2" />
          <span className="text-blue-800 font-semibold text-sm">타임테이블</span>
        </Link>

        <Link
          to="/notice"
          className="flex flex-col items-center justify-center bg-purple-100 hover:bg-purple-200 rounded-3xl p-4 shadow transition text-center"
        >
          <FaBullhorn className="text-purple-600 text-3xl mb-2" />
          <span className="text-purple-800 font-semibold text-sm">공지사항</span>
        </Link>

        <Link
          to="/feedback"
          className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-3xl p-4 shadow transition text-center"
        >
          <FaCommentDots className="text-gray-600 text-3xl mb-2" />
          <span className="text-gray-800 font-semibold text-sm">피드백</span>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
