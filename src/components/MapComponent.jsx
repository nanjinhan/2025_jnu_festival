import React, { useEffect, useRef, useState } from 'react';

function MapComponent() {
  const mapContainer = useRef(null);
  // 스크립트 로딩 상태를 관리하기 위한 state
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 1. 카카오맵 SDK 스크립트를 동적으로 로드하는 useEffect
  useEffect(() => {
    const script = document.createElement('script');
    // .env 파일의 환경 변수를 사용합니다. autoload=false가 중요합니다.
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // 스크립트가 로드되면 kakao.maps.load를 사용하여 지도를 초기화할 준비를 합니다.
      window.kakao.maps.load(() => {
        setIsScriptLoaded(true); // 스크립트 로딩 완료 상태를 true로 변경
      });
    };

    // 컴포넌트 언마운트 시 스크립트 태그를 제거합니다.
    return () => {
      // unmount될 때 스크립트가 head에 남아있을 수 있으므로, 해당 스크립트를 찾아서 제거합니다.
      const scripts = document.head.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('dapi.kakao.com')) {
          document.head.removeChild(scripts[i]);
        }
      }
    };
  }, []);

  // 부스 위치 데이터 (예시)
  const booths = [
    { id: 1, name: '메인 무대', position: [35.1777, 126.9068] },
    { id: 2, name: '푸드 트럭 존', position: [35.1771, 126.9069] },
    { id: 3, name: '체험 부스 A', position: [35.1765, 126.9070] },

  ];

  // 2. 스크립트가 로드된 후에 지도를 생성하는 useEffect
  useEffect(() => {
    // 스크립트가 로드되지 않았으면 아무것도 실행하지 않습니다.
    if (!isScriptLoaded) return;

    const options = {
      center: new window.kakao.maps.LatLng(35.171, 126.883),
      level: 4,
    };
    const map = new window.kakao.maps.Map(mapContainer.current, options);

    // 부스 마커와 정보창(팝업)을 지도에 추가합니다.
    booths.forEach(booth => {
      const markerPosition = new window.kakao.maps.LatLng(booth.position[0], booth.position[1]);
      const marker = new window.kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);
      const iwContent = `<div style="padding:5px; font-weight:bold;">${booth.name}</div>`;
      const infowindow = new window.kakao.maps.InfoWindow({ content: iwContent, removable: true });
      window.kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    });

    // 사용자 현재 위치를 찾는 로직
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const userPosition = new window.kakao.maps.LatLng(latitude, longitude);
          const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
          const imageSize = new window.kakao.maps.Size(34, 36);
          const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
          const userMarker = new window.kakao.maps.Marker({ position: userPosition, image: markerImage });
          userMarker.setMap(map);
          map.panTo(userPosition);
        },
        (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [isScriptLoaded]); // isScriptLoaded 상태가 true로 바뀌면 이 useEffect가 실행됩니다.

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
  );
}

export default MapComponent;
