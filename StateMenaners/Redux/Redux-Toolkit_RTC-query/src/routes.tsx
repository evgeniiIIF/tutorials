import { createBrowserRouter } from 'react-router';
import { Posts } from './components/Posts';
import { Layout } from './components/Layout';
// import { Counter } from './components/Counter';
import { Post } from './components/Post';
import { CurrencyExchanger } from './modules/currencyExchanger/components/CurrencyExchanger/CurrencyExchanger';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Posts />,
      },
      {
        path: 'post/:postId',
        element: <Post />,
      },
      {
        path: '/calc',
        element: <CurrencyExchanger/>
      }
    ],
  },
  // {
  //   path: "b/:bucketId/*",
  //   element: <BucketFilesPage />,
  // },
  // {
  //   path: "*",
  //   element: <h1>404</h1>,
  // },
]);
