import { createBrowserRouter, redirect } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { HomePage } from './pages/HomePage/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

    ],
  },

  {
    path: '*',
    element: <h1>404 NOTHING</h1>,
  },
]);
