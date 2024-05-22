import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:5000/api`,
});

export const uploadModel = (formData) => api.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const getModels = () => api.get('/models');
