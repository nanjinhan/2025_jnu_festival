// src/pages/MapPage.jsx

import React, { useEffect, useState } from 'react';
import MapComponent from '../components/MapComponent';
import BoothList from '../components/BoothList';
import FilterControls from '../components/FilterControls'; // 필터 UI 컴포넌트 import
import BoothData from '../data/BoothData'; // ✅ 1. 데이터 파일 import
//import { fetchBooths } from '../services/api';
import './MapPage.css'; // 스크롤바 숨김 CSS를 위해 import

// 카테고리 데이터 구조
const CATEGORY_MAP = [
  { key: 'ALL', name: '전체', subCategories: [] },
  { key: 'PERFORMANCE', name: '공연 구역', subCategories: [
    { key: 'MAIN_STAGE', name: '본무대' },
    { key: 'STREET_KARAOKE', name: '거리노래방' },
  ]},
  { key: 'BOOTH', name: '부스 구역', subCategories: [
    { key: 'STUDENT_BOOTH', name: '학생부스' },
    { key: 'COMPANY_BOOTH', name: '기업부스' },
  ]},
  { key: 'EXPERIENCE', name: '체험 구역', subCategories: [
    { key: 'CONTENTS_ZONE', name: '컨텐츠존' },
    { key: 'PHOTO_ZONE', name: '포토존' },
  ]},
  { key: 'FNB', name: 'F&B 구역', subCategories: [
    { key: 'FOOD_TRUCK', name: '푸드트럭' },
    { key: 'TABLE_ZONE', name: '테이블존' },
  ]},
  { key: 'SUPPORT', name: '운영 및 지원 구역', subCategories: [
    { key: 'WRISTBAND_BOOTH', name: '팔찌 배부 부스' },
    { key: 'SAFETY_BOOTH', name: '안전관리부스' },
    { key: 'RESTROOM', name: '화장실' },
  ]},
];

// 운영 시간 필터 데이터
const TIME_FILTERS = [
  { key: 'ALL', name: '전체' },
  { key: 'DAY', name: '낮 운영' },
  { key: 'NIGHT', name: '밤 운영' },
  { key: 'ALL_DAY', name: '상시 운영' },
];

function MapPage() {
  // 모든 상태(State)는 MapPage에서 중앙 관리합니다.
 // const [booths, setBooths] = useState([]);
  const [booths, setBooths] = useState(BoothData);
  //const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_MAP[0].key);
  const [selectedSubCategory, setSelectedSubCategory] = useState('ALL');
  const [selectedTime, setSelectedTime] = useState(TIME_FILTERS[0].key);
  const [searchTerm, setSearchTerm] = useState('');
/*
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchBooths();
      setBooths(data);
      setIsLoading(false);
    };
    loadData();
  }, []);
*/
  const handleSelectCategory = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setSelectedSubCategory('ALL'); // 대분류 변경 시 소분류는 '전체'로 초기화
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 필터 UI는 FilterControls 컴포넌트가 모두 담당합니다. */}
      <FilterControls
        categoryMap={CATEGORY_MAP}
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
        timeFilters={TIME_FILTERS}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* 지도 컴포넌트 */}
      <MapComponent
        booths={booths}
        onMarkerClick={() => setIsSheetOpen(true)}
        selectedCategory={selectedCategory}
        categoryMap={CATEGORY_MAP}
        selectedTime={selectedTime}
        searchTerm={searchTerm}
      />

      {/* 부스 목록 바텀 시트 */}
      <BoothList
        isVisible={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onOpen={() => setIsSheetOpen(true)}
        booths={booths}
        isLoading={isLoading}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        categoryMap={CATEGORY_MAP}
        selectedTime={selectedTime}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default MapPage;