
import { create } from 'zustand'

type UiState = {
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
  selectedCount: number
  setSelectedCount: (c: number) => void
}

export const useUiStore = create<UiState>((set: any) => ({
  mobileOpen: false,
  setMobileOpen: (v: boolean) => set({ mobileOpen: v }),
  selectedCount: 0,
  setSelectedCount: (c: number) => set({ selectedCount: c }),
}))

export default useUiStore
