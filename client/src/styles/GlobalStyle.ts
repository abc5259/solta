import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	/* CSS Reset (subset) */
	*, *::before, *::after { box-sizing: border-box; }
	html, body, #root { height: 100%; }
	body { margin: 0; font-family: ${({ theme }) => theme.fonts.base}; color: ${({ theme }) => theme.colors.text}; background: ${({ theme }) => theme.colors.bg}; }
	img, svg, video, canvas, audio, iframe, embed, object { display: block; max-width: 100%; }
	button, input, textarea, select { font: inherit; }
	a { color: inherit; text-decoration: none; }
`;

export default GlobalStyle;

