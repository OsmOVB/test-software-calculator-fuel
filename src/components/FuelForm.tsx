import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

/**
 * Tipos de entrada para o formulário de combustível.
 */
interface FuelFormInputs {
  distance: number;
  consumption: number;
  fuelType: 'gasolina' | 'álcool';
  fuelPrice: number;
}

/**
 * Propriedades do componente FuelForm.
 */
interface FuelFormProps {
  onAdd: (data: FuelFormInputs) => void;
  initialFuelType?: 'gasolina' | 'álcool';
  initialDistance?: number;
  disabled?: boolean;
}

/**
 * Componente FuelForm
 * 
 * Formulário para entrada de dados relacionados ao cálculo do custo de combustível.
 * 
 * @param {FuelFormProps} props Propriedades do componente.
 * @returns JSX.Element
 */
const FuelForm: React.FC<FuelFormProps> = ({ onAdd, initialFuelType = 'gasolina', initialDistance = 0, disabled = false }) => {
  const [fuelType, setFuelType] = useState<'gasolina' | 'álcool'>(initialFuelType);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FuelFormInputs>({
    defaultValues: {
      distance: initialDistance,
      fuelType: initialFuelType,
      consumption: 0,
      fuelPrice: 0
    }
  });

  useEffect(() => {
    setFuelType(initialFuelType);
    setValue('fuelType', initialFuelType);
    setValue('distance', initialDistance);
    setValue('consumption', 0);
    setValue('fuelPrice', 0);
  }, [initialFuelType, initialDistance, setValue]);

  const submitHandler: SubmitHandler<FuelFormInputs> = data => {
    onAdd(data);
    if (data.fuelType === 'gasolina') {
      setFuelType('álcool');
      reset({
        distance: data.distance,
        fuelType: 'álcool',
        consumption: 0,
        fuelPrice: 0
      });
    } else {
      reset({
        distance: initialDistance,
        fuelType: 'gasolina',
        consumption: 0,
        fuelPrice: 0
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label htmlFor="distance">Distância (km):</label>
        <input
          id="distance"
          {...register('distance', 
            { required: "Insira uma distância válida.", 
              min: { value: 0.1, message: "A distância deve ser maior que 0.1" },
              max: { value: 999999, message: "A distância deve ser menor que 99999 km" }
            })}
          type="number"
          step="any"
          disabled={fuelType === 'álcool' && !disabled} // Permite a entrada de distância para novo cálculo
        />
        {errors.distance && <span>{errors.distance.message}</span>}
      </div>
      <div>
        <label htmlFor="consumption">Consumo (km/l):</label>
        <input
          id="consumption"
          {...register('consumption', { 
            required: "Insira um consumo válido.",
             min: { value: 0.1, message: "O consumo deve ser maior que 0.1" }, 
            max: { value: 999.9, message: "O consumo deve ser menor que 999.9 km/l" }
            })}
          type="number"
          step="any"
          disabled={disabled}
        />
        {errors.consumption && <span>{errors.consumption.message}</span>}
      </div>
      <div>
        <label htmlFor="fuelType">Tipo de Combustível:</label>
        <select id="fuelType" {...register('fuelType')} disabled>
          <option value="gasolina">Gasolina</option>
          <option value="álcool">Álcool</option>
        </select>
      </div>
      <div>
        <label htmlFor="fuelPrice">Preço do Combustível (R$/litro):</label>
        <input
          id="fuelPrice"
          {...register('fuelPrice', { 
            required: "Insira um preço válido.", 
            min: { value: 0.01, message: "O preço deve ser maior que 0.01" }, 
            max: { value: 999.99, message: "O preço deve ser menor que 999.99 R$/litro" }
          })}
          type="number"
          step="any"
          disabled={disabled}
        />
        {errors.fuelPrice && <span>{errors.fuelPrice.message}</span>}
      </div>
      <button type="submit" disabled={disabled}>Adicionar</button>
    </form>
  );
};

export default FuelForm;
