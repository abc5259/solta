import { createContext, useContext, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authQueryOptions, authQueryKeys } from '../api/queries/auth';
import type { AuthMeResponse } from '../types/api';

interface AuthContextType {
	user: AuthMeResponse | null;
	isLoggedIn: boolean;
	isLoading: boolean;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();

	const { data: user, isLoading } = useQuery(authQueryOptions.me());

	const login = useCallback(
		async (token: string) => {
			localStorage.setItem('auth_token', token);
			await queryClient.fetchQuery(authQueryOptions.me());
		},
		[queryClient]
	);

	const logout = useCallback(() => {
		localStorage.removeItem('auth_token');
		queryClient.setQueryData(authQueryKeys.me(), null);
	}, [queryClient]);

	return (
		<AuthContext.Provider
			value={{
				user: user ?? null,
				isLoggedIn: !!user,
				isLoading,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
