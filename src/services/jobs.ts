import api from '../api/axios'

interface JobApplicationData {
  company: string
  role: string
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'
  salary: number
  location?: string
  notes?: string
  created_at?: string
}

export const createJobApplication = async (data: JobApplicationData) => {
  const payload = {
    ...data,
    created_at: new Date().toISOString(),
  }

  return await api.post('/applications', payload)
}

export const deleteJobApplication = async (id: number) => {
  return await api.delete('/applications', {
    params: {
      id: `eq.${id}`,
    },
  })
}
