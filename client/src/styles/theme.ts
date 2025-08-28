export const theme = {
	colors: {
		// Primary colors based on solved.ac
		primary: '#1a73e8', // Blue from solved.ac
		primaryHover: '#1557b0',
		primaryLight: '#e8f0fe',
		
		// Text colors
		text: '#202124', // Dark text
		textSecondary: '#5f6368', // Secondary text
		textMuted: '#9aa0a6', // Muted text
		
		// Background colors
		bg: '#ffffff',
		bgSecondary: '#f8f9fa',
		bgTertiary: '#f1f3f4',
		
		// Border colors
		border: '#dadce0',
		borderLight: '#e8eaed',
		
		// Status colors
		success: '#34a853', // Green for success
		warning: '#fbbc04', // Yellow for warning
		error: '#ea4335', // Red for error
		info: '#4285f4', // Blue for info
		
		// Tier colors (based on solved.ac tier system)
		tier: {
			bronze: '#cd7f32',
			silver: '#c0c0c0',
			gold: '#ffd700',
			platinum: '#e5e4e2',
			diamond: '#b9f2ff',
			ruby: '#ff006e'
		}
	},
	fonts: {
		base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif"
	},
	spacing: (n: number) => `${n * 4}px`,
	breakpoints: {
		sm: '480px',
		md: '768px',
		lg: '1024px',
		xl: '1280px'
	},
	shadows: {
		sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
	}
} as const;

export type AppTheme = typeof theme;

