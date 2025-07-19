// src/components/BoothList.jsx

import React from 'react';

function BoothList({ isVisible, onClose, onOpen, booths, selectedCategory, categories }) {
  // 현재 선택된 카테고리에 맞는 부스만 필터링
  const filteredBooths = booths.filter(booth => 
    selectedCategory === categories.ALL || booth.main_category === selectedCategory
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        backgroundColor: 'white',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
        transform: isVisible ? 'translateY(0)' : 'translateY(calc(100% - 70px))',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 20,
        cursor: !isVisible ? 'pointer' : 'default',
      }}
      onClick={() => !isVisible && onOpen()}
    >
      {/* 상단 핸들 및 닫기 영역 */}
      <div
        onClick={(e) => {
          if (isVisible) {
            e.stopPropagation();
            onClose();
          }
        }}
        style={{ width: '100%', padding: '12px', cursor: 'pointer', textAlign: 'center' }}
      >
        <div style={{ width: '40px', height: '4px', backgroundColor: '#d0d0d0', borderRadius: '2px', margin: '0 auto' }} />
        <p style={{ margin: '8px 0 0', fontWeight: 'bold', fontSize: '16px', color: '#555' }}>
          {isVisible ? '목록 닫기' : '부스 목록 보기'}
        </p>
      </div>

      {/* 부스 목록 (스크롤 가능) */}
      <div style={{ overflowY: 'auto', height: 'calc(100% - 70px)', padding: '0 16px' }}>
        {filteredBooths.map(booth => (
          <div key={booth.id} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
            <h3 style={{ margin: 0, fontWeight: 'bold' }}>{booth.name}</h3>
            <p style={{ margin: '4px 0 0', color: '#666' }}>{booth.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoothList;