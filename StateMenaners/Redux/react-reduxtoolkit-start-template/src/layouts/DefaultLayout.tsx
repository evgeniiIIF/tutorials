import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './DefaultLayout.scss';

interface IDefaultLayoutProps {}

export const DefaultLayout: FC<IDefaultLayoutProps> = (props) => {
  return (
    <>
      <header className='header'>
        <h1>
          <Link to='/'>Справочники</Link>
        </h1>
      </header>
      <main className='main'>
        <Outlet />
      </main>
    </>
  );
};
