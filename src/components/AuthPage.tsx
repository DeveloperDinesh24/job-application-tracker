import { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'

export default function AuthPage() {
  useEffect(() => {
    // Listen for the "SIGNED_IN" event inside the popup
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        // Give the user a half-second to see they succeeded
        setTimeout(() => {
          window.close()
        }, 500)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className='p-8 bg-white dark:bg-slate-900 min-h-screen'>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme='dark'
      />
    </div>
  )
}
