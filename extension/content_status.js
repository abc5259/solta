(function () {
	function getProblemIdFromQuery() {
		const url = new URL(location.href);
		return url.searchParams.get('problem_id');
	}

	function getUserIdFromQuery() {
		const url = new URL(location.href);
		return url.searchParams.get('user_id');
	}

	function isRowAccepted(tr) {
		const resultSpan = tr.querySelector('.result-text');
		return resultSpan && resultSpan.classList.contains('result-ac');
	}

	function extractRowProblemId(tr) {
		const a = tr.querySelector('a.problem_title');
		if (!a) return null;
		const text = a.textContent?.trim();
		if (/^\d+$/.test(text)) return text;
		const href = a.getAttribute('href') || '';
		const match = href.match(/\/problem\/(\d+)/);
		return match ? match[1] : null;
	}

	function extractRowUserId(tr) {
		const a = tr.querySelector('td:nth-child(2) a[href^="/user/"]');
		if (!a) return null;
		const href = a.getAttribute('href') || '';
		const m = href.match(/\/user\/(.+)$/);
		return m ? m[1] : null;
	}

	function extractRowTimestampSec(tr) {
		const a = tr.querySelector('a.real-time-update[data-timestamp]');
		if (!a) return null;
		const ts = a.getAttribute('data-timestamp');
		if (!ts) return null;
		const n = Number(ts);
		return Number.isFinite(n) ? n : null;
	}

	function injectModalStyles() {
		if (document.getElementById('bjst-modal-style')) return;
		const style = document.createElement('style');
		style.id = 'bjst-modal-style';
		style.textContent = `
			.bjst-modal-overlay {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5);
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 10000;
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			}
			.bjst-modal {
				background: white;
				border-radius: 12px;
				padding: 24px;
				max-width: 500px;
				width: 90%;
				box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
				animation: bjst-modal-slide-in 0.3s ease-out;
			}
			@keyframes bjst-modal-slide-in {
				from { transform: translateY(-20px); opacity: 0; }
				to { transform: translateY(0); opacity: 1; }
			}
			.bjst-modal-header {
				display: flex;
				align-items: center;
				margin-bottom: 16px;
			}
			.bjst-modal-title {
				font-size: 20px;
				font-weight: 600;
				color: #24292f;
				margin: 0;
				flex: 1;
			}
			.bjst-modal-close {
				background: none;
				border: none;
				font-size: 24px;
				cursor: pointer;
				color: #57606a;
				padding: 4px;
				border-radius: 6px;
				line-height: 1;
			}
			.bjst-modal-close:hover {
				background: #f6f8fa;
				color: #24292f;
			}
			.bjst-modal-content {
				margin-bottom: 20px;
			}
			.bjst-solve-info {
				background: #f6f8fa;
				border: 1px solid #d0d7de;
				border-radius: 8px;
				padding: 16px;
				margin-bottom: 16px;
			}
			.bjst-solve-time {
				font-size: 18px;
				font-weight: 600;
				color: #0969da;
				margin-bottom: 8px;
			}
			.bjst-problem-title {
				font-size: 16px;
				color: #24292f;
				margin-bottom: 4px;
			}
			.bjst-problem-meta {
				font-size: 14px;
				color: #57606a;
			}
			.bjst-modal-actions {
				display: flex;
				gap: 12px;
				justify-content: flex-end;
			}
			.bjst-btn {
				padding: 8px 16px;
				border-radius: 6px;
				font-weight: 500;
				font-size: 14px;
				cursor: pointer;
				border: 1px solid #d0d7de;
				transition: all 0.2s;
			}
			.bjst-btn-primary {
				background: #0969da;
				color: white;
				border-color: #0969da;
			}
			.bjst-btn-primary:hover {
				background: #0858b9;
				border-color: #0858b9;
			}
			.bjst-btn-secondary {
				background: white;
				color: #24292f;
			}
			.bjst-btn-secondary:hover {
				background: #f6f8fa;
			}
			.bjst-loading {
				opacity: 0.6;
				pointer-events: none;
			}
			.bjst-loading .bjst-btn-primary::after {
				content: ' 제출 중...';
			}
		`;
		document.head.appendChild(style);
	}

	function createSolvedModal(problemId, title, elapsedMs, meta) {
		injectModalStyles();
		
		const overlay = document.createElement('div');
		overlay.className = 'bjst-modal-overlay';
		
		const modal = document.createElement('div');
		modal.className = 'bjst-modal';
		
		const timeStr = formatElapsed(elapsedMs);
		const tierShort = meta?.levelShort ? meta.levelShort : '';
		const tagList = Array.isArray(meta?.tags) ? meta.tags.filter(Boolean) : [];
		const leftParts = [tierShort, ...tagList].filter(Boolean);
		const bracket = leftParts.length > 0 ? `[${leftParts.join(', ')}] ` : '';
		
		modal.innerHTML = `
			<div class="bjst-modal-header">
				<h2 class="bjst-modal-title">🎉 문제 풀이 완료!</h2>
				<button class="bjst-modal-close" aria-label="닫기">&times;</button>
			</div>
			<div class="bjst-modal-content">
				<div class="bjst-solve-info">
					<div class="bjst-solve-time">⏱️ ${timeStr}</div>
					<div class="bjst-problem-title">${bracket}${title || '문제'}</div>
					<div class="bjst-problem-meta">백준 문제 #${problemId}</div>
				</div>
				<p>이 문제 풀이 기록을 Solta에 저장하시겠습니까?</p>
			</div>
			<div class="bjst-modal-actions">
				<button class="bjst-btn bjst-btn-secondary" id="bjst-cancel-btn">취소</button>
				<button class="bjst-btn bjst-btn-primary" id="bjst-submit-btn">저장하기</button>
			</div>
		`;
		
		overlay.appendChild(modal);
		document.body.appendChild(overlay);
		
		// Event listeners
		const closeModal = () => {
			document.body.removeChild(overlay);
		};
		
		overlay.querySelector('.bjst-modal-close').addEventListener('click', closeModal);
		overlay.querySelector('#bjst-cancel-btn').addEventListener('click', closeModal);
		overlay.addEventListener('click', (e) => {
			if (e.target === overlay) closeModal();
		});
		
		// Submit button
		const submitBtn = overlay.querySelector('#bjst-submit-btn');
		submitBtn.addEventListener('click', async () => {
			modal.classList.add('bjst-loading');
			
			try {
				// Get user ID from current page or storage
				const userId = getUserIdFromQuery() || await getStoredUserId();
				if (!userId) {
					alert('사용자 ID를 찾을 수 없습니다. 백준 로그인 후 다시 시도해주세요.');
					modal.classList.remove('bjst-loading');
					return;
				}
				
				// Submit to server
				const success = await submitToServer(problemId, userId, Math.floor(elapsedMs / 1000));
				if (success) {
					alert('성공적으로 저장되었습니다!');
					closeModal();
				} else {
					alert('저장에 실패했습니다. 다시 시도해주세요.');
				}
			} catch (error) {
				console.error('Submit error:', error);
				alert('오류가 발생했습니다: ' + error.message);
			} finally {
				modal.classList.remove('bjst-loading');
			}
		});
		
		return overlay;
	}

	function formatElapsed(ms) {
		const totalSeconds = Math.floor(ms / 1000);
		const h = Math.floor(totalSeconds / 3600);
		const m = Math.floor((totalSeconds % 3600) / 60);
		const s = totalSeconds % 60;
		const pad = (n) => String(n).padStart(2, '0');
		if (h > 0) return `${h}시간 ${m}분 ${s}초`;
		if (m > 0) return `${m}분 ${s}초`;
		return `${s}초`;
	}

	async function getStoredUserId() {
		return new Promise((resolve) => {
			chrome.storage.local.get(['bj_user_id'], (data) => {
				resolve(data?.bj_user_id || null);
			});
		});
	}

	async function submitToServer(problemId, userId, solveTimeSeconds) {
		// CORS 우회를 위해 background script를 통해 서버에 제출
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage({
				type: 'SUBMIT_TO_SERVER',
				payload: {
					problemId,
					userId,
					solveTimeSeconds
				}
			}, (response) => {
				if (chrome.runtime.lastError) {
					reject(new Error(chrome.runtime.lastError.message));
				} else if (response && response.success) {
					resolve(true);
				} else {
					reject(new Error(response?.error || '알 수 없는 오류가 발생했습니다.'));
				}
			});
		});
	}

	async function fetchProblemMeta(problemId) {
		// Using solved.ac unofficial API
		const url = `https://solved.ac/api/v3/problem/show?problemId=${encodeURIComponent(problemId)}`;
		const res = await fetch(url, { credentials: 'omit' });
		if (!res.ok) throw new Error('failed to fetch solved.ac');
		const json = await res.json();
		
		// Map to simplified meta
		const levelShort = mapTierToShort(json.level);
		const titleKo = json.titleKo || json.title || '';
		const tags = Array.isArray(json.tags)
			? json.tags
				.map((t) => {
					const ko = Array.isArray(t.displayNames) ? t.displayNames.find((d) => d.language === 'ko') : null;
					return ko ? (ko.name || ko.short || null) : null;
				})
				.filter((name) => !!name)
			: [];
		
		return { level: json.level, levelShort, titleKo, tags };
	}

	function mapTierToShort(level) {
		const tiers = [
			['B', 5], ['B', 4], ['B', 3], ['B', 2], ['B', 1],
			['S', 5], ['S', 4], ['S', 3], ['S', 2], ['S', 1],
			['G', 5], ['G', 4], ['G', 3], ['G', 2], ['G', 1],
			['P', 5], ['P', 4], ['P', 3], ['P', 2], ['P', 1],
			['D', 5], ['D', 4], ['D', 3], ['D', 2], ['D', 1],
			['R', 5], ['R', 4], ['R', 3], ['R', 2], ['R', 1]
		];
		if (typeof level !== 'number' || level < 1 || level > 30) return '';
		const [tier, num] = tiers[level - 1];
		return `${tier}${num}`;
	}

	let lastHandledSolutionId = null;

	function watchStatusTable() {
		const tbody = document.querySelector('table#status-table tbody, .result tbody, #status-table tbody, tbody');
		if (!tbody) return;

		const handle = () => {
			const rows = Array.from(tbody.querySelectorAll('tr[id^="solution-"]'));
			if (rows.length === 0) return;

			const myUser = getUserIdFromQuery();
			const problemInQuery = getProblemIdFromQuery();

			for (const tr of rows) {
				const solutionId = tr.id.replace('solution-', '');
				if (lastHandledSolutionId && solutionId <= lastHandledSolutionId) {
					continue;
				}
				if (!isRowAccepted(tr)) continue;

				const rowUser = extractRowUserId(tr);
				if (myUser && rowUser && myUser !== rowUser) continue;

				const rowPid = extractRowProblemId(tr);
				if (problemInQuery && rowPid && problemInQuery !== rowPid) continue;

				const pid = problemInQuery || rowPid;
				if (!pid) continue;

				// Check startedAtMs to ignore pre-existing ACs
				chrome.runtime.sendMessage({ type: 'GET_TIMER_STATE', payload: { problemId: pid } }, (state) => {
					if (!state || !state.running || !state.startedAtMs) return;
					const startedAtSec = Math.floor(state.startedAtMs / 1000);
					const rowTs = extractRowTimestampSec(tr);
					if (rowTs && rowTs >= startedAtSec) {
						lastHandledSolutionId = solutionId;
						chrome.runtime.sendMessage({ type: 'STOP_TIMER_IF_RUNNING', payload: { problemId: pid } });
					}
				});

				break;
			}
		};

		handle();
		const observer = new MutationObserver(handle);
		observer.observe(tbody, { childList: true, subtree: true });
	}

	document.addEventListener('DOMContentLoaded', watchStatusTable);
	watchStatusTable();
	
	// Listen for messages from background script
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (message.type === 'SHOW_SOLVED_MODAL') {
			const { problemId, title, elapsedMs } = message.payload;
			
			// Fetch problem metadata and show modal
			fetchProblemMeta(problemId).then((meta) => {
				createSolvedModal(problemId, title, elapsedMs, meta);
			}).catch(() => {
				createSolvedModal(problemId, title, elapsedMs, {});
			});
		}
	});
})(); 