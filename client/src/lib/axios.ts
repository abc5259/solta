import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:8080/api',
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

