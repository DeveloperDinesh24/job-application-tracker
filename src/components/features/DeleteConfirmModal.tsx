import { useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { useDeleteModalStore } from '../../store/useDeleteModalStore'
import { deleteJobApplication } from '../../services/jobs'

export default function DeleteConfirmModal() {
  const { isOpen, id, companyName, closeDeleteModal } = useDeleteModalStore()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!id) return
    setLoading(true)

    try {
      await deleteJobApplication(id)
      closeDeleteModal()
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    } catch (err) {
      console.error('Delete failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-60 flex items-center justify-center p-4'>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={loading ? undefined : closeDeleteModal}
            className='absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]'
          />

          {/* MODAL CONTENT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className='relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 text-center'
          >
            <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4'>
              <AlertTriangle className='h-6 w-6 text-red-600' />
            </div>

            <h3 className='text-lg font-bold text-slate-900 dark:text-white'>
              Delete Application?
            </h3>
            <p className='text-sm text-slate-500 dark:text-slate-400 mt-2'>
              Are you sure you want to delete <strong>{companyName}</strong>?
              This action cannot be undone.
            </p>

            <div className='flex gap-3 mt-6'>
              <button
                onClick={closeDeleteModal}
                disabled={loading}
                className='flex-1 px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className='flex-1 px-4 py-2 text-sm font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 transition-all active:scale-95 disabled:opacity-50'
              >
                {loading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
