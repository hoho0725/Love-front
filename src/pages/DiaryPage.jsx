import React, { useEffect, useState } from 'react';
import CalendarWithMarks from '../components/CalendarWithMarks';
import DiaryModal from '../components/DiaryModal';
import { fetchDiaries, createDiary } from '../api'; // API import
import './DiaryPage.css';

function DiaryPage() {
  const [allDiaries, setAllDiaries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredDiaries, setFilteredDiaries] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 모든 일기 불러오기
  useEffect(() => {
    const loadDiaries = async () => {
      const res = await fetchDiaries(); // 일기 불러오기
      setAllDiaries(res.data.diaries);
    };
    loadDiaries();
  }, []);

  // 날짜 선택 시 해당 날짜의 일기 불러오기
  const handleDateSelect = (date) => {
    setSelectedDate(date); // 날짜를 설정
    setShowModal(true); // 모달을 열기

    // 해당 날짜에 작성된 일기 필터링
    const matched = allDiaries.filter((d) => {
      const diaryDate = new Date(d.createdAt);
      return diaryDate.toDateString() === date.toDateString();
    });

    setFilteredDiaries(matched); // 필터링된 일기 설정
  };

  // 일기 작성 후 처리 함수
  const handleSubmit = async (newDiary) => {
    const res = await createDiary(newDiary); // 백엔드에 새 일기 저장
    setAllDiaries((prevDiaries) => [...prevDiaries, res.data.diary]);  // 일기 목록에 추가
    setFilteredDiaries((prevDiaries) => [...prevDiaries, res.data.diary]);
  };

  return (
    <div className="diary-page">
      <h2 className="diary-title">📔 우리의 일기장</h2>

      {/* Calendar 컴포넌트 */}
      <CalendarWithMarks
        diaries={allDiaries}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect} // 날짜 클릭 시 해당 함수 호출
      />

      {/* DiaryModal이 열릴 때만 렌더링 */}
      {showModal && selectedDate && (
        <DiaryModal
          diaries={filteredDiaries}
          onClose={() => setShowModal(false)} // 모달 닫기
          selectedDate={selectedDate} // 선택된 날짜 전달
          onSubmit={handleSubmit} // onSubmit은 handleSubmit로 변경
        />
      )}
    </div>
  );
}

export default DiaryPage;
