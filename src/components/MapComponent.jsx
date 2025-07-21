// src/components/MapComponent.jsx

import React, { useEffect, useRef, useState } from 'react';

function MapComponent({ booths,
  onMarkerClick,
  selectedCategory,
  categoryMap,
  selectedTime,   // 👈 이 prop과
  searchTerm }) {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 카카오맵 스크립트 로딩
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => window.kakao.maps.load(() => setIsScriptLoaded(true));
  }, []);

  // 지도 초기 생성
  useEffect(() => {
    if (!isScriptLoaded || !mapContainer.current) return;
    const options = {
      center: new window.kakao.maps.LatLng(35.176833, 126.909100),
      level: 4,
    };
    const newMap = new window.kakao.maps.Map(mapContainer.current, options);
    setMap(newMap);
  }, [isScriptLoaded]);

  // 마커 생성 및 필터링
  useEffect(() => {
    if (!map) return;

    markers.forEach(marker => marker.setMap(null));
    const newMarkers = [];

    const currentCategory = categoryMap.find(cat => cat.key === selectedCategory);
    const categoryNameToFilter = currentCategory ? currentCategory.name : '';

    booths
      // ✅ 2. 필터링 로직에 검색 조건 추가
      .filter(booth => {
        const categoryMatch = selectedCategory === 'ALL' || booth.main_category === categoryNameToFilter;
        const timeMatch = selectedTime === 'ALL' || booth.operating_time === selectedTime;
        // booth.name이 검색어를 포함하는지 확인 (대소문자 구분 없음)
        const searchMatch = (booth.name || '')
          .toLowerCase()
          .includes((searchTerm || '').toLowerCase());

        
        return categoryMatch && timeMatch && searchMatch;
      })
      .forEach(booth => {
        const markerPosition = new window.kakao.maps.LatLng(booth.latitude, booth.longitude);
        const marker = new window.kakao.maps.Marker({ position: markerPosition, title: booth.name });
        
        window.kakao.maps.event.addListener(marker, 'click', () => {
          onMarkerClick();
          map.panTo(markerPosition);
        });
        
        marker.setMap(map);
        newMarkers.push(marker);
      });

    setMarkers(newMarkers);
  },[map, booths, selectedCategory, selectedTime, searchTerm, onMarkerClick, categoryMap]);

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
  );
}

export default MapComponent;