document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('settingsForm');
    const serverUrlInput = document.getElementById('serverUrl');
    const bojUserIdInput = document.getElementById('bojUserId');
    const statusDiv = document.getElementById('status');

    // 저장된 설정 불러오기
    chrome.storage.local.get(['server_url', 'bj_user_id'], function(data) {
        if (data.server_url) {
            serverUrlInput.value = data.server_url;
        }
        if (data.bj_user_id) {
            bojUserIdInput.value = data.bj_user_id;
        }
    });

    // 폼 제출 처리
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const serverUrl = serverUrlInput.value.trim();
        const bojUserId = bojUserIdInput.value.trim();
        
        if (!serverUrl || !bojUserId) {
            showStatus('모든 필드를 입력해주세요.', 'error');
            return;
        }

        // URL 유효성 검사
        try {
            new URL(serverUrl);
        } catch (e) {
            showStatus('올바른 URL을 입력해주세요.', 'error');
            return;
        }

        // 설정 저장
        chrome.storage.local.set({
            server_url: serverUrl,
            bj_user_id: bojUserId
        }, function() {
            showStatus('설정이 저장되었습니다!', 'success');
            
            // 2초 후 상태 메시지 숨기기
            setTimeout(() => {
                hideStatus();
            }, 2000);
        });
    });

    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;
        statusDiv.style.display = 'block';
    }

    function hideStatus() {
        statusDiv.style.display = 'none';
    }
});
