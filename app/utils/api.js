// utils/api.js
import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: 'https://68d96d1b90a75154f0da61ae.mockapi.io', // MockAPI
  timeout: 10000, // 10 segundos (API online pode ser mais lenta)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;