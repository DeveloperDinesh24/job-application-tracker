import { motion } from 'framer-motion'
import { type Session } from '@supabase/supabase-js'

import MainSection from './MainSection'
import Navbar from './Navbar'
import { useApplications } from './features/hooks/useJobs'

function DashboardUI({ session }: { session: Session | null }) {
  const { isLoading } = useApplications()

  console.log(session)

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

export default DashboardUI
