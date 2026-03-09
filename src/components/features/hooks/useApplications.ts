import { useQuery } from '@tanstack/react-query'
import api from '../../../lib/axios'

import type { JobApplication } from '../types/job.types'

export const useApplications = () => {
  return useQuery<JobApplication[]>({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data } = await api.get('/applications?select=*')
      return data
    },
  })
}
