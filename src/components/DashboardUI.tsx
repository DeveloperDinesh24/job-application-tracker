import { motion } from 'framer-motion'

import MainSection from './MainSection'
import Navbar from './Navbar'
import { useApplications } from './features/hooks/useJobs'

function DashboardUI() {
  const { isLoading } = useApplications()

  if (isLoading) {
    return (
      <div className='h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-500'>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full'
        />
        <p className='mt-4 text-slate-500 dark:text-slate-400 font-medium animate-pulse'>
          Fetching your journey...
        </p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500'>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <MainSection />
      </main>
    </div>
  )
}

export default DashboardUI
