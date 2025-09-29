import { RouterProvider } from 'react-router';
import './App.css';
import { router } from './routes';
import { useEffect } from 'react';
import { lisova } from './modules/currencyExchanger/components/CurrencyExchanger/lisova';
// import { Counter } from './components/Counter';
// import { Posts } from './components/Posts';

function App() {
  useEffect(() => {
    lisova();
  }, []);

  return (
    <div className='app'>
      {/* <Layout/> */}
      {/* <Counter />
      <Posts/> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
