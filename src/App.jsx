import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DiaryPage from './pages/DiaryPage';
import MemoryPage from './pages/MemoryPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/diary">일기</Link>
          <Link to="/memory">추억</Link>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/memory" element={<MemoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
