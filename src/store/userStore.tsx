import { Account } from '@/interfaces'
import { create } from 'zustand'

interface AccountState {
  user: Account | null
  setUser: (user: Account) => void
  clearUser: () => void
  updateBalance: (newBalance: number) => void
}

const useUserStore = create<AccountState>()(set => ({
  user: null,
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
  updateBalance: newBalance => {
    const currentUser = useUserStore.getState().user
    if (currentUser) {
      const updatedUser = { ...currentUser, balance: newBalance }
      set({ user: updatedUser })
    }
  },
}))

export default useUserStore
