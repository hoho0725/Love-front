import React, { useState } from 'react';
import './DiaryFormModal.css';

function DiaryFormModal({ onClose, onSubmit, defaultDate, availableTypes }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState(availableTypes[0] || '호성'); // 기본값으로 첫 번째 타입을 선택

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit({ type, title, content, createdAt: defaultDate }); // 데이터를 부모 컴포넌트로 전달
    setTitle('');
    setContent('');
  };

  return (
    <div className="diary-form-overlay" onClick={onClose}>
      <div className="diary-form-modal" onClick={(e) => e.stopPropagation()}>
        <h3>✍️ 일기 작성</h3>
        <label>
          종류
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {availableTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          제목
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          내용
          <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <div className="form-buttons">
          <button onClick={onClose}>취소</button>
          <button onClick={handleSubmit}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default DiaryFormModal;
