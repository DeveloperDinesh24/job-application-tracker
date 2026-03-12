import type { JobApp } from '../types/job.types'
import JobAppCard from './JobAppCard'
import { Briefcase } from 'lucide-react'

interface JobAppProps {
  data?: JobApp[]
}

export default function JobAppsSection({ data }: JobAppProps) {
  // If no data, show a friendly message
  if (!data || data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl'>
        <div className='bg-slate-50 dark:bg-slate-900 p-4 rounded-full mb-4'>
          <Briefcase className='w-8 h-8 text-slate-400 dark:text-slate-600' />
        </div>
        <h3 className='text-lg font-semibold text-slate-900 dark:text-white'>
          No applications yet
        </h3>
        <p className='text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1'>
          Click the "Add Application" button to start tracking your journey!
        </p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
      <JobAppCard data={data} />
    </div>
  )
}
