import { A, useNavigate } from '@solidjs/router';
import { createEffect, createSignal, Show } from 'solid-js';

import { fbLogoutUser, fbGetLoginState } from '../../firebase';
import styles from './Header.module.css';

function Header() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = createSignal(true);

  createEffect(() => {
    fbGetLoginState((uid) => {
      if (!uid) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    });
  });

  const handleLogout = async (evt) => {
    evt.preventDefault();

    await fbLogoutUser();

    navigate('/login', { replace: true });
  };

  return (
    <Show when={loggedIn()}>
      <ul>
        <li>
          <A activeClass={styles['item--active']} href="/add">add</A>
        </li>
        <li>
          <A activeClass={styles['item--active']} href="/list">list</A>
        </li>
        <li>
          <A activeClass={styles['item--active']} href="/summary">summary</A>
        </li>
        <li>
          <a href="#" onClick={handleLogout}>Logout</a>
        </li>
      </ul >
    </Show>
  );
}

export { Header };
