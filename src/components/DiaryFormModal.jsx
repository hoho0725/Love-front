// src/components/DiaryModal.jsx
import React, { useEffect, useState } from 'react';
import './DiaryModal.css';
import DiaryCard from './DiaryCard';
import DiaryFormModal from './DiaryFormModal';

const MAX_TYPES = [
  '호성',
  '진서',
  '데이트후기-호성',
  '데이트후기-진서'
];

function DiaryModal({ diaries, onClose, selectedDate, onSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startY = React.useRef(null);

  const existingTypes = (diaries || []).map((d) => d.type);
  const availableTypes = MAX_TYPES.filter((type) => !existingTypes.includes(type));
  const showForm = availableTypes.length > 0;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY.current - endY;
    if (diff > 50 && currentIndex < diaries.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else if (diff < -50 && currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="diary-modal-overlay" onClick={onClose}>
      <div
        className="diary-modal-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="modal-header">
          <span className="modal-date">📅 {selectedDate.toLocaleDateString()}</span>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {/* 이전 미리보기 */}
        {currentIndex > 0 && (
          <div
            className="diary-preview preview-up"
            data-title={diaries[currentIndex - 1].title || '제목 없음'}
          >
            ⬆ 다른 일기
          </div>
        )}

        {/* 현재 일기 */}
        {diaries.length > 0 && <DiaryCard diary={diaries[currentIndex]} />}

        {/* 다음 미리보기 */}
        {currentIndex < diaries.length - 1 && (
          <div
            className="diary-preview preview-down"
            data-title={diaries[currentIndex + 1].title || '제목 없음'}
          >
            ⬇ 다른 일기
          </div>
        )}

        {/* 작성폼 */}
        {showForm && (
          <div className="diary-form-container">
            <DiaryFormModal
              onClose={onClose}
              onSubmit={handleSubmit}
              defaultDate={selectedDate}
              availableTypes={availableTypes}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DiaryModal;
