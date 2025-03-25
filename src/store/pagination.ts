import { create } from "zustand";

type PaginationState = {
  page: number,
  pageSize: number,
  totalPages: number,
}

type PaginationActions = {
    handlePage: (page: number) => void,
    handlePageSizeChange: () => void,
    setTotalPages: (size: number) => void,
}  

export const usePaginationStore = create<PaginationState & PaginationActions>((set) =>({
    page: 1,
    pageSize: 5,
    totalPages: 1,
    handlePage: (page: number) => set((state) => ({page : page })),
    handlePageSizeChange: () => set((state) => ({pageSize: state.pageSize})),
    setTotalPages: (size: number) => set((state) => ({totalPages: Math.ceil(size / state.pageSize)}))
}));