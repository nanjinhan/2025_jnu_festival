// src/components/BoothList.jsx

import React from 'react';

function BoothList({
  isVisible, onClose, onOpen, booths, isLoading,
  selectedCategory, selectedSubCategory, setSelectedSubCategory, categoryMap
}) {

  const currentMainCategory = categoryMap.find(cat => cat.key === selectedCategory);
  const availableSubCategories = currentMainCategory ? currentMainCategory.subCategories : [];

  const filteredBooths = booths.filter(booth => {
    const mainCatObject = categoryMap.find(cat => cat.key === selectedCategory);
    if (!mainCatObject) return false; // 혹시 모를 에러 방지
    const mainCatNameToFilter = mainCatObject.name;
  
    const mainMatch = selectedCategory === 'ALL' || booth.main_category === mainCatNameToFilter;
    if (!mainMatch) {
      return false; // 대분류가 다르면 더 이상 비교할 필요 없음
    }
    const subCatObject = mainCatObject.subCategories.find(sub => sub.key === selectedSubCategory);
    const subCatNameToFilter = subCatObject ? subCatObject.name : '';
    const subMatch = selectedSubCategory === 'ALL' || booth.sub_category === subCatNameToFilter;
    
    return subMatch;
  });

  const renderContent = () => {
    if (isLoading) {
      return <p style={{ textAlign: 'center', color: '#666', paddingTop: '20px' }}>목록을 불러오는 중입니다...</p>;
    }
    if (filteredBooths.length === 0) {
      return <p style={{ textAlign: 'center', color: '#666', paddingTop: '20px' }}>표시할 부스가 없습니다.</p>;
    }
    return filteredBooths.map(booth => (
      <div key={booth.id} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
        <h3 style={{ margin: 0, fontWeight: 'bold' }}>{booth.name}</h3>
        <p style={{ margin: '4px 0 0', color: '#666' }}>{booth.description}</p>
      </div>
    ));
  };

  return (
    <div
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
        backgroundColor: 'white', borderTopLeftRadius: '20px', borderTopRightRadius: '20px',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
        transform: isVisible ? 'translateY(0)' : 'translateY(calc(100% - 70px))',
        transition: 'transform 0.3s ease-in-out', zIndex: 20,
        cursor: !isVisible ? 'pointer' : 'default',
      }}
      onClick={() => !isVisible && onOpen()}
    >
      <div
        onClick={(e) => { if (isVisible) { e.stopPropagation(); onClose(); } }}
        style={{ width: '100%', height: '70px', padding: '12px', cursor: 'pointer', textAlign: 'center', boxSizing: 'border-box' }}
      >
        <div style={{ width: '40px', height: '4px', backgroundColor: '#d0d0d0', borderRadius: '2px', margin: '0 auto' }} />
        {/* ✅ 1. 비어있던 p 태그에 텍스트 추가 */}
        <p style={{ margin: '8px 0 0', fontWeight: 'bold', fontSize: '16px', color: '#555' }}>
          
        </p>
      </div>

      {isVisible && availableSubCategories.length > 0 && (
        <div className="horizontal-scroll-container" style={{ padding: '0 16px 12px', borderBottom: '1px solid #eee', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <button onClick={() => setSelectedSubCategory('ALL')} style={{ backgroundColor: selectedSubCategory === 'ALL' ? '#e8f0fe' : '#f1f3f4', color: selectedSubCategory === 'ALL' ? '#1967d2' : '#3c4043', border: 'none', padding: '6px 12px', borderRadius: '16px', marginRight: '8px', cursor: 'pointer', fontWeight: '500' }}>
            전체
          </button>
          {availableSubCategories.map(subCat => (
            <button
              key={subCat.key}
              onClick={() => setSelectedSubCategory(subCat.key)}
              style={{
                backgroundColor: selectedSubCategory === subCat.key ? '#e8f0fe' : '#f1f3f4',
                color: selectedSubCategory === subCat.key ? '#1967d2' : '#3c4043',
                border: 'none', padding: '6px 12px', borderRadius: '16px', marginRight: '8px', cursor: 'pointer', fontWeight: '500'
              }}
            >
              {subCat.name}
            </button>
          ))}
        </div>
      )}

      <div style={{ overflowY: 'auto', height: `calc(100% - 70px - ${isVisible && availableSubCategories.length > 0 ? '53px' : '0px'})`, padding: '0 16px' }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default BoothList;