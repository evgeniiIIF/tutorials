import { FC } from "react";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { increment, decrement, incrementByAmount } from "../../store/counter/counterSlice";
interface HomePageProps{}

export const HomePage:FC<HomePageProps>=({})=>{
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch();

  return <div>
    <h1>HomePage</h1>
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>Increment by 10</button>
    </div>
  </div>
}