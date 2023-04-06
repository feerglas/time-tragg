import { Outlet, useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';
import { fbGetLoginState } from '../../firebase';

function RouteGuard() {
  const navigate = useNavigate();

  createEffect(() => {
    fbGetLoginState((uid) => {
      if (!uid) {
        navigate('/login', { replace: true });
      }
    });
  });

  return (
    <>
      <Outlet />
    </>
  );
}

export { RouteGuard };
