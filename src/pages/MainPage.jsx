import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <section className="main-hero">
        <h1>💕 우리의 추억을 기록해요</h1>
        <p>매일의 하루, 특별했던 순간을 다이어리처럼 남겨보세요</p>
      </section>

      <section className="feature-grid">
        <div className="feature-card" onClick={() => navigate('/diary')}>
          📅 <strong>기념일 캘린더</strong>
          <p>D-Day를 함께 세보는 작은 행복</p>
        </div>
        <div className="feature-card" onClick={() => navigate('/memory')}>
          🌸 <strong>추억 갤러리</strong>
          <p>함께한 순간들을 사진으로 남겨보세요</p>
        </div>
        <div className="feature-card" onClick={() => navigate('/bucket')}>
          📝 <strong>버킷리스트</strong>
          <p>우리만의 목표, 함께 하나씩 이뤄봐요</p>
        </div>
        <div className="feature-card" onClick={() => navigate('/emotion')}>
          💌 <strong>감정 일기</strong>
          <p>오늘의 기분을 서로 공유해보세요</p>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
