import { FC, useEffect, useState } from 'react';
import { PairListItem, useGetFeeQuery, useGetPriceQuery, useGetSymbolsQuery } from '../../../../store/api/symbols';
import { PairSelect } from './components/PairSelect';
import { skipToken } from '@reduxjs/toolkit/query';
import { Calculator } from './components/Calcularot/Calcularot';
import { lisova } from './lisova';

export const CurrencyExchanger: FC = () => {
  const [selectedPair, setSelectedPair] = useState<PairListItem>();

  const { data: pairs, isFetching: isFetchingPairs, error: pairsError } = useGetSymbolsQuery();
  const { data: price, isFetching: isFetchingPrice, error: priceError } = useGetPriceQuery(selectedPair?.symbol ?? skipToken);
  const { data: fee, isFetching: isFetchingFee, error: feeError } = useGetFeeQuery(selectedPair?.symbol ?? skipToken);

  // const formulaFn = useMemo<FormulaFn<FormulaArgs>>(() => {
  //   if (selectedPair?.formula_type === 'custom' && selectedPair.formula_id) {
  //     return customFormulaRepository[selectedPair.formula_id] as FormulaFn<FormulaArgs>;
  //   }
  //   return defaultFormulaFn as FormulaFn<FormulaArgs>;
  // }, [selectedPair]);

  useEffect(() => {
    console.log(selectedPair);
    lisova();
    // const fn = formulaRepository;
    // setFormulaFn();
  }, [selectedPair]);

  // useEffect(() => {
  //   console.log(selectedPair);
  // }, [selectedPair, price, fee]);

  if (isFetchingPrice || isFetchingPairs || isFetchingFee) {
    return <h2>...Loading</h2>;
  }

  if (pairsError || priceError || feeError) {
    return <h2>Произошла ошибка при загрузке данных</h2>;
  }

  if (!pairs) {
    return <h2>Данные не загружены</h2>;
  }

  return (
    <div className='CurrencyExchanger'>
      <PairSelect pairs={pairs} selectPair={setSelectedPair} selectedPair={selectedPair} />
      {price && fee && selectedPair && (
        <Calculator symbol={selectedPair.symbol} formulaType={selectedPair.formula_type} formulaId={selectedPair.formula_id} price={Number(price.price)} fee={Number(fee.fee)} />
      )}
    </div>
  );
};
