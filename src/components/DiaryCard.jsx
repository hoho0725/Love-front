// src/components/DiaryCard.jsx
import React from 'react';
import './DiaryCard.css';

function DiaryCard({ diary }) {
  return (
    <div className="diary-card">
      {diary.title && <h3 className="diary-title">{diary.title}</h3>}
      <p className="diary-meta">✍️ {diary.type}</p>
      <p className="diary-content">{diary.content}</p>
    </div>
  );
}

export default DiaryCard;
