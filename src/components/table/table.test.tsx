import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Table from './index';
import { useUserStore } from '../../store/user';
import { usePaginationStore } from '../../store/pagination';
import { useModalStore } from '../../store/modal';
import * as XLSX from 'xlsx';

const mockListUsers = vi.fn();
const mockSetTotalPages = vi.fn();
const mockHandlePage = vi.fn();
const mockToggleModal = vi.fn();
const mockClearForm = vi.fn();
const mockSetModalType = vi.fn();
const mockSetModalTitle = vi.fn();

vi.mock('../../store/user', () => ({
  useUserStore: vi.fn(),
}));

vi.mock('../../store/pagination', () => ({
  usePaginationStore: vi.fn(),
}));

vi.mock('../../store/modal', () => ({
  useModalStore: vi.fn(),
}));

vi.mock('xlsx', () => ({
  utils: {
    json_to_sheet: vi.fn(),
    book_new: vi.fn(),
    book_append_sheet: vi.fn(),
  },
  writeFile: vi.fn(),
}));

describe('Table Component', () => {
  beforeEach(() => {
    mockListUsers.mockClear();
    mockSetTotalPages.mockClear();
    mockHandlePage.mockClear();
    mockToggleModal.mockClear();
    mockClearForm.mockClear();
    mockSetModalType.mockClear();
    mockSetModalTitle.mockClear();

    useUserStore.mockReturnValue({
      listUsers: mockListUsers,
      filteredResults: [{ id: 1, first_name: 'João', last_name: 'Carlos', register_on: '2021/01/01' }],
      isLoading: false,
    });
    usePaginationStore.mockReturnValue({
      page: 1,
      pageSize: 20,
      totalPages: 2,
      handlePage: mockHandlePage,
      setTotalPages: mockSetTotalPages,
    });
    useModalStore.mockReturnValue({
      toggleModal: mockToggleModal,
      setModalType: mockSetModalType,
      setModalTitle: mockSetModalTitle,
      clearForm: mockClearForm,
    });
  });

  it('renders the Table component and displays users', async () => {
    render(<Table />);


    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Carlos')).toBeInTheDocument();
    expect(screen.getByText('2021/01/01')).toBeInTheDocument();
  });

  it('opens the modal when "Adicionar Usuário" button is clicked', async () => {
    render(<Table />);


    const addButton = screen.getByText('Adicionar Usuário');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockToggleModal).toHaveBeenCalled();
      expect(mockSetModalType).toHaveBeenCalledWith('Add');
      expect(mockSetModalTitle).toHaveBeenCalledWith('Adicionar Usuário');
      expect(mockClearForm).toHaveBeenCalled();
    });
  });

  it('handles pagination click correctly', async () => {
    render(<Table />);

    const pageTwoButton = screen.getByLabelText('Go to page 2');
    await fireEvent.click(pageTwoButton);

    expect(mockHandlePage).toHaveBeenCalled();
  });

  it('displays "Sem resultados disponíveis" if no users are found', async () => {
    useUserStore.mockReturnValue({
      listUsers: mockListUsers,
      filteredResults: [],
      isLoading: false,
    });

    render(<Table />);

    expect(screen.getByText('Sem resultados disponíveis')).toBeInTheDocument();
  });

  it('deve chamar a função exportToXLS ao clicar no botão de exportar', () => {
    // Renderizar o componente
    render(<Table />);

    // Simular o clique no botão de exportar
    const exportButton = screen.getByText('Exportar para Excel');
    fireEvent.click(exportButton);

    // Verificar se a função XLSX.writeFile foi chamada
    expect(XLSX.writeFile).toHaveBeenCalled(), 'usuarios.xlsx';
  });

  // Você também pode adicionar um teste para verificar se a função json_to_sheet é chamada
  it('deve chamar json_to_sheet quando exportar dados', () => {
    render(<Table />);

    const exportButton = screen.getByText('Exportar para Excel');
    fireEvent.click(exportButton);

    // Verificar se json_to_sheet foi chamado com os dados corretos
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalled();
  });
});
