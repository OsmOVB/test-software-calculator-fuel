import  { act }  from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('adds data and resets form', async () => {
    await act(async () => {
      render(<App />);
    });

    // Preenche os campos do formulário com gasolina
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Distância \(km\)/i), { target: { value: '100' } });
      fireEvent.change(screen.getByLabelText(/Consumo \(km\/l\)/i), { target: { value: '10' } });
      fireEvent.change(screen.getByLabelText(/Preço do Combustível \(R\$\/litro\)/i), { target: { value: '5' } });
      fireEvent.click(screen.getByText(/Adicionar/i));
    });

    // Preenche os campos do formulário com álcool
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Consumo \(km\/l\)/i), { target: { value: '8' } });
      fireEvent.change(screen.getByLabelText(/Preço do Combustível \(R\$\/litro\)/i), { target: { value: '4' } });
      fireEvent.click(screen.getByText(/Adicionar/i));
    });

    // Verifica se os dados foram adicionados à lista
    expect(screen.getByText(/100 km, 10 km\/l, gasolina, R\$ 5\/litro - Custo: R\$ 50.00/i)).toBeInTheDocument();
    expect(screen.getByText(/100 km, 8 km\/l, álcool, R\$ 4\/litro - Custo: R\$ 50.00/i)).toBeInTheDocument();

    // Verifica a exibição dos resultados
    expect(screen.getByText(/Gasolina é mais vantajoso!/i)).toBeInTheDocument();

    // Verifica a presença do texto "Álcool" nos lugares específicos
    const alcoholOptions = screen.getAllByRole('option', { name: /Álcool/i });
    const alcoholListItems = screen.getAllByText(/100 km, 8 km\/l, álcool, R\$ 4\/litro - Custo: R\$ 50.00/i);
    const alcoholCards = screen.getAllByText(/Álcool/i).filter((element) => element.tagName === 'H3');

    expect(alcoholOptions).toHaveLength(1);
    expect(alcoholListItems).toHaveLength(1);
    expect(alcoholCards).toHaveLength(1);

    // Reseta o formulário
    await act(async () => {
      fireEvent.click(screen.getByText(/Novo Cálculo/i));
    });

    // Verifica se os campos do formulário foram resetados
    expect((screen.getByLabelText(/Distância \(km\)/i) as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText(/Consumo \(km\/l\)/i) as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText(/Preço do Combustível \(R\$\/litro\)/i) as HTMLInputElement).value).toBe('');
 });
});
