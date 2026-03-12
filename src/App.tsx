import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase' // Ensure this is a named import if that's how it's exported
import LandingPage from './components/LandingPage'
import DashboardUI from './components/DashboardUI'
import AuthPage from './components/AuthPage'
import { useAuthStore } from './store/useAuthStore'

export default function App() {
  const isAuthWindow = window.location.pathname === '/auth'

  // 1. Grab both the session and the setter from your store
  const { session, setSession } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 2. Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // 3. Listen for changes (Login/Logout)
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

  if (loading) return <div>Loading...</div>

  return (
    <>
      {/* 4. Now 'session' correctly refers to the state from your store */}
      {!session ? (
        <LandingPage onLoginClick={openAuthPopup} />
      ) : (
        <DashboardUI session={session} />
      )}
    </>
  )
}
