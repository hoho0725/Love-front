// src/pages/MainPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();

  const handleDateClick = () => {
    // 예시: 날짜 클릭하면 일기 페이지로 이동
    navigate('/diary');
  };

  return (
    <div className="main-container">
      <h1>우리의 추억 💑</h1>
      <div className="content-wrapper">
        <div className="calendar-section">
          <div className="calendar-box" onClick={handleDateClick}>
            📅 캘린더 (클릭 시 일기 페이지로 이동)
          </div>
        </div>
        <div className="memory-section">
          <div className="memory-box">🌸 추억 사진 썸네일</div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
