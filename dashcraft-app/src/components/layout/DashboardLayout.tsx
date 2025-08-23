'use client'

import {type ReactNode} from 'react'
import {Sidebar} from '@/components/layout/Sidebar'
import {Topbar} from '@/components/layout/Topbar'

/**
 * DashboardLayout
 * Layout principal avec Sidebar + Topbar + zone de contenu.
 */
export interface DashboardLayoutProps {
	children: ReactNode
}

export function DashboardLayout({children}: DashboardLayoutProps) {
	return (
		<div className='min-h-screen grid grid-rows-[auto_1fr] md:grid-cols-[16rem_1fr]'>
			<div className='md:col-span-2'>
				<Topbar />
			</div>
			<aside className='hidden md:block'>
				<Sidebar />
			</aside>
			<main className='p-4'>{children}</main>
		</div>
	)
}
