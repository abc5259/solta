import 'styled-components';
import type { AppTheme } from './theme';

declare module 'styled-components' {
	// Extend DefaultTheme to match our AppTheme shape
	export interface DefaultTheme extends AppTheme {}
}


