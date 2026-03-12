import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase' // Import it directly at the top

interface AuthState {
  session: Session | null
  setSession: (session: Session | null) => void
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  signOut: async () => {
    // No need for the complex 'await import' anymore
    await supabase.auth.signOut()
    set({ session: null })
  },
}))
