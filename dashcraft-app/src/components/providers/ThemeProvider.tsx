'use client'

import {ThemeProvider as NextThemesProvider} from 'next-themes'
import {type ReactNode} from 'react'

/**
 * ThemeProvider
 * Fournit le thème (dark par défaut) via next-themes
 * et applique la classe "dark" sur <html>.
 */
export interface ThemeProviderProps {
	children: ReactNode
}

export function ThemeProvider({children}: ThemeProviderProps) {
	return (
		<NextThemesProvider
			attribute='class'
			defaultTheme='dark'
			enableSystem={false}
		>
			{children}
		</NextThemesProvider>
	)
}
