import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'

interface GuestUser {
  id: string
  email: string
  user_metadata: {
    full_name: string
  }
  isGuest?: boolean
  isAuthenticated?: boolean
}

interface AuthState {
  user: Session['user'] | GuestUser | null
  loading: boolean
  isGuest: boolean // Add this line
  setUser: (user: Session['user'] | GuestUser | null) => void
  setLoading: (isLoading: boolean) => void
  clearAuth: () => void
  loginAsGuest: () => void // Add this line
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  isGuest: false,

  loginAsGuest: () => {
    const guestUser: GuestUser = {
      id: 'guest',
      email: 'guest@demo.com',
      user_metadata: { full_name: 'Guest User' },
    }

    set({
      user: guestUser,
      isGuest: true,
      loading: false,
    })
  },

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
      isGuest: false,
    }),
}))
