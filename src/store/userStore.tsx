import { Account } from '@/interfaces'
import { create } from 'zustand'

interface AccountState {
  user: Account | null
  setUser: (user: Account) => void
  clearUser: () => void
}

const useUserStore = create<AccountState>()(set => ({
  user: null,
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
}))

export default useUserStore
