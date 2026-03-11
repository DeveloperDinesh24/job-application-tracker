import api from '../../../lib/axios'
import type { JobApp, JobAppData } from '../types/job.types'

export const jobApi = {
  // GET all jobs
  getAll: async () => {
    const { data } = await api.get<JobApp[]>('/applications?select=*')
    return data
  },

  // POST new job
  create: async (payload: JobAppData) => {
    const body = { ...payload, created_at: new Date().toISOString() }
    return await api.post('/applications', body)
  },

  // PATCH existing job
  update: async (id: number, payload: Partial<JobApp>) => {
    return await api.patch('/applications', payload, {
      params: { id: `eq.${id}` },
    })
  },

  // DELETE job
  delete: async (id: number) => {
    return await api.delete('/applications', {
      params: { id: `eq.${id}` },
    })
  },
}
