// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.ddoddohoho.com',
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

export const uploadFile = (formData) => 
  API.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });