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
})(); 