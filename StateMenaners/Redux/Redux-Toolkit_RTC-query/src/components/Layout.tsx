import { FC } from 'react';
import { Link, Outlet } from 'react-router';

export const Layout: FC = () => {
  return (
    <div className='layout'>
      <header>
        <Link to='/'>Home</Link>
      </header>
      <Outlet />
    </div>
  );
};
