import { createBrowserRouter } from 'react-router';
import { DefaultLayout } from '../layouts/DefaultLayout/DefaultLayout';
import { MainPage } from '../pages/MainPage/MainPage';

export const router = createBrowserRouter([
  {
    path: "/",
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
    path: "*",
    element: <h1>404</h1>,
  },
]);
