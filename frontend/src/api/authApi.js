import { httpClient } from './httpClient.js';

export const registerRequest = async (payload) => {
  const { data } = await httpClient.post('/auth/register', payload);
  return data;
};

export const loginRequest = async (payload) => {
  const { data } = await httpClient.post('/auth/login', payload);
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await httpClient.get('/auth/me');
  return data.user;
};

