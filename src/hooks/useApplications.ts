import { useQuery } from '@tanstack/react-query'
import api from '../api/axios'

import type { JobApplication } from '../types/JobApplication'

export const useApplications = () => {
  return useQuery<JobApplication[]>({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data } = await api.get('/applications?select=*')
      return data
    },
  })
}
