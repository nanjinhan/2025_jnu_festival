// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaClock,
  FaRegLightbulb,
  FaStore,
  FaShieldAlt,
  FaSearch,
} from "react-icons/fa";

import bgImage from "../assets/image/배경.png";
import logoImage from "../assets/image/로고.png";

export default function HomePage() {
  const buttons = [
    {
      title: "지도",
      desc: "축제장 전체 보기",
      Icon: FaMapMarkedAlt,
      color: "text-green-700",
      link: "/map",
      span2: true, // 가로 2칸
    },
    {
      title: "부스",
      desc: "먹거리 & 체험",
      Icon: FaStore,
      color: "text-green-700",
      link: "/booth-list",
    },
    {
      title: "콘텐츠",
      desc: "이벤트 & 즐길거리",
      Icon: FaRegLightbulb,
      color: "text-green-700",
      link: "/content",
    },
    {
      title: "타임테이블",
      desc: "라인업",
      Icon: FaClock,
      color: "text-green-700",
      link: "/timetable",
    },
    {
      title: "분실물",
      desc: "습득 & 접수",
      Icon: FaSearch,
      color: "text-green-700",
      link: "/lost-found",
    },
    {
      title: "유의사항",
      desc: "전대학생존, 입퇴장 및 이동동선,무대 관람 시 유의사항, 베이어 프리존 안내, 테이블존 이용수칙",
      Icon: FaShieldAlt,
      color: "text-green-700",
      link: "/safety",
      span2: true, // 지도와 동일하게 가로 2칸
    },
  ];

  return (
    <div className="w-full min-h-screen relative">
      {/* 배경 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* 로고 */}
      <div className="relative z-10 flex justify-center pt-6 pb-4">
        <img
          src={logoImage}
          alt="용비봉무 로고"
          className="w-48 md:w-64 object-contain"
        />
      </div>

      {/* 버튼 */}
      <div className="relative z-10 max-w-md mx-auto px-5 pb-10">
        <div className="grid grid-cols-2 gap-4">
          {buttons.map(({ title, desc, Icon, color, link, span2 }) => (
            <Link
              key={title}
              to={link}
              className={`group bg-white/90 backdrop-blur-sm rounded-2xl shadow hover:shadow-md 
                          transition-all hover:scale-[1.02] p-4 flex flex-col justify-between min-h-28 
                          ${span2 ? "col-span-2 min-h-36" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="text-lg font-extrabold">{title}</div>
                <div className={`text-3xl ${color}`}>
                  <Icon />
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-600">{desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
