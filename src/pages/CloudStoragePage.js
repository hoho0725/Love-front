import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CloudStoragePage() {
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // 파일 목록을 가져오는 함수
  const fetchFileList = async () => {
    try {
      const response = await axios.get('https://api.ddoddohoho.com/upload/files');
      setFileList(response.data.files);  // 파일 목록을 그대로 표시
    } catch (error) {
      console.error('파일 목록 가져오기 오류:', error);
    }
  };

  // 파일 선택 처리
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(''); // 오류 메시지 초기화
    }
  };

  // 파일 업로드 처리
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadError('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);  // 파일 객체를 그대로 FormData에 추가

    setIsUploading(true);
    setUploadError('');
    try {
      await axios.post('https://api.ddoddohoho.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchFileList(); // 업로드 후 파일 목록 다시 가져오기
    } catch (error) {
      setUploadError('파일 업로드 실패');
      console.error('업로드 실패:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // 파일 다운로드 처리
  const handleDownload = (fileName) => {
    const url = `https://api.ddoddohoho.com/upload/download/${fileName}`;
    window.location.href = url;
  };

  // 파일 삭제 처리
  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`https://api.ddoddohoho.com/upload/${fileName}`);
      fetchFileList(); // 삭제 후 파일 목록 다시 가져오기
    } catch (error) {
      console.error('파일 삭제 오류:', error);
    }
  };

  useEffect(() => {
    fetchFileList(); // 컴포넌트가 마운트되면 파일 목록 가져오기
  }, []);

  return (
    <div>
      <h1>파일 업로드</h1>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <button onClick={handleFileUpload} disabled={isUploading || !selectedFile}>
        {isUploading ? '업로드 중...' : '업로드'}
      </button>
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}

      <h2>업로드된 파일 목록</h2>
      <ul>
        {fileList.length > 0 ? (
          fileList.map((file) => (
            <li key={file.storedName}>
              <span>{file.originalName}</span>
              <button onClick={() => handleDownload(file.storedName)}>다운로드</button>
              <button onClick={() => handleDelete(file.storedName)}>삭제</button>
            </li>
          ))
        ) : (
          <p>업로드된 파일이 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default CloudStoragePage;
