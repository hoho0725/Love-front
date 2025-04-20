import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]); // 파일 목록을 저장할 상태

  useEffect(() => {
    // 페이지가 로드되면 업로드된 파일 목록을 가져옴
    axios
      .get('http://api.ddoddohoho.com/files') // 파일 목록 API 요청
      .then((response) => {
        setFiles(response.data.files); // 받은 파일 목록을 상태에 저장
      })
      .catch((error) => {
        console.error('파일 목록을 가져오는 데 실패했습니다', error);
      });
  }, []); // 빈 배열을 넣어서 컴포넌트가 처음 렌더링될 때만 실행되도록 함

  return (
    <div>
      <h3>업로드된 파일 목록</h3>
      <ul>
        {files.length > 0 ? (
          files.map((file, index) => (
            <li key={index}>
              <a href={`http://api.ddoddohoho.com/uploads/${file}`} download>
                {file} {/* 파일 이름을 클릭하면 다운로드 */}
              </a>
            </li>
          ))
        ) : (
          <p>업로드된 파일이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default FileList;
