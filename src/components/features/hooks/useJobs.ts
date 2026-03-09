import { useQuery } from '@tanstack/react-query'
import { jobApi } from '../services/jobApi'
import type { JobApplication } from '../types/job.types'

export const useApplications = () => {
  return useQuery<JobApplication[]>({
    queryKey: ['applications'],
    queryFn: jobApi.getAll,
  })
}
