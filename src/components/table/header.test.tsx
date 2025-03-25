import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import TableHeader from './header'; 

it('renders the table header with correct column names', () => {
  render(<TableHeader />);

  expect(screen.getByText('Nome')).toBeInTheDocument();
  expect(screen.getByText('Sobrenome')).toBeInTheDocument();
  expect(screen.getByText('Data de Registro')).toBeInTheDocument();
});