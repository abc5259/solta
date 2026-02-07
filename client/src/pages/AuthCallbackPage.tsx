import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallbackPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { login } = useAuth();

	useEffect(() => {
		const handle = async () => {
			const token = searchParams.get('token');
			if (token) {
				await login(token);
			}
			navigate('/', { replace: true });
		};
		handle();
	}, [searchParams, login, navigate]);

	return null;
}
