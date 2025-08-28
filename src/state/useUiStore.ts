import { create } from 'zustand'
export const useUiStore = create<{ loginOpen: boolean; openLogin: () => void; closeLogin: () => void }>(set => ({ loginOpen: false, openLogin: () => set({ loginOpen: true }), closeLogin: () => set({ loginOpen: false }) }))
