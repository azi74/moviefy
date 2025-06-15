import apiClient from './apiClient';

export const chatWithBot = async (message) => {
  return apiClient.post('/chat', { message });
};