import { supabase } from '../../../lib/supabase'
import type { JobApp, JobAppData } from '../types/job.types'
import { useAuthStore } from '../../../store/useAuthStore'

const GUEST_STORAGE_KEY = 'devtrack_guest_jobs'

// Helper to get local jobs
const getLocalJobs = (): JobApp[] => {
  const data = localStorage.getItem(GUEST_STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

// Helper to save local jobs
const saveLocalJobs = (jobs: JobApp[]) => {
  localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(jobs))
}

export const jobApi = {
  getAll: async () => {
    const { isGuest } = useAuthStore.getState()

    if (isGuest) {
      return getLocalJobs()
    }

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  create: async ({ data, userId }: { data: JobAppData; userId: string }) => {
    const { isGuest } = useAuthStore.getState()

    if (isGuest) {
      const jobs = getLocalJobs()

      if (jobs.length >= 5) {
        throw new Error('Guest limit reached! Sign in to save more.')
      }

      const newJob: JobApp = {
        ...data,
        id: Date.now(), // Date.now() returns a number, which fits your interface better
        user_id: userId,
        created_at: new Date().toISOString(),
      }

      saveLocalJobs([newJob, ...jobs])
      return newJob
    }

    const { error } = await supabase
      .from('applications')
      .insert([{ ...data, user_id: userId }])

    if (error) throw error
  },

  update: async (id: number, payload: Partial<JobApp>) => {
    const { isGuest } = useAuthStore.getState()

    if (isGuest) {
      const jobs = getLocalJobs()
      const updatedJobs = jobs.map((job) =>
        job.id === id ? { ...job, ...payload } : job,
      )
      saveLocalJobs(updatedJobs)
      return
    }

    const { error } = await supabase
      .from('applications')
      .update(payload)
      .eq('id', id)

    if (error) throw error
  },

  delete: async (id: number) => {
    const { isGuest } = useAuthStore.getState()

    if (isGuest) {
      const jobs = getLocalJobs()
      const filteredJobs = jobs.filter((job) => job.id !== id)
      saveLocalJobs(filteredJobs)
      return
    }

    const { error } = await supabase.from('applications').delete().eq('id', id)

    if (error) throw error
  },
}
