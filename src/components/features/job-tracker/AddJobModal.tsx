import { motion, AnimatePresence } from 'framer-motion' // Added AnimatePresence
import { X } from 'lucide-react'
import { useJobModalStore } from '../../../store/useJobModalStore'
import { useEffect, useState } from 'react'
import { formatCurrency, salaryForDB } from '../../../utils/formatters'
import { useJobMutations } from '../hooks/useJobMutation'
import { useAuthStore } from '../../../store/useAuthStore'

type statusType = 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'

const initialState = {
  company: '',
  role: '',
  status: 'Applied' as statusType,
  salary: 0,
  location: '',
  notes: '',
}

export default function AddJobModal() {
  const { isOpen, closeModal, editingJob } = useJobModalStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const session = useAuthStore((state) => state.session)
  const { createJob, updateJob } = useJobMutations()

  useEffect(() => {
    if (editingJob) {
      setFormData({
        company: editingJob.company,
        role: editingJob.role,
        status: editingJob.status,
        salary: editingJob.salary ?? 0,
        location: editingJob.location || '',
        notes: editingJob.notes || '',
      })
    } else {
      setFormData(initialState)
    }
  }, [editingJob, isOpen])

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setFormData((prev) => ({ ...prev, salary: salaryForDB(formatted) }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session?.user) {
      console.error('No user found in session')
      return
    }

    setLoading(true)
    try {
      if (editingJob) {
        await updateJob({ id: editingJob.id, data: formData })
      } else {
        // Pass the data and the user ID correctly
        await createJob({ data: formData, userId: session.user.id })
      }
      closeModal()
    } catch (error) {
      console.error('Failed to save job: ', error)
    } finally {
      setLoading(false)
    }
  } // Removed the extra closing brace that was here

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className='absolute inset-0 bg-slate-900/60 backdrop-blur-sm'
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className='relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden'
          >
            <div className='flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800'>
              <h2 className='text-xl font-bold text-slate-800 dark:text-white'>
                {editingJob ? 'Edit Application' : 'Add New Application'}
              </h2>
              <button
                onClick={closeModal}
                className='p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors'
              >
                <X size={20} className='text-slate-500' />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className='p-6 space-y-4 max-h-[70vh] overflow-y-auto'
            >
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <label className='text-sm font-semibold flex items-center gap-1'>
                    Company <span className='text-red-500'>*</span>
                  </label>
                  <input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    type='text'
                    placeholder='e.g. Google'
                    className='form-input'
                    required
                  />
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-semibold flex items-center gap-1'>
                    Role <span className='text-red-500'>*</span>
                  </label>
                  <input
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    type='text'
                    placeholder='e.g. Frontend Dev'
                    className='form-input'
                    required
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <label className='text-sm font-semibold flex items-center gap-1'>
                    Status <span className='text-red-500'>*</span>
                  </label>
                  <select
                    value={formData.status}
                    className='form-input'
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as statusType,
                      })
                    }
                  >
                    <option value='Applied'>Applied</option>
                    <option value='Interviewing'>Interviewing</option>
                    <option value='Offer'>Offer</option>
                    <option value='Rejected'>Rejected</option>
                  </select>
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-semibold'>
                    Salary (Optional)
                  </label>
                  <div className='relative'>
                    <span className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'>
                      $
                    </span>
                    <input
                      type='text'
                      value={
                        formData.salary === 0
                          ? ''
                          : formatCurrency(formData.salary.toString())
                      }
                      onChange={handleSalaryChange}
                      placeholder='90,000'
                      className='form-input pl-7'
                    />
                  </div>
                </div>
              </div>

              <div className='space-y-1.5'>
                <label className='text-sm font-semibold'>Location</label>
                <input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  type='text'
                  placeholder='e.g. Remote'
                  className='form-input'
                />
              </div>

              <div className='space-y-1.5'>
                <label className='text-sm font-semibold'>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  placeholder='Notes...'
                  className='form-input resize-none'
                />
              </div>

              <div className='flex gap-3 pt-4'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20 transition-transform active:scale-95 disabled:opacity-50'
                >
                  {loading
                    ? 'Processing...'
                    : editingJob
                      ? 'Update Application'
                      : 'Add Application'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
