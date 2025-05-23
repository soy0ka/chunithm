'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
	const [isDarkMode, setIsDarkMode] = useState(false)

	// 컴포넌트 마운트 시 현재 테마 설정 불러오기
	useEffect(() => {
		// 로컬 스토리지에서 테마 설정 불러오기
		const savedTheme = localStorage.getItem('theme')
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

		// 저장된 테마가 있으면 그 설정 사용, 없으면
		// 시스템 테마 설정에 따라 초기 상태 설정
		const shouldUseDarkMode = savedTheme === 'dark' || (savedTheme === null && prefersDark)

		setIsDarkMode(shouldUseDarkMode)

		if (shouldUseDarkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [])

	// 테마 변경 함수
	const toggleTheme = () => {
		setIsDarkMode((prevMode) => {
			const newMode = !prevMode

			if (newMode) {
				document.documentElement.classList.add('dark')
				localStorage.setItem('theme', 'dark')
			} else {
				document.documentElement.classList.remove('dark')
				localStorage.setItem('theme', 'light')
			}

			return newMode
		})
	}

	return (
		<button
			onClick={toggleTheme}
			className="hover:bg-foreground/10 rounded-full p-2 transition-colors"
			aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
		>
			{isDarkMode ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-5 w-5 dark:text-white"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
					/>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-5 w-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
					/>
				</svg>
			)}
		</button>
	)
}
