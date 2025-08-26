// Timer state: { [problemId]: { startedAtMs: number, running: boolean, title?: string, tier?: string, tags?: string[] } }
const timers = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (!message || !message.type) return;

	switch (message.type) {
		case 'START_TIMER': {
			const { problemId, title } = message.payload;
			if (!problemId) return;
			timers[problemId] = {
				startedAtMs: Date.now(),
				running: true,
				title
			};
			persistTimers();
			break;
		}
		case 'STOP_TIMER_IF_RUNNING': {
			const { problemId } = message.payload;
			if (!problemId) return;
			const timer = timers[problemId];
			if (timer && timer.running) {
				const elapsedMs = Date.now() - timer.startedAtMs;
				// Fetch metadata, then notify
				fetchProblemMeta(problemId).then((meta) => {
					const text = buildRecordText(meta, timer.title, elapsedMs);
					showSolvedNotification(text);
					// Mark timer stopped
					timer.running = false;
					persistTimers();
				}).catch(() => {
					const text = buildRecordText({}, timer.title, elapsedMs);
					showSolvedNotification(text);
					timer.running = false;
					persistTimers();
				});
			}
			break;
		}
		case 'GET_TIMER_STATE': {
			const { problemId } = message.payload || {};
			if (problemId && timers[problemId]) {
				sendResponse({ running: timers[problemId].running, startedAtMs: timers[problemId].startedAtMs });
			} else {
				sendResponse({ running: false });
			}
			break;
		}
		default:
			break;
	}
});

function persistTimers() {
	chrome.storage.local.set({ bj_solve_timers: timers });
}

function msToKoreanHMS(ms) {
	const totalSeconds = Math.floor(ms / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	if (hours > 0) return `${hours}시간 ${minutes}분`;
	if (minutes > 0) return `${minutes}분 ${seconds}초`;
	return `${seconds}초`;
}

function buildRecordText(meta, title, elapsedMs) {
	const timeStr = msToKoreanHMS(elapsedMs);
	const tierShort = meta?.levelShort ? meta.levelShort : '';
	const tagList = Array.isArray(meta?.tags) ? meta.tags.filter(Boolean) : [];
	const leftParts = [tierShort, ...tagList].filter(Boolean);
	const bracket = leftParts.length > 0 ? `[${leftParts.join(', ')}] ` : '';
	const displayTitle = title ? title : (meta?.titleKo || '문제');
	return `${bracket}${displayTitle} - ${timeStr}`.replace(/\s+/g, ' ').trim();
}

async function fetchProblemMeta(problemId) {
	// Using solved.ac unofficial API
	// Doc: https://solvedac.github.io/unofficial-documentation/#/operations/getProblemById
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
	const mainTag = tags[0] || '';
	return { level: json.level, levelShort, titleKo, tags, mainTag };
}

function mapTierToShort(level) {
	// solved.ac level 1..30 mapping to tiers (B5..R1). We'll compress to e.g., G1, S3, etc.
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

function showSolvedNotification(message) {
	chrome.notifications.create({
		type: 'basic',
		iconUrl: 'images/icon-128.png',
		title: '문제 풀이 완료',
		message
	});
}

// Restore state on startup
chrome.runtime.onStartup.addListener(() => {
	chrome.storage.local.get(['bj_solve_timers'], (data) => {
		const saved = data?.bj_solve_timers || {};
		console.log('saved', saved);
		Object.assign(timers, saved);
	});
});

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.get(['bj_solve_timers'], (data) => {
		const saved = data?.bj_solve_timers || {};
    console.log('saved', saved);
		Object.assign(timers, saved);
	});
}); 