import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'

interface AuthState {
  user: Session['user'] | null
  loading: boolean
  setUser: (user: Session['user'] | null) => void
  setLoading: (isLoading: boolean) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) =>
    set({
      user,
      loading: false,
    }),

  setLoading: (isLoading) =>
    set({
      loading: isLoading,
    }),

  clearAuth: () =>
    set({
      user: null,
      loading: false,
    }),
}))
