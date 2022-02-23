import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apigobarber.mvsystems.com.br',
});

export default api;
