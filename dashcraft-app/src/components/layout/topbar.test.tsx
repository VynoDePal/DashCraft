import {renderWithProviders, screen} from '@/test/test-utils'
import {Topbar} from '@/components/layout/Topbar'
import {axe} from 'jest-axe'

it('rend boutons langue et toggle thème', async () => {
	const {container} = renderWithProviders(<Topbar />)
	const themeBtn = await screen.findByRole('button', {
		name: 'Basculer le thème',
	})
	expect(themeBtn).toBeInTheDocument()
	expect(screen.getByRole('button', {name: 'FR'})).toBeInTheDocument()
	expect(screen.getByRole('button', {name: 'EN'})).toBeInTheDocument()
	const results = await axe(container)
	expect(results).toHaveNoViolations()
})
