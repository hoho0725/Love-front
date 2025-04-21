import React, { useState, useEffect, useRef } from 'react';
import './DiaryModal.css';
import DiaryCard from './DiaryCard';
import DiaryFormModal from './DiaryFormModal';
import { updateDiary, deleteDiary } from '../api'; // API import

const MAX_TYPES = [
  '호성',
  '진서',
  '데이트후기-호성',
  '데이트후기-진서'
];

function DiaryModal({ diaries = [], onClose, selectedDate, onSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false); // showForm 상태 추가
  const [editingDiary, setEditingDiary] = useState(null); // 수정할 일기를 저장할 상태 추가
  const [filteredDiaries, setFilteredDiaries] = useState(diaries);
  const startY = useRef(null);

  useEffect(() => {
    setFilteredDiaries(diaries); // 다이어리를 처음에 필터링하여 상태 설정
  }, [diaries]);

  if (!selectedDate) return null; // selectedDate가 없으면 렌더링하지 않음

  const existingTypes = diaries.map((d) => d.type);
  const availableTypes = MAX_TYPES.filter((type) => !existingTypes.includes(type));

  const showDiaryForm = diaries.length < 4; // 일기가 4개 미만일 때만 작성 폼을 보여줌

  // 작성 버튼을 숨기기 위한 조건: 모든 MAX_TYPES가 작성되었을 때
  const isAllDiariesWritten = existingTypes.length === MAX_TYPES.length;

  // 일기 수정 함수
  const handleEdit = (diary) => {
    setShowForm(true); // 일기 수정 폼을 열기
    setEditingDiary(diary); // 수정할 일기 데이터를 설정
  };

  // 일기 삭제 함수
  const handleDelete = async (id) => {
    await deleteDiary(id); // API를 통해 삭제
    setFilteredDiaries((prev) => prev.filter((diary) => diary.id !== id)); // 로컬 상태에서 삭제
  };

  const handleSubmit = (data) => {
    if (editingDiary) {
      updateDiary(editingDiary.id, data).then((res) => {
        setFilteredDiaries((prev) =>
          prev.map((diary) => (diary.id === res.data.diary.id ? res.data.diary : diary))
        );
        setShowForm(false);
      });
    } else {
      onSubmit(data); // 일기 제출 처리
      setShowForm(false); // 작성 후 폼 닫기
    }
  };

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY.current - endY;
    if (diff > 50 && currentIndex < diaries.length - 1) {
      setCurrentIndex(currentIndex + 1); // 아래로 스와이프
    } else if (diff < -50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // 위로 스와이프
    }
  };

  // X 버튼 클릭 시 모달 닫기
  const handleClose = () => {
    onClose();
    document.body.style.overflow = 'auto'; // 스크롤 복원
  };

  // 날짜를 클릭하면 스크롤을 막도록 설정
  const handleDateClick = (e) => {
    document.body.style.overflow = 'hidden'; // 스크롤 비활성화
  };

  // 날짜 모달을 닫을 때 스크롤 복원
  const handleModalClose = () => {
    onClose();
    document.body.style.overflow = 'auto'; // 스크롤 복원
  };

  return (
    <div className="diary-modal-overlay" onClick={handleModalClose}>
      <div
        className="diary-modal-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="modal-header">
          <span
            className="modal-date"
            onClick={handleDateClick} // 날짜 클릭 시 스크롤 방지
          >
            📅 {selectedDate.toLocaleDateString()}
          </span>
          <button className="close-btn" onClick={handleClose}>✖</button>
        </div>

        {/* 이전 미리보기 (잘린 카드) */}
        {currentIndex > 0 && (
          <div
            className="diary-preview preview-up"
            onClick={() => setCurrentIndex(currentIndex - 1)} // 이전 일기로 이동
          >
            <div className="preview-title">
              {diaries[currentIndex - 1]?.title || '제목 없음'}
            </div>
          </div>
        )}

        {/* 현재 일기 */}
        {filteredDiaries.length > 0 && filteredDiaries[currentIndex] && (
          <DiaryCard
            diary={filteredDiaries[currentIndex]}
            onEdit={handleEdit} // 수정 함수 전달
            onDelete={handleDelete} // 삭제 함수 전달
          />
        )}

        {/* 다음 미리보기 (잘린 카드) */}
        {currentIndex < filteredDiaries.length - 1 && (
          <div
            className="diary-preview preview-down"
            onClick={() => setCurrentIndex(currentIndex + 1)} // 다음 일기로 이동
          >
            <div className="preview-title">
              {filteredDiaries[currentIndex + 1]?.title || '제목 없음'}
            </div>
          </div>
        )}

        {/* 작성 폼 */}
        {!isAllDiariesWritten && showForm && (
          <div className="diary-form-container">
            <DiaryFormModal
              onClose={handleClose}
              onSubmit={handleSubmit}
              defaultDate={selectedDate}
              availableTypes={availableTypes}
              editingDiary={editingDiary} // 수정할 일기 전달
            />
          </div>
        )}

        {/* 작성 버튼 */}
        {!isAllDiariesWritten && !showForm && (
          <div className="add-diary-button-container">
            <button
              className="add-diary-button"
              onClick={() => setShowForm(true)} // 작성 버튼 클릭 시 폼 열기
            >
              ✍️ 일기 작성하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiaryModal;
