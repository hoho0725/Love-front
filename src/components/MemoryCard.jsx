// src/components/MemoryCard.jsx
import React from 'react';
import './MemoryCard.css';

function MemoryCard({ memory, onEdit, onDelete, isRandom = false }) {
  return (
    <div className={`memory-card ${isRandom ? 'random-card' : ''}`}>
      {isRandom && <div className="random-badge">✨ 랜덤 추억</div>}
      <h4 className="memory-card-title">{memory.title}</h4>
      <p><strong>작성자:</strong> {memory.author}</p>
      <p>{memory.content}</p>
      {onEdit && onDelete && (
        <div className="memory-actions">
          <button className="edit-btn" onClick={() => onEdit(memory)}>수정</button>
          <button className="delete-btn" onClick={() => onDelete(memory._id)}>삭제</button>
        </div>
      )}
    </div>
  );
}

export default MemoryCard;
