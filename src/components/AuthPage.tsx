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
    // Added transition and flex centering to make the popup look cleaner
    <div className='p-8 bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300 flex flex-col justify-center'>
      <div className='max-w-md mx-auto w-full'>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            // Customizing the Supabase UI to match your Slate theme
            variables: {
              default: {
                colors: {
                  brand: '#2563eb', // blue-600
                  brandAccent: '#1d4ed8', // blue-700
                },
              },
            },
          }}
          // Dynamic theme switching based on your Zustand store!
          theme={isDarkMode ? 'dark' : 'light'}
        />
      </div>
    </div>
  )
}
