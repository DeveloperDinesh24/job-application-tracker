import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import LandingPage from './components/LandingPage'
import DashboardUI from './components/DashboardUI'
import AuthPage from './components/AuthPage'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

export default function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
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

  // Auth Session Logic
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

  if (loading) {
    return (
      <div className='h-screen w-screen flex items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white'>
        <div className='animate-pulse font-medium'>Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <div className='min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300'>
        <Routes>
          {/* 1. Dedicated Auth Route for the Popup */}
          <Route path='/auth' element={<AuthPage />} />

          {/* 2. Main Application Route */}
          <Route
            path='/'
            element={
              !session ? (
                <LandingPage
                  onLoginClick={() => {
                    const width = 500
                    const height = 600
                    const left =
                      window.screenX + (window.outerWidth - width) / 2
                    const top =
                      window.screenY + (window.outerHeight - height) / 2
                    window.open(
                      '/auth',
                      'AuthWindow',
                      `width=${width},height=${height},left=${left},top=${top}`,
                    )
                  }}
                />
              ) : (
                <DashboardUI session={session} />
              )
            }
          />

          {/* 3. Catch-all: Redirect everything else to home */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </Router>
  )
}
