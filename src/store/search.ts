import { create } from 'zustand';

type SearchState = {
    searchTerms: string,
    clearSearch: () => void,
    setSearch: (term: string) => void,
}

export const useSearchStore = create<SearchState>((set) =>({
    searchTerms: '',
    clearSearch: () => set((state) => ({searchTerms: ''})),
    setSearch: (text: string) => set((state) => ({searchTerms: text}))
}));