import { useMutation, useQueryClient } from '@tanstack/react-query'
import { jobApi } from '../services/jobApi'
import type { JobAppData, JobAppUpdateData } from '../types/job.types'

export const useJobMutations = () => {
  const queryClient = useQueryClient()

  // 1. Create Mutation
  const createMutation = useMutation({
    mutationFn: ({ data, userId }: { data: JobAppData; userId: string }) =>
      jobApi.create({ data, userId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })

  // 2. Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: JobAppUpdateData }) =>
      jobApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })

  // 3. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: jobApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })

  return {
    createJob: createMutation.mutateAsync,
    updateJob: updateMutation.mutateAsync,
    deleteJob: deleteMutation.mutateAsync,
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  }
}
