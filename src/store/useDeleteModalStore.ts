import { create } from 'zustand'

interface DeleteModalState {
  isOpen: boolean
  id: number | null
  companyName: string
  // Actions
  openDeleteModal: (id: number, companyName: string) => void
  closeDeleteModal: () => void
}

export const useDeleteModalStore = create<DeleteModalState>((set) => ({
  isOpen: false,
  id: null,
  companyName: '',

  openDeleteModal: (id, companyName) => set({ isOpen: true, id, companyName }),

  closeDeleteModal: () => set({ isOpen: false, id: null, companyName: '' }),
}))
