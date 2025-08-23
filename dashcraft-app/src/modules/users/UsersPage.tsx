'use client'

import {useEffect, useMemo, useRef, useState} from 'react'
import {useTranslations} from 'next-intl'
import {useApi, type UserEntity} from '@/lib/useApi'
import {cn} from '@/lib/utils'

/**
 * UsersPage
 * Page dédiée Utilisateurs avec recherche, pagination et CRUD (mock).
 */
export function UsersPage() {
	const tNav = useTranslations('nav')
	const tW = useTranslations('widgets.users')
	const t = useTranslations('pages.users')
	const api = useApi()

	const [q, setQ] = useState('')
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [data, setData] = useState<{
		items: UserEntity[]
		total: number
		totalPages: number
	} | null>(null)

	const [creating, setCreating] = useState(false)
	const [createName, setCreateName] = useState('')
	const [createRole, setCreateRole] = useState<'Admin'|'Editor'|'Viewer'>('Viewer')
	const [createStatus, setCreateStatus] = useState<'active'|'inactive'>('active')

	const [editingId, setEditingId] = useState<string | null>(null)
	const [editName, setEditName] = useState('')
	const [editRole, setEditRole] = useState<'Admin'|'Editor'|'Viewer'>('Viewer')
	const [editStatus, setEditStatus] = useState<'active'|'inactive'>('active')

	const liveRef = useRef<HTMLDivElement | null>(null)

	const roleOptions = useMemo(() => (
		[
			{value: 'Admin', label: t('roles.admin')},
			{value: 'Editor', label: t('roles.editor')},
			{value: 'Viewer', label: t('roles.viewer')},
		]
	), [t])

	const statusOptions = useMemo(() => (
		[
			{value: 'active', label: t('status.active')},
			{value: 'inactive', label: t('status.inactive')},
		]
	), [t])

	function speak(message: string) {
		if (!liveRef.current) return
		liveRef.current.textContent = message
	}

	async function fetchPage() {
		setLoading(true)
		setError(null)
		try {
			const res = await api.users.list({page, pageSize, q})
			setData({
				items: res.items,
				total: res.total,
				totalPages: res.totalPages,
			})
		} catch (e) {
			setError((e as Error).message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchPage()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, pageSize, q])

	function resetCreate() {
		setCreateName('')
		setCreateRole('Viewer')
		setCreateStatus('active')
	}

	async function handleCreate(e: React.FormEvent) {
		e.preventDefault()
		setCreating(true)
		try {
			await api.users.create({
				name: createName,
				role: createRole,
				status: createStatus,
			})
			speak(t('live.created'))
			resetCreate()
			setPage(1)
			await fetchPage()
		} catch (err) {
			setError((err as Error).message)
		} finally {
			setCreating(false)
		}
	}

	function startEdit(u: UserEntity) {
		setEditingId(u.id)
		setEditName(u.name)
		setEditRole(u.role)
		setEditStatus(u.status)
	}

	function cancelEdit() {
		setEditingId(null)
	}

	async function saveEdit(id: string) {
		try {
			await api.users.update(id, {
				name: editName,
				role: editRole,
				status: editStatus,
			})
			speak(t('live.updated'))
			setEditingId(null)
			await fetchPage()
		} catch (err) {
			setError((err as Error).message)
		}
	}

	async function handleDelete(id: string) {
		const ok = window.confirm(t('deleteConfirm'))
		if (!ok) return
		try {
			await api.users.delete(id)
			speak(t('live.deleted'))
			await fetchPage()
		} catch (err) {
			setError((err as Error).message)
		}
	}

	function mapRole(r: UserEntity['role']) {
		switch (r) {
			case 'Admin':
				return t('roles.admin')
			case 'Editor':
				return t('roles.editor')
			case 'Viewer':
				return t('roles.viewer')
		}
	}

	function mapStatus(s: UserEntity['status']) {
		return s === 'active' ? t('status.active') : t('status.inactive')
	}

	return (
		<section aria-labelledby='users-title'>
			<header className='mb-4 flex items-end justify-between gap-4'>
				<div>
					<h1 id='users-title' className='text-xl font-semibold'>
						{tNav('users')}
					</h1>
					<p className='text-sm text-white/70 mt-1'>
						{t('subtitle')}
					</p>
				</div>
				<div className='w-full max-w-xs'>
					<label htmlFor='users-search' className='sr-only'>
						{t('search')}
					</label>
					<input
						id='users-search'
						type='search'
						value={q}
						onChange={e => {
							setPage(1)
							setQ(e.target.value)
						}}
						placeholder={t('searchPlaceholder')}
						className='w-full rounded-md border border-white/10 bg-white/5 p-2
							outline-none focus:ring-2 focus:ring-blue-500'
						aria-label={t('search')}
					/>
				</div>
			</header>

			<div
				ref={liveRef}
				className='sr-only'
				aria-live='polite'
				aria-atomic='true'
			/>

			{/* Create */}
			<form onSubmit={handleCreate} aria-label={t('form')}
				className='mb-4 grid grid-cols-1 gap-3 md:grid-cols-5'>
				<div>
					<label htmlFor='c-name' className='block text-xs text-white/70'>
						{tW('name')}
					</label>
					<input
						id='c-name'
						value={createName}
						onChange={e => setCreateName(e.target.value)}
						required
						className='w-full rounded-md border border-white/10 bg-white/5 p-2
							outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>
				<div>
					<label htmlFor='c-role' className='block text-xs text-white/70'>
						{tW('role')}
					</label>
					<select
						id='c-role'
						value={createRole}
						onChange={e => setCreateRole(e.target.value as 'Admin'|'Editor'|'Viewer')}
						className='w-full rounded-md border border-white/10 bg-white/5 p-2
							outline-none focus:ring-2 focus:ring-blue-500'
					>
						{roleOptions.map(o => (
							<option key={o.value} value={o.value}>{o.label}</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor='c-status' className='block text-xs text-white/70'>
						{tW('status')}
					</label>
					<select
						id='c-status'
						value={createStatus}
						onChange={e => setCreateStatus(e.target.value as 'active'|'inactive')}
						className='w-full rounded-md border border-white/10 bg-white/5 p-2
							outline-none focus:ring-2 focus:ring-blue-500'
					>
						{statusOptions.map(o => (
							<option key={o.value} value={o.value}>{o.label}</option>
						))}
					</select>
				</div>
				<div className='md:self-end'>
					<button
						type='submit'
						disabled={creating || !createName.trim()}
						className='rounded-md bg-blue-600 px-3 py-2 text-sm
							hover:bg-blue-500 disabled:opacity-50'
					>
						{t('addUser')}
					</button>
				</div>
			</form>

			<div className='overflow-x-auto rounded-lg border border-white/10'>
				<table className='min-w-full text-sm' aria-label={tNav('users')}>
					<thead className='text-left text-white/70'>
						<tr>
							<th scope='col' className='pb-2 pr-4'>{tW('name')}</th>
							<th scope='col' className='pb-2 pr-4'>{tW('role')}</th>
							<th scope='col' className='pb-2 pr-4'>{tW('status')}</th>
							<th scope='col' className='pb-2'>{tW('actions')}</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-white/10'>
						{loading && (
							<tr>
								<td colSpan={4} className='py-4 text-center text-white/70'>
									{t('loading')}
								</td>
							</tr>
						)}
						{!loading && data?.items.length === 0 && (
							<tr>
								<td colSpan={4} className='py-4 text-center text-white/70'>
									{t('noResults')}
								</td>
							</tr>
						)}
						{data?.items.map(u => (
							<tr key={u.id}>
								<td className='py-2 pr-4'>
									{editingId === u.id ? (
										<input
											value={editName}
											onChange={e => setEditName(e.target.value)}
											className='w-full rounded-md border border-white/10 bg-white/5 p-2
												outline-none focus:ring-2 focus:ring-blue-500'
										/>
									) : (
										<span>{u.name}</span>
									)}
								</td>
								<td className='py-2 pr-4'>
									{editingId === u.id ? (
										<select
											value={editRole}
											onChange={e => setEditRole(e.target.value as UserEntity['role'])}
											className='w-full rounded-md border border-white/10 bg-white/5 p-2
												outline-none focus:ring-2 focus:ring-blue-500'
										>
											{roleOptions.map(o => (
												<option key={o.value} value={o.value}>{o.label}</option>
											))}
										</select>
									) : (
										<span>{mapRole(u.role)}</span>
									)}
								</td>
								<td className='py-2 pr-4'>
									{editingId === u.id ? (
										<select
											value={editStatus}
											onChange={e => setEditStatus(e.target.value as UserEntity['status'])}
											className='w-full rounded-md border border-white/10 bg-white/5 p-2
												outline-none focus:ring-2 focus:ring-blue-500'
										>
											{statusOptions.map(o => (
												<option key={o.value} value={o.value}>{o.label}</option>
											))}
										</select>
									) : (
										<span className={cn(
											u.status === 'active' ? 'text-green-400' : 'text-amber-400'
										)}>
											{mapStatus(u.status)}
										</span>
									)}
								</td>
								<td className='py-2'>
									<div className='flex items-center gap-2'>
										{editingId === u.id ? (
											<>
												<button
													onClick={() => saveEdit(u.id)}
													className='rounded-md bg-green-600 px-2 py-1 text-sm
														hover:bg-green-500'
												>
													{t('save')}
												</button>
												<button
													onClick={cancelEdit}
													className='rounded-md bg-white/5 px-2 py-1 text-sm
														hover:bg-white/10'
												>
													{t('cancel')}
												</button>
											</>
										) : (
											<>
												<button
													onClick={() => startEdit(u)}
													className='rounded-md bg-white/5 px-2 py-1 text-sm hover:bg-white/10'
													aria-label={tW('edit')}
												>
													{tW('edit')}
												</button>
												<button
													onClick={() => handleDelete(u.id)}
													className='rounded-md bg-white/5 px-2 py-1 text-sm hover:bg-white/10'
													aria-label={tW('delete')}
												>
													{tW('delete')}
												</button>
											</>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className='mt-4 flex flex-col items-center gap-3 md:flex-row md:justify-between'>
				<div className='flex items-center gap-2'>
					<button
						onClick={() => setPage(p => Math.max(1, p - 1))}
						disabled={loading || (data?.totalPages ?? 1) <= 1 || page <= 1}
						className='rounded-md bg-white/5 px-3 py-1 text-sm hover:bg-white/10
							disabled:opacity-50'
					>
						{t('previous')}
					</button>
					<p className='text-sm text-white/80'>
						{t('page')} {page} {t('of')} {data?.totalPages ?? 1}
					</p>
					<button
						onClick={() => setPage(p => p + 1)}
						disabled={loading || (data?.totalPages ?? 1) <= 1 || page >= (data?.totalPages ?? 1)}
						className='rounded-md bg-white/5 px-3 py-1 text-sm hover:bg-white/10
							disabled:opacity-50'
					>
						{t('next')}
					</button>
				</div>
				<div className='flex items-center gap-2'>
					<label htmlFor='page-size' className='text-sm text-white/70'>
						{t('pageSize')}
					</label>
					<select
						id='page-size'
						value={pageSize}
						onChange={e => {
							setPage(1)
							setPageSize(parseInt(e.target.value))
						}}
						className='rounded-md border border-white/10 bg-white/5 p-1
							outline-none focus:ring-2 focus:ring-blue-500'
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={50}>50</option>
					</select>
				</div>
			</div>

			{error && (
				<p role='alert' className='mt-3 text-sm text-red-400'>
					{error}
				</p>
			)}
		</section>
	)
}
