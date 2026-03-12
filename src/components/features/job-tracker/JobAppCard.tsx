import { AnimatePresence, motion } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'
import type { JobApp } from '../types/job.types'
import { useDeleteModalStore } from '../../../store/useDeleteModalStore'
import { useJobModalStore } from '../../../store/useJobModalStore'

interface JobAppCardProps {
  data?: JobApp[]
}

export default function JobAppCard({ data }: JobAppCardProps) {
  const { openDeleteModal } = useDeleteModalStore()
  const { openEditModal } = useJobModalStore()

  // Helper to get dynamic badge colors
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Interviewing':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500'
      case 'Rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500'
      case 'Offer':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500'
      default: // Applied
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-500'
    }
  }

  return (
    <AnimatePresence mode='popLayout'>
      {data?.map((app) => (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          key={app.id}
          className='group relative p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg dark:hover:shadow-blue-900/10 transition-all duration-300'
        >
          <div className='flex justify-between items-start'>
            <div>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${getStatusStyles(app.status)}`}
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

            {/* Action Buttons - Improved visibility */}
            <div className='flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity'>
              <button
                onClick={() => openEditModal(app)}
                className='text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors p-2 cursor-pointer'
                title='Edit Application'
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => openDeleteModal(app.id, app.company)}
                className='text-slate-400 hover:text-red-600 dark:text-slate-500 dark:hover:text-red-400 transition-colors p-2 cursor-pointer'
                title='Delete Application'
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800'>
            <div className='text-sm'>
              <p className='text-slate-400 dark:text-slate-500 font-medium'>
                Salary
              </p>
              <p className='font-bold text-slate-700 dark:text-slate-300'>
                {app.salary ? `$${app.salary.toLocaleString('en-US')}` : 'N/A'}
              </p>
            </div>
            <div className='text-sm text-right'>
              <p className='text-slate-400 dark:text-slate-500 font-medium'>
                Applied on
              </p>
              <p className='font-bold text-slate-700 dark:text-slate-300'>
                {new Date(app.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
