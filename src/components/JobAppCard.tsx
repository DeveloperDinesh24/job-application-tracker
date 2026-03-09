import { AnimatePresence, motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import type { JobApplication } from '../types/JobApplication'
import { useDeleteModalStore } from '../store/useDeleteModalStore'

interface JobAppCardProps {
  data?: JobApplication[]
}

export default function JobAppCard({ data }: JobAppCardProps) {
  const { openDeleteModal } = useDeleteModalStore()

  return (
    <AnimatePresence mode='popLayout'>
      {data?.map((app) => (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          key={app.id}
          className='group relative p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors'
        >
          <div className='flex justify-between items-start'>
            <div>
              <span
                className={`text-xs font-bold uppercase tracking-wider ${app.status === 'Interviewing' ? 'text-yellow-500' : app.status === 'Rejected' ? 'text-red-500' : app.status === 'Offer' ? 'text-green-500' : 'text-blue-500'} bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md`}
              >
                {app.status}
              </span>
              <h3 className='text-xl font-bold mt-3 text-slate-800 dark:text-slate-100'>
                {app.company}
              </h3>
              <p className='text-slate-600 dark:text-slate-400 font-medium'>
                {app.role}
              </p>
            </div>
            <div className='relative group'>
              <button
                onClick={() => {
                  openDeleteModal(app.id, app.company)
                }}
                className='text-slate-300 hover:text-red-500 transition-colors p-2 cursor-pointer'
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800'>
            <div className='text-sm'>
              <p className='text-slate-400'>Salary</p>
              <p className='font-semibold text-slate-700 dark:text-slate-300'>
                {app.salary ? `$${app.salary.toLocaleString('en-US')}` : 'N/A'}
              </p>
            </div>
            <div className='text-sm text-right'>
              <p className='text-slate-400'>Applied on</p>
              <p className='font-semibold text-slate-700 dark:text-slate-300'>
                {new Date(app.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
