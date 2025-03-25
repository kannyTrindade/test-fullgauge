import { create } from "zustand";

type ModalState = {
  isOpen: boolean,
  modalType: string,
  modalTitle: string,
  firstName: string,
  lastName: string,
  idUser: string,
}

const initialState = {
  modalTitle: '',
  idUser: '',
  firstName: '',
  lastName: '',
}

type ModalActions = {
  toggleModal: () => void,
  setModalType: (type: string) => void,
  setModalTitle: (modalTitle: string) => void,
  setUserProps: (firstName: string, lastName: string, idUser: string) => void;
  updateFirstName: (firstName: ModalState['firstName']) => void,
  updateLastName: (lastName: ModalState['lastName']) => void,
  clearForm: () => void,
}

export const useModalStore = create<ModalState & ModalActions>((set) =>({
  isOpen: false,
  modalType: '',
  modalTitle: '',
  idUser: '',
  firstName: '',
  lastName: '',
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  setModalType: (type: string) => set((state) => ({modalType: type})),
  setModalTitle: (modalTitle: string) => set((state) => ({modalTitle: modalTitle})),
  setUserProps: (firstName: string, lastName: string, idUser: string) => set((state) => ({firstName: firstName, lastName: lastName, idUser: idUser})),
  updateFirstName: (firstName: string) => set(() => ({ firstName: firstName })),
  updateLastName: (lastName: string) => set(() => ({ lastName: lastName })),
  clearForm: () => set(initialState),
}));