import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Plus, LogOut, Loader2 } from 'lucide-react'

import { useJobModalStore } from '../store/useJobModalStore'
import { useAuthStore } from '../store/useAuthStore'
import { useThemeStore } from '../store/useThemeStore'

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useThemeStore()
  const { openAddModal } = useJobModalStore()
  const signOut = useAuthStore((state) => state.signOut)
  const [isPending, setIsPending] = useState(false)

  const handleLogout = async () => {
    setIsPending(true)
    try {
      await signOut()
    } catch (error) {
      console.error('Logout failed:', error)
      setIsPending(false)
    }
  }

  return (
    // Added a subtle border-b and background blur for a "Glassmorphism" effect
    <nav className='sticky top-0 z-40 w-full bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-500'>
      <div className='p-4 md:p-6 flex justify-between items-center max-w-7xl mx-auto'>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent'
        >
          DevTrack.io
        </motion.h1>

        <div className='flex items-center gap-2 md:gap-4'>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className='p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer group'
            aria-label='Toggle Theme'
          >
            {isDarkMode ? (
              <Sun
                size={20}
                className='text-yellow-400 group-hover:rotate-45 transition-transform'
              />
            ) : (
              <Moon
                size={20}
                className='text-slate-600 group-hover:-rotate-12 transition-transform'
              />
            )}
          </button>

          {/* Add Job Button */}
          <button
            onClick={openAddModal}
            className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20 cursor-pointer'
          >
            <Plus size={18} />
            <span className='hidden md:inline'>Add Application</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isPending}
            className='flex items-center gap-2 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isPending ? (
              <Loader2 size={18} className='animate-spin' />
            ) : (
              <LogOut size={18} />
            )}
            <span className='hidden md:inline'>
              {isPending ? 'Logging out...' : 'Log Out'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
