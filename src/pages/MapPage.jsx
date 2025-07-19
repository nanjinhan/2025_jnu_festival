// src/pages/MapPage.jsx

import React, { useEffect, useState } from 'react';
import MapComponent from '../components/MapComponent';
import BoothList from '../components/BoothList';
import { fetchBooths } from '../services/api';
import './MapPage.css'; // 스크롤바 숨김 CSS를 위해 import

// 카테고리 데이터 구조 (이 부분은 이전과 동일하게 잘 되어있습니다)
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

function MapPage() {
  const [booths, setBooths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_MAP[0].key); // 'ALL'
  const [selectedSubCategory, setSelectedSubCategory] = useState('ALL');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchBooths();
      setBooths(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // ✅ 1. 대분류 선택 시 소분류는 '전체'로 초기화하는 핸들러
  const handleSelectCategory = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setSelectedSubCategory('ALL');
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 카테고리 스크롤 버튼 컨테이너 */}
      <div
        className="horizontal-scroll-container"
        style={{
          position: 'absolute', top: '20px', left: 0, right: 0,
          zIndex: 10, overflowX: 'auto', whiteSpace: 'nowrap', padding: '0 20px'
        }}
      >
        {/* ✅ 2. CATEGORY_MAP을 직접 순회하도록 수정 */}
        {CATEGORY_MAP.map((category) => (
          <button
            key={category.key}
            onClick={() => handleSelectCategory(category.key)} // ✅ 핸들러 연결 수정
            style={{
              display: 'inline-block', marginRight: '8px', padding: '8px 16px',
              border: '1px solid #ddd', borderRadius: '20px', cursor: 'pointer',
              backgroundColor: selectedCategory === category.key ? '#1a73e8' : '#ffffff',
              color: selectedCategory === category.key ? '#ffffff' : '#000000',
              fontWeight: 'semibold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease'
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 지도 컴포넌트 */}
      <MapComponent
        booths={booths}
        onMarkerClick={() => setIsSheetOpen(true)}
        selectedCategory={selectedCategory}
        categoryMap={CATEGORY_MAP}
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
      />
    </div>
  );
}

export default MapPage;