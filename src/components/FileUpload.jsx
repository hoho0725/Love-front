// FileUpload.js
import React, { useState } from 'react';
import { uploadFileToS3 } from '../api'; // Presigned URL 방식 API
import './FileUpload.css';

function FileUpload({ onFileUploaded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
	const [debugLog, setDebugLog] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadError('');
    }
  };

  const handleFileUpload = async () => {
  setDebugLog('🔁 handleFileUpload 실행됨');

  if (!selectedFile) {
    setUploadError('파일을 선택해주세요.');
    return;
  }

  setIsUploading(true);
  setUploadError('');
  try {
    setDebugLog('📤 uploadFileToS3 호출 직전');
    const { url, key } = await uploadFileToS3(selectedFile);

    setDebugLog(`✅ 업로드 성공! key=${key}`);
    if (onFileUploaded) {
      onFileUploaded({ key, url });
    }

    setSelectedFile(null);
  } catch (error) {
    setUploadError('파일 업로드 실패');
    setDebugLog('❌ 업로드 실패: ' + error.message);
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
		  {debugLog && <p className="file-upload-debug">{debugLog}</p>}
      <button onClick={handleFileUpload} className="file-upload-button" disabled={isUploading || !selectedFile}>
        {isUploading ? '업로드 중...' : '업로드'}
      </button>
      {uploadError && <p className="file-upload-error">{uploadError}</p>}
    </div>
  );
}

export default FileUpload;
