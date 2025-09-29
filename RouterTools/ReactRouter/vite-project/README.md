# Внедрение React Router в проект

## Установка

```bash
npm i react-router
```

Ссылка на документацию - https://reactrouter.com/start/data/installation

## Создание файлов

1. Создать компоненты Lauouts в папке /src/layouts.

```tsx
import type { FC } from 'react';
import { Outlet } from 'react-router';

export const DefaultLayout: FC = () => {
  return (
    <>
      <header>header</header>
      <main>
        {' '}
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
};
```


2. Создать файл роутера по пути **./src/router/router.tsx**

```tsx
import { createBrowserRouter } from 'react-router';
import { DefaultLayout } from '../layouts/DefaultLayout/DefaultLayout';
import { MainPage } from '../pages/MainPage/MainPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      // {
      //   path: "buckets/:bucketId",
      //   element: <BucketFilesPage />,
      // },
    ],
  },
  // {
  //   path: "/secondary",
  //   element: <SecondaryLayout />,
  //   children: [
  //     {
  //       path: "b/:bucketId/*",
  //       element: <BucketFilesPage />,
  //     },
  //     {
  //       path: "f/:bucketId/*",
  //       element: <FilePage />,
  //     },
  //   ],
  // },
  {
    path: '*',
    element: <h1>404</h1>,
  },
]);
```

3. Подключить роутер-провайдер в компоненте App:

```tsx
import './App.scss';
import { RouterProvider } from 'react-router';
import { router } from './router/router';

function App() {
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
```

