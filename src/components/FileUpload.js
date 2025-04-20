import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // 파일 선택 시 상태 업데이트
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 업로드 버튼 클릭 시 호출되는 함수
  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요');
      return;
    }

    const formData = new FormData();
    formData.append('image', file); // 백엔드에서 "image"로 받을 수 있도록 설정

    try {
      setUploading(true);
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage(`업로드 성공: ${result.file.filename}`);
      } else {
        setResponseMessage(`업로드 실패: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage('서버와 연결이 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>파일 업로드</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? '업로드 중...' : '업로드'}
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default FileUpload;
