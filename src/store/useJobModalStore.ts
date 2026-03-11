import { create } from 'zustand'
import type { JobApp } from '../components/features/types/job.types'

interface JobModalState {
  isOpen: boolean
  editingJob: JobApp | null
  openAddModal: () => void
  openEditModal: (job: JobApp) => void
  closeModal: () => void
}

export const useJobModalStore = create<JobModalState>((set) => ({
  isOpen: false,
  editingJob: null,

  openAddModal: () =>
    set({
      isOpen: true,
      editingJob: null,
    }),

  openEditModal: (job) =>
    set({
      isOpen: true,
      editingJob: job,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      editingJob: null,
    }),
}))
