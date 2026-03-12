import { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'
import { useThemeStore } from '../store/useThemeStore'

export default function AuthPage() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  useEffect(() => {
    // Listen for the "SIGNED_IN" event inside the popup
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setTimeout(() => {
          window.close()
        }, 500)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-500'>
      {/* Subtle Background Glow to match Landing Page */}
      <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none' />

      <div className='relative z-10 w-full max-w-md'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-black text-slate-900 dark:text-white mb-2'>
            Welcome to <span className='text-blue-600'>DevTrack.io</span>
          </h2>
          <p className='text-slate-500 dark:text-slate-400'>
            Sign in to secure your career journey.
          </p>
        </div>

        <div className='bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800'>
          <Auth
            supabaseClient={supabase}
            providers={['google', 'github', 'linkedin']} // Add these here
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                    inputBackground: 'transparent',
                    inputText: isDarkMode ? 'white' : 'black',
                    inputPlaceholder: '#94a3b8',
                  },
                  radii: {
                    borderRadiusButton: '12px',
                    inputBorderRadius: '12px',
                  },
                },
              },
            }}
            theme={isDarkMode ? 'dark' : 'light'}
            // This makes it so users stay on the site after social login
            redirectTo={window.location.origin}
          />
        </div>

        <p className='mt-8 text-center text-sm text-slate-400'>
          By signing in, you agree to track your future responsibly.
        </p>
      </div>
    </div>
  )
}
