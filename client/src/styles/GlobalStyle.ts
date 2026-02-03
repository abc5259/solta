import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	/* CSS Reset (subset) */
	*, *::before, *::after {
		box-sizing: border-box;
	}

	html, body, #root {
		height: 100%;
	}

	body {
		margin: 0;
		font-family: ${({ theme }) => theme.fonts.base};
		color: ${({ theme }) => theme.colors.text};
		background: ${({ theme }) => theme.colors.bg};
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	img, svg, video, canvas, audio, iframe, embed, object {
		display: block;
		max-width: 100%;
	}

	button, input, textarea, select {
		font: inherit;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	/* Scrollbar styling for dark theme */
	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	::-webkit-scrollbar-track {
		background: ${({ theme }) => theme.colors.bg};
	}

	::-webkit-scrollbar-thumb {
		background: ${({ theme }) => theme.colors.border};
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: ${({ theme }) => theme.colors.borderLight};
	}
`;

export default GlobalStyle;

