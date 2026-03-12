import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import LandingPage from './components/LandingPage'
import DashboardUI from './components/DashboardUI'
import AuthPage from './components/AuthPage'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'

export default function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const isAuthWindow = window.location.pathname === '/auth'

  const { session, setSession } = useAuthStore()
  const [loading, setLoading] = useState(true)

  // Sync Theme with DOM
  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }
  }, [isDarkMode])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [setSession])

  if (isAuthWindow) {
    return <AuthPage />
  }

  const openAuthPopup = () => {
    const width = 500
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    window.open(
      '/auth',
      'AuthWindow',
      `width=${width},height=${height},left=${left},top=${top}`,
    )
  }

  if (loading) {
    return (
      // Added theme-aware loading screen
      <div className='h-screen w-screen flex items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white'>
        <div className='animate-pulse font-medium'>Loading...</div>
      </div>
    )
  }

  return (
    // Wrap entire app in a div that handles the background transition
    <div className='min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300'>
      {!session ? (
        <LandingPage onLoginClick={openAuthPopup} />
      ) : (
        <DashboardUI session={session} />
      )}
    </div>
  )
}
