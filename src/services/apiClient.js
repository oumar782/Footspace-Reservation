import axios from 'axios';

export const PRIMARY_API = 'http://localhost:5000';
export const LOCAL_API = 'http://localhost:5000';

/* ── Instance principale API (Local Node.js Server) ── */
const apiClient = axios.create({
  baseURL: PRIMARY_API,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ── Instance locale ── */
const localApiClient = axios.create({
  baseURL: LOCAL_API,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ── Intercepteur : ajoute le token JWT si présent ─ */
const attachToken = (config) => {
  const token = localStorage.getItem('playforest_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

apiClient.interceptors.request.use(attachToken);
localApiClient.interceptors.request.use(attachToken);

/* ── Intercepteur : gestion erreurs / refresh ───── */
const handleResponseError = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('playforest_token');
    localStorage.removeItem('playforest_user');
  }
  return Promise.reject(error);
};

apiClient.interceptors.response.use((res) => res, handleResponseError);
localApiClient.interceptors.response.use((res) => res, handleResponseError);

/* ── Helper : extraction standardisée des données ─ */
export const extractData = (response) => {
  if (response?.data?.success) return response.data;
  if (response?.data?.data) return response.data.data;
  return response?.data;
};

export { apiClient, localApiClient };
export default apiClient;