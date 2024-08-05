import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FuelForm from '../src/components/FuelForm';

test('should render form and submit with valid data', () => {
  const handleSubmit = jest.fn();
  render(<FuelForm onSubmit={handleSubmit} />);

  fireEvent.input(screen.getByLabelText(/Distância \(km\)/i), {
    target: { value: '100' },
  });
  fireEvent.input(screen.getByLabelText(/Consumo \(litros\/km\)/i), {
    target: { value: '0.1' },
  });
  fireEvent.change(screen.getByLabelText(/Tipo de Combustível/i), {
    target: { value: 'gasoline' },
  });
  fireEvent.input(screen.getByLabelText(/Preço do Combustível \(R\$\/litro\)/i), {
    target: { value: '5' },
  });

  fireEvent.submit(screen.getByRole('button', { name: /calcular/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    distance: 100,
    consumption: 0.1,
    fuelType: 'gasoline',
    fuelPrice: 5,
  });
});
