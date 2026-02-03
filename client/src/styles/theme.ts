export const theme = {
	colors: {
		// Primary colors - Modern blue accent
		primary: '#5B9FED', // Bright blue accent
		primaryHover: '#4A8DD9',
		primaryLight: 'rgba(91, 159, 237, 0.15)',

		// Text colors - Light text on dark bg
		text: '#E4E6EB', // Very light gray
		textSecondary: '#B0B3B8', // Medium gray
		textMuted: '#8A8D91', // Muted gray

		// Background colors - Dark theme
		bg: '#1F1F1F', // Main background
		bgSecondary: '#262626', // Card background
		bgTertiary: '#2D2D2D', // Hover states

		// Border colors - Subtle borders
		border: '#333333',
		borderLight: '#3D3D3D',

		// Status colors
		success: '#4CAF50', // Green for success
		warning: '#FFA726', // Orange for warning
		error: '#EF5350', // Red for error
		info: '#5B9FED', // Blue for info

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
		sm: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
		md: '0 4px 12px 0 rgba(0, 0, 0, 0.4)',
		lg: '0 8px 24px 0 rgba(0, 0, 0, 0.5)',
		glow: '0 0 20px rgba(91, 159, 237, 0.3)' // Subtle blue glow
	},
	borderRadius: {
		sm: '8px',
		md: '12px',
		lg: '16px',
		xl: '20px'
	}
} as const;

export type AppTheme = typeof theme;

