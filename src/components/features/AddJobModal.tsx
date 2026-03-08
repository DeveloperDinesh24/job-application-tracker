import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useModalStore } from '../../store/useModalStore'

export default function AddJobModal() {
  const { isOpen, closeModal } = useModalStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          {/* --- BACKDROP --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className='absolute inset-0 bg-slate-900/60 backdrop-blur-sm'
          />

          {/* --- MODAL CONTENT --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className='relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden'
          >
            {/* HEADER */}
            <div className='flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800'>
              <h2 className='text-xl font-bold text-slate-800 dark:text-white'>
                Add New Application
              </h2>
              <button
                onClick={closeModal}
                className='p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors'
              >
                <X size={20} className='text-slate-500' />
              </button>
            </div>

            {/* FORM */}
            <form className='p-6 space-y-4 max-h-[70vh] overflow-y-auto'>
              {/* Company & Role */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <label className='text-sm font-semibold flex items-center gap-1'>
                    Company <span className='text-red-500'>*</span>
                  </label>
                  <input
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
                    type='text'
                    placeholder='e.g. Frontend Dev'
                    className='form-input'
                    required
                  />
                </div>
              </div>

              {/* Status & Salary */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <label className='text-sm font-semibold flex items-center gap-1'>
                    Status <span className='text-red-500'>*</span>
                  </label>
                  <select className='form-input' required>
                    <option value='Applied'>Applied</option>
                    <option value='Interviewing'>Interviewing</option>
                    <option value='Offer'>Offer</option>
                  </select>
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-semibold'>Salary</label>
                  <input
                    type='number'
                    placeholder='90000'
                    className='form-input'
                  />
                  <p className='text-[10px] text-slate-400'>Optional</p>
                </div>
              </div>

              {/* Location */}
              <div className='space-y-1.5'>
                <label className='text-sm font-semibold'>Location</label>
                <input
                  type='text'
                  placeholder='e.g. Remote / New York'
                  className='form-input'
                />
                <p className='text-[10px] text-slate-400'>Optional</p>
              </div>

              {/* Notes */}
              <div className='space-y-1.5'>
                <label className='text-sm font-semibold'>Notes</label>
                <textarea
                  rows={3}
                  placeholder='Anything specific about the interview...'
                  className='form-input resize-none'
                />
                <p className='text-[10px] text-slate-400'>Optional</p>
              </div>

              {/* ACTION BUTTONS */}
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
                  className='flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20 transition-transform active:scale-95'
                >
                  Create App
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
