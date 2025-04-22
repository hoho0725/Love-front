// FileList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileList.css';

function FileList() {
  const [fileList, setFileList] = useState([]);
  const [uploadError, setUploadError] = useState('');

  const fetchFileList = async () => {
    try {
      const response = await axios.get('https://api.ddoddohoho.com/upload/files');
      setFileList(response.data.files || []);
    } catch (error) {
      console.error('파일 목록 가져오기 오류:', error);
      setUploadError('파일 목록을 가져오는 데 실패했습니다.');
    }
  };

  // ✅ Presigned GET URL로 파일 다운로드
  const handleDownload = async (fileName) => {
    try {
      const { data } = await axios.get(`https://api.ddoddohoho.com/s3/download-url/${encodeURIComponent(fileName)}`);
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('다운로드 링크 요청 실패:', error);
      setUploadError('다운로드에 실패했습니다.');
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`https://api.ddoddohoho.com/upload/${encodeURIComponent(fileName)}`);
      fetchFileList();
    } catch (error) {
      console.error('파일 삭제 오류:', error);
      setUploadError('파일 삭제 실패');
    }
  };

  useEffect(() => {
    fetchFileList();
  }, []);

  return (
    <div className="file-list">
      <h2 className="file-list-title">업로드된 파일 목록</h2>
      {uploadError && <p className="file-list-error">{uploadError}</p>}
      <ul className="file-list-ul">
        {fileList.length > 0 ? (
          fileList.map((file) => (
            <li key={file.storedName} className="file-list-item">
              <span className="file-name">{decodeURIComponent(file.originalName)}</span>
              <div className="file-button-container">
                <button onClick={() => handleDownload(file.storedName)} className="file-button download-btn">다운로드</button>
                <button onClick={() => handleDelete(file.storedName)} className="file-button delete-btn">삭제</button>
              </div>
            </li>
          ))
        ) : (
          <p>업로드된 파일이 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default FileList;
