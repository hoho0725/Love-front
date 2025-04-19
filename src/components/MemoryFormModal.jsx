// src/components/MemoryFormModal.jsx
import React, { useState, useEffect } from 'react';
import './MemoryFormModal.css';

function MemoryFormModal({ onClose, onSubmit, defaultData }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('호성');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (defaultData) {
      setTitle(defaultData.title || '');
      setAuthor(defaultData.author || '호성');
      setContent(defaultData.content || '');
    }
  }, [defaultData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, content });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{defaultData ? '추억 수정하기' : '새로운 추억 작성'}</h3>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" required />
          <select value={author} onChange={(e) => setAuthor(e.target.value)}>
            <option value="호성">호성</option>
            <option value="진서">진서</option>
          </select>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" required />
          <button type="submit">저장</button>
          <button type="button" onClick={onClose}>닫기</button>
        </form>
      </div>
    </div>
  );
}

export default MemoryFormModal;
