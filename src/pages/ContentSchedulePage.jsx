import React from 'react';

// named export 방식으로 컴포넌트를 정의합니다.
// App.jsx에서 'import { ContentSchedulePage } from ...'로 불러와야 합니다.
export function ContentSchedulePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>콘텐츠 및 공연 일정 페이지</h1>
      <p>이곳에 콘텐츠와 공연 일정 내용이 표시됩니다.</p>
      {/* 여기에 나중에 실제 내용을 채워넣으면 됩니다. */}
    </div>
  );
}