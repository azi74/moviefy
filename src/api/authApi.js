import apiClient from './apiClient';

export const register = async (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const login = async (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

export const logout = async () => {
  return apiClient.post('/auth/logout');
};

export const refreshToken = async () => {
  return apiClient.post('/auth/refresh');
};

export const getCurrentUser = async () => {
  return apiClient.get('/users/me');
};