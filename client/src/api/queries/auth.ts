import { queryOptions } from '@tanstack/react-query';
import { authApi } from '../api';

export const authQueryKeys = {
	all: ['auth'] as const,
	me: () => [...authQueryKeys.all, 'me'] as const,
};

export const authQueryOptions = {
	me: () =>
		queryOptions({
			queryKey: authQueryKeys.me(),
			queryFn: () => authApi.getMe(),
			enabled: !!localStorage.getItem('auth_token'),
			retry: false,
		}),
};
