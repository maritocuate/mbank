import { Transaction } from '@/interfaces'
import { create } from 'zustand'

interface TransactionState {
  transactions: Transaction[]
  setTransactions: (transaction: Transaction[]) => void
  clearTransactions: () => void
}

const useTransactionStore = create<TransactionState>()(set => ({
  transactions: [],
  setTransactions: transactions => set({ transactions }),
  clearTransactions: () => set({ transactions: [] }),
}))

export default useTransactionStore
