import './App.css'

import { motion } from 'framer-motion'

import MainSection from './components/MainSection'
import Navbar from './components/Navbar'
import { useApplications } from './components/features/hooks/useApplications'

function App() {
  const { isLoading } = useApplications()

  if (isLoading) {
    return (
      <div className='h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-900'>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full'
        />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500'>
      <Navbar />
      <MainSection />
    </div>
  )
}

export default App
