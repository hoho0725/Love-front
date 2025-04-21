import React from 'react';
import './DiaryCard.css';

function DiaryCard({ diary, onEdit, onDelete }) {
  return (
    <div className="diary-card">
      {diary.title && <h3 className="diary-title">{diary.title}</h3>}
      <p className="diary-meta">✍️ {diary.type}</p>
      <p className="diary-content">{diary.content}</p>
      <div className="diary-actions">
        <button onClick={() => onEdit(diary)}>수정</button>
        <button onClick={() => onDelete(diary.id)}>삭제</button>
      </div>
    </div>
  );
}

export default DiaryCard;
