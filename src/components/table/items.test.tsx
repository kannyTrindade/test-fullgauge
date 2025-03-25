import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TableItems from './items'; 
import { useModalStore } from '../../store/modal';
import userEvent from '@testing-library/user-event';

const mockToggleModal = vi.fn();
const mockSetModalType = vi.fn();
const mockSetModalTitle = vi.fn();
const mockSetUserProps = vi.fn();

vi.mock("../../store/modal", () => ({
  useModalStore: vi.fn(() => ({
    modalType: "Add",
    idUser: null,
    firstName: "",
    lastName: "",
    toggleModal: mockToggleModal,
    setModalType: mockSetModalType,
    setModalTitle: mockSetModalTitle,
    setUserProps: mockSetUserProps,
    clearForm: vi.fn(),
  })),
}));

describe("TableItems", () => {
    beforeEach(() => {
        mockToggleModal.mockClear();
        mockSetModalType.mockClear();
        mockSetModalTitle.mockClear();
        mockSetUserProps.mockClear();
      });
    it('renders user data and buttons', () => {
    const user = {
        id: 1,
        first_name: 'João',
        last_name: 'Carlos',
        register_on: '2021/01/01',
    };

    render(<TableItems props={user} key={user.id} />);

    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Carlos')).toBeInTheDocument();
    expect(screen.getByText('2021/01/01')).toBeInTheDocument();

    expect(screen.getByTestId('editButton')).toBeInTheDocument();
    expect(screen.getByTestId('deleteButton')).toBeInTheDocument();
    });

    it('calls handleClickModalDelete when delete button is clicked', async () => {
        const user = {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          register_on: '2025/03/24',
        };
    
        render(<TableItems props={user} key={user.id} />);
        const deleteButton = screen.getByTestId('deleteButton');
    
        await userEvent.click(deleteButton);
    
        expect(mockToggleModal).toHaveBeenCalled();
        expect(mockSetModalType).toHaveBeenCalledWith('Delete'); 
        expect(mockSetUserProps).toHaveBeenCalledWith(user.first_name, user.last_name, user.id);
      });

      it('calls handleClickModalEdit when edit button is clicked', async () => {
        const user = {
          id: 1,
          first_name: 'Maria',
          last_name: 'Lucia',
          register_on: '2021/01/01',
        };
    
        render(<TableItems props={user} key={user.id} />);
        const editButton = screen.getByTestId('editButton');
    
        await userEvent.click(editButton);
    
        expect(mockToggleModal).toHaveBeenCalled();
        expect(mockSetModalType).toHaveBeenCalledWith('Edit');  
        expect(mockSetModalTitle).toHaveBeenCalledWith('Editar Usuário'); 
        expect(mockSetUserProps).toHaveBeenCalledWith(user.first_name, user.last_name, user.id); 
      });
});