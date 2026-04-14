import { useMutation, useQueryClient } from '@tanstack/react-query'
import { jobApi } from '../services/jobApi'
import type { JobAppData, JobAppUpdateData } from '../types/job.types'
import toast from 'react-hot-toast'

export const useJobMutations = () => {
  const queryClient = useQueryClient()

  // 1. Create Mutation
  const createMutation = useMutation({
    mutationFn: ({
      data,
      userId,
    }: {
      data: JobAppData
      userId: string | undefined
    }) => {
      if (!userId) {
        throw new Error('User ID is required to create an application')
      }

      // 2. Now TypeScript knows userId is a string here
      return jobApi.create({ data, userId })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      toast.success('Application added!')
    },
    onError: () => {
      toast.error('Failed to add application. Please try again.')
    },
  })

  // 2. Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: JobAppUpdateData }) =>
      jobApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      toast.success('Application updated!')
    },
    onError: () => {
      toast.error('Failed to edit application. Please try again.')
    },
  })

  // 3. Delete Mutation
  const deleteMutation = useMutation({
    // Explicitly pass the id through
    mutationFn: (id: number) => jobApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      toast.success('Application deleted!')
    },
    onError: (error: Error) => {
      console.error('Delete Error:', error)
      toast.error('Failed to delete application.')
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
