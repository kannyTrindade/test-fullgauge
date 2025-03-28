import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchBar from './index';
import { useModalStore } from '../../store/modal';
import { usePaginationStore } from '../../store/pagination';
import { useUserStore } from '../../store/user';


vi.mock('../../store/user', () => ({
  useUserStore: vi.fn(),
}));

vi.mock('../../store/pagination', () => ({
  usePaginationStore: vi.fn(),
}));

describe('SearchBar Component', () => {
  const mockGenericSearch = vi.fn();
  const mockSetTotalPages = vi.fn();
  const mockHandleGenericSearch = vi.fn();
  const mockResetGenericSearch = vi.fn();
  const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];

  beforeEach(() => {
    vi.clearAllMocks();

    useUserStore.mockReturnValue({
      genericSearch: mockGenericSearch,
      users: mockUsers,
    });

    usePaginationStore.mockReturnValue({
      setTotalPages: mockSetTotalPages,
      handleGenericSearch: mockHandleGenericSearch,
      resetGenericSearch: mockResetGenericSearch
    });
  });

  it('renders the logo and search input', () => {
    render(<SearchBar />);

    const searchInput = screen.getByPlaceholderText(/buscar.../i);
    expect(searchInput).toBeInTheDocument();

    const svgElement = screen.getByTestId('Svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('calls handleGenericSearch when input changes', () => {
    render(<SearchBar />);

    const searchInput = screen.getByPlaceholderText(/buscar.../i);

    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockGenericSearch).toHaveBeenCalled();

    fireEvent.change(searchInput, { target: { value: '' } });
    
    expect(mockResetGenericSearch).toHaveBeenCalled();
  });
});