// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.ddoddohoho.com',  // 백엔드 URL
});

// 🌸 추억 API
export const fetchMemories = (limit = 10, skip = 0) =>
  API.get(`/memories?limit=${limit}&skip=${skip}`);

export const fetchRandomMemory = () => API.get('/memories/random');

export const createMemory = (data) => API.post('/memories', data);

export const updateMemory = (id, data) => API.put(`/memories/${id}`, data);

export const deleteMemory = (id) => API.delete(`/memories/${id}`);

// 📓 일기 API
export const fetchDiaries = () => API.get('/diaries');

export const createDiary = (data) => API.post('/diaries', data);

export const updateDiary = (id, data) => API.put(`/diaries/${id}`, data);

export const deleteDiary = (id) => API.delete(`/diaries/${id}`);

// 🆕 Presigned URL 방식 파일 업로드 API
export const uploadFileToS3 = async (file) => {
  try {
    // 1. Presigned URL 요청
    const { data } = await API.get('/upload/presigned-url', {
      params: {
        filename: file.name,
        filetype: file.type,
      },
    });

    // 2. S3로 직접 업로드
    const uploadRes = await fetch(data.url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error('S3 업로드 실패');
    }

    return {
      key: data.key,
      url: `https://${process.env.REACT_APP_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${data.key}`,
    };
  } catch (err) {
    console.error('❌ Presigned S3 업로드 실패:', err);
    throw err;
  }
};
