import { useMutation, useQueryClient } from '@tanstack/react-query'
import { jobApi } from '../services/jobApi'

export const useJobMutations = () => {
  const queryClient = useQueryClient()

  // 1. Create Mutation
  const createMutation = useMutation({
    mutationFn: jobApi.create,
    onSuccess: () => {
      // This tells the "Waiter" to go get fresh data because the menu changed!
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })

  // 2. Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
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
    createJob: createMutation.mutate,
    updateJob: updateMutation.mutate,
    deleteJob: deleteMutation.mutate,
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  }
}
