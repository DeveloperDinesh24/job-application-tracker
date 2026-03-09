import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Plus } from 'lucide-react'

import { useModalStore } from '../store/useAddModalStore'

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { openModal } = useModalStore()

  return (
    <nav className='p-6 flex justify-between items-center max-w-7xl mx-auto'>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent'
      >
        DevTrack.io
      </motion.h1>

      <div className='flex items-center gap-4'>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className='p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:ring-2 ring-blue-400 transition-all cursor-pointer'
        >
          {isDarkMode ? (
            <Sun size={20} className='text-yellow-400' />
          ) : (
            <Moon size={20} className='text-slate-600' />
          )}
        </button>

        <button
          onClick={openModal}
          className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-transform active:scale-95 cursor-pointer'
        >
          <Plus size={18} />
          <span>Add Job</span>
        </button>
      </div>
    </nav>
  )
}
