import { AppDispatch, RootState } from '.';
import { useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

import { bindActionCreators } from '@reduxjs/toolkit';
import { decrement, increment, incrementByAmount } from './counter/slice';

const createActions = {
  increment,
  decrement,
  incrementByAmount,
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(createActions, dispatch);
};
