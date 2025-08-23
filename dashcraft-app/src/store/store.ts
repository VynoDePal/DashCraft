import {configureStore, createSlice} from '@reduxjs/toolkit'

/**
 * uiSlice
 * Gère les préférences d'interface (ex: sidebar ouverte/fermée)
 */
const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		sidebarOpen: true,
	},
	reducers: {
		toggleSidebar(state) {
			state.sidebarOpen = !state.sidebarOpen
		},
	},
})

export const {toggleSidebar} = uiSlice.actions

export const store = configureStore({
	reducer: {
		ui: uiSlice.reducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
