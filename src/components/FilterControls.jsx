import React from 'react';

function FilterControls({
  categoryMap,
  selectedCategory,
  handleSelectCategory,
  timeFilters,
  selectedTime,
  setSelectedTime,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      right: '20px',
      zIndex: 10,
      display: 'flex',       // Flexbox 레이아웃 사용
      flexDirection: 'column', // 아이템을 세로로 배치
      gap: '12px',             // 아이템 사이의 간격
    }}>
        <div>
        <input
          type="text"
          placeholder="부스 이름으로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%', padding: '10px 15px', borderRadius: '12px',
            border: '1px solid #ddd', fontSize: '16px', boxSizing: 'border-box',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}
        />
      </div>
        
        
      {/* 1. 대분류 필터 */}
      <div className="horizontal-scroll-container" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {categoryMap.map((category) => (
          <button
            key={category.key}
            onClick={() => handleSelectCategory(category.key)}
            style={{
              display: 'inline-block', marginRight: '8px', padding: '8px 16px',
              border: '1px solid #ddd', borderRadius: '20px', cursor: 'pointer',
              backgroundColor: selectedCategory === category.key ? '#1a73e8' : '#ffffff',
              color: selectedCategory === category.key ? '#ffffff' : '#000000',
              fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease'
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 2. 운영 시간 필터 */}
      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {timeFilters.map((time) => (
          <button
            key={time.key}
            onClick={() => setSelectedTime(time.key)}
            style={{
              flexGrow: 1, padding: '8px 16px', border: '1px solid #ddd', borderRadius: '8px',
              border: '1px solid #ddd', borderRadius: '20px', cursor: 'pointer',
              backgroundColor: selectedTime === time.key ? '#333' : '#fff',
              color: selectedTime === time.key ? '#fff' : '#333',
              fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s ease'
            }}
          >
            {time.name}
          </button>
        ))}
      </div>

      {/* 3. 검색창 */}
      
    </div>
  );
}

export default FilterControls;