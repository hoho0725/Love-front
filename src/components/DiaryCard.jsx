import React from 'react';
import './DiaryCard.css';

function DiaryCard({ diary, onEdit, onDelete }) {
  return (
    <div className="diary-card">
      {diary.title && <h3 className="diary-title">{diary.title}</h3>}
      <p className="diary-meta">✍️ {diary.type}</p>
      <p className="diary-content">{diary.content}</p>
      <div className="diary-actions">
        <button className="diary-actions" onClick={() => onEdit(diary)}>수정</button>
        <button className="diary-actions" onClick={() => onDelete(diary.id)}>삭제</button>
      </div>
    </div>
  );
}

export default DiaryCard;
