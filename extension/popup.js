// DOM 요소
let loginView, loggedInView, settingsSection;
let githubLoginBtn, logoutBtn;
let userAvatar, userName, userLogin;
let statusDiv;

// 서버 URL (고정)
const SERVER_URL = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 초기화
    loginView = document.getElementById('loginView');
    loggedInView = document.getElementById('loggedInView');
    settingsSection = document.getElementById('settingsSection');
    githubLoginBtn = document.getElementById('githubLoginBtn');
    logoutBtn = document.getElementById('logoutBtn');
    userAvatar = document.getElementById('userAvatar');
    userName = document.getElementById('userName');
    userLogin = document.getElementById('userLogin');
    statusDiv = document.getElementById('status');

    // 로그인 상태 확인
    checkLoginStatus();

    // 이벤트 리스너
    githubLoginBtn.addEventListener('click', handleGithubLogin);
    logoutBtn.addEventListener('click', handleLogout);
});

// 로그인 상태 확인
async function checkLoginStatus() {
    try {
        const data = await chrome.storage.local.get(['access_token', 'user_info']);

        if (data.access_token && data.user_info) {
            // 로그인 상태
            showLoggedInView(data.user_info);
        } else {
            // 로그아웃 상태
            showLoginView();
        }
    } catch (error) {
        console.error('로그인 상태 확인 실패:', error);
        showLoginView();
    }
}

// 로그인 뷰 표시
function showLoginView() {
    loginView.style.display = 'block';
    loggedInView.style.display = 'none';
    settingsSection.classList.remove('show');
}

// 로그인 후 뷰 표시
function showLoggedInView(userInfo) {
    loginView.style.display = 'none';
    loggedInView.style.display = 'block';
    settingsSection.classList.add('show');

    // 사용자 정보 표시
    userAvatar.src = userInfo.avatarUrl || '';
    userName.textContent = userInfo.name || userInfo.username || '';
    userLogin.textContent = '@' + (userInfo.username || '');
}

// GitHub 로그인 처리
async function handleGithubLogin() {
    try {
        githubLoginBtn.disabled = true;
        githubLoginBtn.textContent = '로그인 중...';

        // 1. 서버에서 GitHub OAuth URL 가져오기
        const response = await fetch(`${SERVER_URL}/api/auth/oauth/github/login?client=EXTENSION`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error:', errorText);
            throw new Error(`OAuth URL을 가져오는데 실패했습니다: ${response.status}`);
        }

        const data = await response.json();

        const authUrl = data.url;

        // 2. Chrome Identity API로 OAuth 플로우 시작
        chrome.identity.launchWebAuthFlow(
            {
                url: authUrl,
                interactive: true
            },
            async function(redirectUrl) {
                if (chrome.runtime.lastError) {
                    console.error('OAuth 에러:', chrome.runtime.lastError);
                    showStatus('로그인에 실패했습니다.', 'error');
                    resetLoginButton();
                    return;
                }

                if (!redirectUrl) {
                    showStatus('로그인이 취소되었습니다.', 'error');
                    resetLoginButton();
                    return;
                }

                // 3. 리다이렉트 URL에서 토큰 추출 (우리 서버의 토큰)
                try {
                    const url = new URL(redirectUrl);
                    const token = url.searchParams.get('token');

                    if (!token) {
                        throw new Error('토큰을 찾을 수 없습니다.');
                    }

                    // 4. 우리 서버의 액세스 토큰 저장
                    await chrome.storage.local.set({ access_token: token });

                    // 5. 우리 서버 API로 사용자 정보 가져오기
                    // const userInfo = await fetchUserInfo(token);
                    const userInfo = {
                      "name": "John Doe",
                      "username": "john_doe",
                      "avatarUrl": "https://github.com/john_doe.png"
                    }

                    // 6. 사용자 정보 저장
                    await chrome.storage.local.set({ user_info: userInfo });

                    // 7. UI 업데이트
                    showLoggedInView(userInfo);
                    showStatus('로그인에 성공했습니다!', 'success');
                    setTimeout(hideStatus, 2000);
                } catch (error) {
                    console.error('토큰 처리 실패:', error);
                    showStatus('로그인 처리에 실패했습니다.', 'error');
                } finally {
                    resetLoginButton();
                }
            }
        );
    } catch (error) {
        console.error('GitHub 로그인 실패:', error);
        let errorMessage = '서버 연결에 실패했습니다.';

        if (error.message.includes('Failed to fetch')) {
            errorMessage = '서버가 실행되지 않았거나 연결할 수 없습니다.';
        } else if (error.message) {
            errorMessage = error.message;
        }

        showStatus(errorMessage, 'error');
        resetLoginButton();
    }
}

// 로그인 버튼 리셋
function resetLoginButton() {
    githubLoginBtn.disabled = false;
    githubLoginBtn.innerHTML = `
        <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        GitHub로 로그인
    `;
}

// 우리 서버 API로 사용자 정보 가져오기
async function fetchUserInfo(token) {
    const response = await fetch(`${SERVER_URL}/api/user/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('사용자 정보를 가져오는데 실패했습니다.');
    }

    return await response.json();
}

// 로그아웃 처리
async function handleLogout() {
    try {
        // 저장된 토큰과 사용자 정보 삭제
        await chrome.storage.local.remove(['access_token', 'user_info']);

        // UI 업데이트
        showLoginView();
        showStatus('로그아웃되었습니다.', 'success');
        setTimeout(hideStatus, 2000);
    } catch (error) {
        console.error('로그아웃 실패:', error);
        showStatus('로그아웃에 실패했습니다.', 'error');
    }
}

// 상태 메시지 표시
function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
}

// 상태 메시지 숨기기
function hideStatus() {
    statusDiv.style.display = 'none';
}
