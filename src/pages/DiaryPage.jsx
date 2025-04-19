// src/pages/DiaryPage.jsx
import React, { useEffect, useState } from 'react';
import CalendarWithMarks from '../components/CalendarWithMarks';
import DiaryModal from '../components/DiaryModal';
import { fetchDiaries } from '../api';
import './DiaryPage.css';

function DiaryPage() {
  const [allDiaries, setAllDiaries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredDiaries, setFilteredDiaries] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadDiaries = async () => {
      const res = await fetchDiaries();
      setAllDiaries(res.data.diaries);
    };
    loadDiaries();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  
    const matched = allDiaries.filter((d) => {
      const diaryDate = new Date(d.createdAt);
      return diaryDate.toDateString() === date.toDateString();
    });
  
    setFilteredDiaries(matched);
    setShowModal(true); // ✅ 무조건 모달 열림
  };

  return (
    <div className="diary-page">
      <h2 className="diary-title">📔 우리의 일기장</h2>
      <CalendarWithMarks
        diaries={allDiaries}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      {showModal && (
        <DiaryModal
          diaries={filteredDiaries}
          onClose={() => setShowModal(false)}
          selectedDate={selectedDate}
          onSubmit={(data) => {
            // 작성된 일기를 저장한 뒤, 새로 불러와서 다시 보여줌
            setAllDiaries((prev) => [...prev, data]);
            setFilteredDiaries((prev) => [...prev, data]);
          }}
        />
      )}
    </div>
  );
}

export default DiaryPage;
