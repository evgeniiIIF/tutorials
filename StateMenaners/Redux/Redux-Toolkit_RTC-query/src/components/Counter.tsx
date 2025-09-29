import { ChangeEvent, FormEvent, useState } from 'react';
import { counterSelector } from '../store/counter/slice';
import { useActions, useAppSelector } from '../store/hooks';

export function Counter() {
  const count = useAppSelector(counterSelector);
  const { increment, decrement, incrementByAmount } = useActions();
  
  const [amount, setAmount] = useState<number>(0);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    incrementByAmount(amount);
  };

  return (
    <div>
      <h2>Using only Redux Toolkit counter State</h2>
      <div>
        <button aria-label='Decrement value' onClick={() => decrement()}>
          Decrement
        </button>
        <span>{count}</span>
        <button aria-label='Increment value' onClick={() => increment()}>
          Increment
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input name='amount' value={amount} onInput={(e: ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value ?? 0))} />
      </form>
    </div>
  );
}
