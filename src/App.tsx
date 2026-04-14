import './App.css'
import { useEffect } from 'react'
import { supabase } from './lib/supabase'
import LandingPage from './components/LandingPage'
import DashboardUI from './components/DashboardUI'
import AuthPage from './components/AuthPage'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'
import { Routes, Route, Navigate } from 'react-router-dom'

export default function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  const { user, loading, setUser } = useAuthStore()

  useEffect(() => {
    // Define function to check for existing session on app load
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      // setUser automatically sets loading to false in your store!
    }

    // 1. Check for an existing session on mount
    checkSession()

    // 2. Listen for changes (Login, Logout, Token Refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // 3. Cleanup subscription on unmount
    return () => subscription.unsubscribe()
  }, [setUser])

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

  if (loading) {
    return (
      <div className='h-screen w-screen flex items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white'>
        <div className='animate-pulse font-medium'>Loading...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300'>
      <Routes>
        {/* Home Route */}
        <Route path='/' element={<LandingPage />} />

        {/* Auth Route: If already logged in, skip to dashboard */}
        <Route
          path='/auth'
          element={!user ? <AuthPage /> : <Navigate to='/dashboard' />}
        />

        {/* Protected Dashboard Route */}
        <Route
          path='/dashboard'
          element={user ? <DashboardUI /> : <Navigate to='/auth' />}
        />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
}
