// 공통 유틸리티 함수

// 서버 URL
const SERVER_URL = 'http://localhost:8080';

// 공통 fetch 함수 (인증 헤더 자동 추가, 상대 경로 자동 처리)
export async function fetchWithAuth(urlOrPath, options = {}) {
	const { accessToken } = await chrome.storage.local.get(['accessToken']);

	// 상대 경로면 SERVER_URL을 앞에 붙임
	const fullUrl = urlOrPath.startsWith('/') ? `${SERVER_URL}${urlOrPath}` : urlOrPath;

	const headers = {
		'Content-Type': 'application/json',
		...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
		...options.headers
	};

	return fetch(fullUrl, {
		...options,
		headers
	});
}
