// CloudStoragePage.js
import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import './CloudStoragePage.css'

function CloudStoragePage() {
  const [updateKey, setUpdateKey] = useState(0); // 파일 목록을 새로 고침하기 위한 key

  // 파일 업로드 후 파일 목록을 새로 가져오도록 부모 컴포넌트에서 처리
  const handleFileUploaded = () => {
    setUpdateKey((prevKey) => prevKey + 1); // key 값을 바꿔서 새로 고침
  };

  return (
    <div className="cloud-storage-page">
      <FileUpload onFileUploaded={handleFileUploaded} />
      <FileList key={updateKey} /> {/* key 값을 바꿔서 컴포넌트 새로 렌더링 */}
    </div>
  );
}

export default CloudStoragePage;
