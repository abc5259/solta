(function () {
	function getProblemId() {
		const match = location.pathname.match(/\/problem\/(\d+)/);
		return match ? match[1] : null;
	}

	function getProblemTitle() {
		const el = document.querySelector('#problem_title');
		if (el) return el.textContent?.trim() || '';
		return '';
	}

	function injectStyles() {
		if (document.getElementById('bjst-style')) return;
		const style = document.createElement('style');
		style.id = 'bjst-style';
		style.textContent = `
			.bjst-container { display: inline-flex; align-items: center; gap: 8px; margin-left: 8px; }
			.bjst-btn { appearance: none; border: 1px solid #d0d7de; border-radius: 6px; padding: 6px 10px; font-weight: 600; cursor: pointer; background: #ffffff; color: #24292f; font-size: 13px; }
			.bjst-btn:hover { background: #f6f8fa; }
			.bjst-btn:active { background: #eef1f4; }
			.bjst-btn.running { border-color: #e5534b; color: #e5534b; }
			.bjst-time { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-weight: 600; 
				background: #f6f8fa; border: 1px solid #d0d7de; padding: 4px 8px; border-radius: 6px; color: #57606a; font-size: 12px; }
			.bjst-time.running { color: #24292f; border-color: #c9d1d9; }
		`;
		document.head.appendChild(style);
	}

	function formatElapsed(ms) {
		const totalSeconds = Math.floor(ms / 1000);
		const h = Math.floor(totalSeconds / 3600);
		const m = Math.floor((totalSeconds % 3600) / 60);
		const s = totalSeconds % 60;
		const pad = (n) => String(n).padStart(2, '0');
		if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
		return `${m}:${pad(s)}`;
	}

	function ensureContainer() {
		let wrap = document.getElementById('bjst-wrap');
		if (!wrap) {
			wrap = document.createElement('span');
			wrap.id = 'bjst-wrap';
			wrap.className = 'bjst-container';
			const header = document.querySelector('.page-header h1');
			if (header) header.appendChild(wrap);
		}
		return wrap;
	}

	function ensureDisplay() {
		const wrap = ensureContainer();
		let display = document.getElementById('bj-solve-timer-display');
		if (!display) {
			display = document.createElement('span');
			display.id = 'bj-solve-timer-display';
			display.className = 'bjst-time';
			display.textContent = '';
			display.style.display = 'none';
			wrap.appendChild(display);
		}
		return display;
	}

	let tickIntervalId = null;
	function startTicking(startedAtMs) {
		stopTicking();
		const display = ensureDisplay();
		display.classList.add('running');
		display.style.display = '';
		const update = () => {
			const elapsed = Date.now() - startedAtMs;
			display.textContent = formatElapsed(elapsed);
		};
		update();
		tickIntervalId = setInterval(update, 1000);
	}

	function stopTicking() {
		if (tickIntervalId) {
			clearInterval(tickIntervalId);
			tickIntervalId = null;
		}
		const display = document.getElementById('bj-solve-timer-display');
		if (display) display.classList.remove('running');
	}

	function clearDisplay() {
		const display = ensureDisplay();
		display.textContent = '';
		display.classList.remove('running');
		display.style.display = 'none';
	}

	function createButton() {
		const btn = document.createElement('button');
		btn.id = 'bj-solve-timer-btn';
		btn.className = 'bjst-btn';
		btn.type = 'button';
		btn.setAttribute('aria-label', 'Baekjoon solve timer');
		btn.textContent = '시간 측정 시작';
		return btn;
	}

	function setButtonRunning(btn, running) {
		if (running) {
			btn.classList.add('running');
			btn.textContent = '시간 측정 중지';
		} else {
			btn.classList.remove('running');
			btn.textContent = '시간 측정 시작';
		}
	}

	function insertButton() {
		injectStyles();
		const header = document.querySelector('.page-header h1');
		if (!header || document.getElementById('bj-solve-timer-btn')) return;
		const btn = createButton();
		const wrap = ensureContainer();
		wrap.insertBefore(btn, wrap.firstChild);
		ensureDisplay();

		const problemId = getProblemId();
		const title = getProblemTitle();

		chrome.runtime.sendMessage({ type: 'GET_TIMER_STATE', payload: { problemId } }, (state) => {
			if (state?.running) {
				setButtonRunning(btn, true);
				if (state.startedAtMs) startTicking(state.startedAtMs);
			} else {
				setButtonRunning(btn, false);
				clearDisplay();
			}
		});

		btn.addEventListener('click', () => {
			const isStopping = btn.classList.contains('running');
			const problemId = getProblemId();
			const title = getProblemTitle();
			if (!problemId) return;
			if (isStopping) {
				chrome.runtime.sendMessage({ type: 'STOP_TIMER_IF_RUNNING', payload: { problemId } });
				setButtonRunning(btn, false);
				stopTicking();
				clearDisplay();
			} else {
				chrome.runtime.sendMessage({ type: 'START_TIMER', payload: { problemId, title } });
				setButtonRunning(btn, true);
				startTicking(Date.now());
			}
		});
	}

	chrome.storage.onChanged.addListener((changes, area) => {
		if (area !== 'local' || !changes.bj_solve_timers) return;
		const problemId = getProblemId();
		const timers = changes.bj_solve_timers.newValue || {};
		const t = timers[problemId];
		const btn = document.getElementById('bj-solve-timer-btn');
		if (!btn) return;
		if (t && t.running) {
			setButtonRunning(btn, true);
			if (t.startedAtMs) startTicking(t.startedAtMs);
		} else {
			setButtonRunning(btn, false);
			stopTicking();
			clearDisplay();
		}
	});

	const observer = new MutationObserver(() => insertButton());
	observer.observe(document.documentElement, { childList: true, subtree: true });
	insertButton();
})(); 