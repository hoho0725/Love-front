import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarWithMarks.css';

function CalendarWithMarks({ diaries, selectedDate, onDateSelect }) {
  const getDiariesForDate = (date) => {
    return diaries.filter((d) => {
      const diaryDate = new Date(d.createdAt);
      return diaryDate.toDateString() === date.toDateString();
    });
  };

  const getHeartColor = (dateDiaries) => {
    const hasJinseo = dateDiaries.some(d => d.type.includes('진서'));
    const hasHoseong = dateDiaries.some(d => d.type.includes('호성'));
    const hasReview = dateDiaries.some(d => d.type.includes('데이트후기'));

    if (!hasReview) return null;
    if (hasJinseo && hasHoseong) return 'red';
    if (hasJinseo) return 'pink';
    if (hasHoseong) return 'blue';
    return null;
  };

  const hasType = (dateDiaries, type) => dateDiaries.some(d => d.type.includes(type) && !d.type.includes('데이트후기'));

  return (
    <Calendar
      onClickDay={onDateSelect}
      value={selectedDate}
      tileContent={({ date }) => {
        const dateDiaries = getDiariesForDate(date);
        const heartColor = getHeartColor(dateDiaries);
        const hasHoseong = hasType(dateDiaries, '호성');
        const hasJinseo = hasType(dateDiaries, '진서');

        return (
          <div className="tile-content">
            {heartColor && <span className={`heart ${heartColor}`}>❤</span>}
            {hasHoseong && <div className="dot blue" />}
            {hasJinseo && <div className="dot pink" />}
          </div>
        );
      }}
    />
  );
}

export default CalendarWithMarks;