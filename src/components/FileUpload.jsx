// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'

function FileUpload({ onFileUploaded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // 파일 선택 처리
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(''); // 오류 메시지 초기화
    }
  };

  // 파일 업로드 처리 (파일 이름을 인코딩하여 서버에 전송)
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadError('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    const encodedFileName = encodeURIComponent(selectedFile.name); // 파일 이름을 인코딩
    formData.append('file', selectedFile, encodedFileName); // 인코딩된 파일 이름을 포함하여 업로드

    setIsUploading(true);
    setUploadError('');
    try {
      await axios.post('https://api.ddoddohoho.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onFileUploaded(); // 파일 업로드 후 부모 컴포넌트에 알리기
      setSelectedFile(null); // 파일 업로드 후 파일 선택 초기화
    } catch (error) {
      setUploadError('파일 업로드 실패');
      console.error('업로드 실패:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="file-upload">
      <h1 className="file-upload-title">파일 업로드</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="file-upload-input"
        disabled={isUploading}
      />
      <button onClick={handleFileUpload} className="file-upload-button" disabled={isUploading || !selectedFile}>
        {isUploading ? '업로드 중...' : '업로드'}
      </button>
      {uploadError && <p className="file-upload-error">{uploadError}</p>}
    </div>
  );
}

export default FileUpload;
