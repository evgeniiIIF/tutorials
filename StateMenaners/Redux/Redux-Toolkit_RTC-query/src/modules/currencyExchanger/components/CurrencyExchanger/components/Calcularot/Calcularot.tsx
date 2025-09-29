import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomFormulaArgs, customFormulaRepository, CustomFormulaRepositoryKeys, DefaultFormulaArgs, defaultFormulaFn } from './Calculator.formulas';

interface CalculatorProps {
  symbol: string;
  price: number;
  fee: number;
  minAmount: number;
  maxAmount: number;
  formulaType: 'default' | 'custom';
  formulaId?: CustomFormulaRepositoryKeys;
}

type Inputs = {
  quote: number;
  base: number;
};

export const Calculator: FC<CalculatorProps> = ({ price, fee, formulaType, formulaId }) => {
  const calculateByFormula = (amount: number, price: number, fee: number) => {
    const defaultArgs: DefaultFormulaArgs = { amount, price, fee };
    const customArgs: CustomFormulaArgs = { amount, price, fee, discount: 10, some: 33 };

    if (formulaType === 'custom' && formulaId) {
      return customFormulaRepository[formulaId](customArgs);
    }
    return defaultFormulaFn(defaultArgs);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError, 
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('quote')); // watch input value by passing the name of it

  const minBaseValue = 0.1;
  const maxBaseValue = 10;

  // const clampValue = (value: number, min: number, max: number): number => {
  //   return Math.min(Math.max(value, min), max);
  // };
  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    // if (value < minBaseValue) {
    //   setError('quote', {
    //     type: 'manual',
    //     message: `Минимальное значение: ${minBaseValue}`,
    //   });
    // } else if (value > maxBaseValue) {
    //   setError('quote', {
    //     type: 'manual',
    //     message: `Максимальное значение: ${maxBaseValue}`,
    //   });
    // } else {
    //   clearErrors('quote');
    // }
    setValue('base', calculateByFormula(value, price, fee));
  };

  // Обработчик изменения значения для поля base
  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value < minBaseValue) {
      setError('base', {
        type: 'manual',
        message: `Минимальное значение: ${minBaseValue}`,
      });
    } else if (value > maxBaseValue) {
      setError('base', {
        type: 'manual',
        message: `Максимальное значение: ${maxBaseValue}`,
      });
    } else {
      clearErrors('base');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type='number'
          // defaultValue={minBaseValue}
          {...register('quote', {
            required: 'Это поле обязательно',
          })}
          onChange={handleQuoteChange}
        />
        {errors.quote && <span style={{ color: 'red' }}>{errors.quote.message}</span>}
      </div>

      <div>
        <input
          type='number'
          // defaultValue={minBaseValue}
          {...register('base', {
            required: 'Это поле обязательно',
          })}
          onChange={handleBaseChange}
        />
        {errors.base && <span style={{ color: 'red' }}>{errors.base.message}</span>}
      </div>

      <input type='submit' />
    </form>
  );
};
