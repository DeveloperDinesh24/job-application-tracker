import { useQuery } from '@tanstack/react-query'
import { jobApi } from '../services/jobApi'
import type { JobApp } from '../types/job.types'

export const useApplications = () => {
  return useQuery<JobApp[]>({
    queryKey: ['applications'],
    queryFn: jobApi.getAll,
  })
}
