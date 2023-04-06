import { Outlet, useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';
import { Header } from '../Header/Header.jsx';

function RouteGuard() {
  const navigate = useNavigate();
  const auth = false;

  createEffect(() => {
    if (!auth) {
      navigate('/signup', { replace: true });
    }
  });

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export { RouteGuard };
