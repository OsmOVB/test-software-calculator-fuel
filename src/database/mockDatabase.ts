/**
 * Tipos de dados do formulário.
 * distance: number;
  consumption: number;
  fuelType: 'gasoline' | 'alcohol';
  fuelPrice: number;
 */
export interface FormData {
  distance: number;
  consumption: number;
  fuelType: 'gasoline' | 'alcohol';
  fuelPrice: number;
}

/**
 * Objeto mockado para armazenar dados em memória.
 */
const mockDatabase: { data: FormData[] } = {
  data: []
};

/**
 * Salva os dados no objeto mockado.
 * 
 * @param {FormData[]} data Dados a serem salvos.
 */
export const saveDataToMockDatabase = (data: FormData[]) => {
  mockDatabase.data = data;
};

/**
 * Obtém os dados do objeto mockado.
 * 
 * @returns {FormData[]} Dados armazenados.
 */
export const getDataFromMockDatabase = (): FormData[] => {
  return mockDatabase.data;
};
