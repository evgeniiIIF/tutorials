import { FC } from 'react';
import { PairListItem } from '../../../../../store/api/symbols';

interface PairSelectProps {
  pairs: PairListItem[];
  selectedPair?: PairListItem;
  selectPair: (pair: PairListItem) => void;
}

export const PairSelect: FC<PairSelectProps> = ({ pairs, selectedPair, selectPair }) => {
  const select = (symbol: string) => {
    const result = pairs.find((pair) => pair.symbol === symbol);
    if (result) {
      selectPair(result);
    }
  };

  return (
    <div className='CurrencyExchanger-list'>
      <select onChange={(e) => select(e.target.value)} value={selectedPair?.symbol ?? ''} className='currency-select__select'>
        <option value=''>Выберите пару</option>
        {pairs.map((pair) => (
          <option key={pair.symbol} value={pair.symbol}>
            {pair.base}/{pair.quote}
          </option>
        ))}
      </select>
    </div>
  );
};
