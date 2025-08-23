'use client'

import {WidgetCard} from '@/components/dashboard/WidgetCard'
import {useTranslations} from 'next-intl'

/**
 * SettingsWidget
 * Placeholder de paramètres du dashboard (mock, accessible).
 */
export function SettingsWidget() {
	const t = useTranslations('widgets.settings')
	return (
		<WidgetCard id='module-settings' title={t('title')}>
			<form aria-label={t('title')} className='space-y-3'>
				<div className='flex items-center gap-2'>
					<input id='setting-1' type='checkbox' className='h-4 w-4' />
					<label htmlFor='setting-1' className='text-sm'>
						{t('optionA')}
					</label>
				</div>
				<div className='flex items-center gap-2'>
					<input id='setting-2' type='checkbox' className='h-4 w-4' />
					<label htmlFor='setting-2' className='text-sm'>
						{t('optionB')}
					</label>
				</div>
			</form>
		</WidgetCard>
	)
}
