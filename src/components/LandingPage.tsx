import { motion } from 'framer-motion'

interface LandingPageProps {
  onLoginClick: () => void
}

export default function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-6'>
      {/* Subtle Background Glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-500/10 blur-[120px] rounded-full' />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='relative z-10 text-center max-w-2xl'
      >
        <span className='px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 inline-block'>
          Beta Version 1.0
        </span>

        <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6'>
          Stop losing track of your{' '}
          <span className='text-blue-600'>Future.</span>
        </h1>

        <p className='text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed'>
          The minimalist job application tracker for developers. Keep your
          interviews, salaries, and follow-ups in one beautiful dashboard.
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <button
            onClick={onLoginClick}
            className='w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/25'
          >
            Get Started Now
          </button>

          <button className='w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95'>
            Sign in as Guest
          </button>
        </div>
      </motion.div>

      {/* Visual Decor: Floating Cards */}
      <div className='absolute inset-0 pointer-events-none opacity-20 dark:opacity-10'>
        {/* You can add CSS shapes here to make it look "techy" */}
      </div>
    </div>
  )
}
