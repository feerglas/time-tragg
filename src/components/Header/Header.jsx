import { A, useNavigate } from '@solidjs/router';
import {
  createEffect, createSignal, Show, For,
} from 'solid-js';

import { fbLogoutUser, fbGetLoginState } from '../../firebase';
import styles from './Header.module.css';

const navLinks = [
  {
    href: '/add',
    title: 'Add',
  },
  {
    href: '/list',
    title: 'List',
  },
  {
    href: '/summary',
    title: 'Summary',
  },
];

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
        <For each={navLinks}>
          {(link) => (
            <li>
              <A activeClass={styles['item--active']} href={link.href}>{link.title}</A>
            </li>
          )
          }
        </For>
        <li>
          <a href="#" onClick={handleLogout}>Logout</a>
        </li>
      </ul >
    </Show>
  );
}

export { Header };
