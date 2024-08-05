import fs from 'fs';
import path from 'path';

/**
 * Tipos de dados do formulário.
 */
interface FormData {
  distance: number;
  consumption: number;
  fuelType: 'gasoline' | 'alcohol' | 'diesel';
  fuelPrice: number;
}

/**
 * Salva os dados em um arquivo JSON.
 * 
 * @param {FormData[]} data Dados a serem salvos.
 */
export const saveDataToFile = (data: FormData[]) => {
  const filePath = path.resolve(__dirname, 'data.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};
