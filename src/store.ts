import { create } from 'zustand'

export const useStore = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state: { bears: number }) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears: number) => set({ bears: newBears }),

    playlistID: null,
    setPlaylistID: (newPlaylistID: string) => set({ playlistID: newPlaylistID }),
}))

type State = {
    playlistId: string | null
}

type Action = {
    updatePlaylistId: (playlistId: State['playlistId']) => void
}


export const usePlaylistStore = create<State & Action>((set) => ({
    playlistId:  "PLgBV6dl98LOFDeCAT_guiQAzVRhPJfLMi",
    updatePlaylistId: (playlistId) => set(() => ({ playlistId: playlistId })),
}))