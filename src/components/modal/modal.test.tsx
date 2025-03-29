import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ModalComponent from './index'; 
import { useModalStore } from '../../store/modal';

vi.mock("../../store/modal", () => ({
  useModalStore: vi.fn(() => ({
      modalType: "Add",
      idUser: null,
      firstName: "",
      lastName: "",
      toggleModal: vi.fn(),
      clearForm: vi.fn(),
      useModalStore: vi.fn(),
  })),
}));

vi.mock('../../store/modal', () => ({
  useModalStore: vi.fn(),
}));

describe('ModalComponent', () => {
  it('should display the modal when isOpen is true', () => {
    useModalStore.mockReturnValue({
      isOpen: true,
      modalTitle: 'Test Modal',
      toggleModal: vi.fn(),
      modalType: 'Edit',
      firstName: 'John',
      lastName: 'Doe',
      idUser: 1,
      updateFirstName: vi.fn(),
      updateLastName: vi.fn(),
      clearForm: vi.fn(),
    });

    render(<ModalComponent />);

    expect(screen.getByText('Test Modal')).toBeInTheDocument();

    expect(screen.getByTestId('closeBtn')).toBeInTheDocument();

    screen.debug();
  });

  it('should not display the modal when isOpen is false', () => {
    useModalStore.mockReturnValue({
      isOpen: false,
      modalTitle: 'Test Modal',
      toggleModal: vi.fn(),
      modalType: 'Edit',
      firstName: 'John',
      lastName: 'Doe',
      idUser: 1,
      updateFirstName: vi.fn(),
      updateLastName: vi.fn(),
      clearForm: vi.fn(),
    });

    render(<ModalComponent />);

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });
});
