import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
	timeout: 10000,
});

api.interceptors.request.use((config) => {
	// Example: attach auth header later if needed
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error);
	}
);

export default api;

