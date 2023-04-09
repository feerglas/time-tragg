import { A } from '@solidjs/router';
import { Show, For } from 'solid-js';

import { useUid } from '../UidProvider/UidProvider.jsx';
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
  const [uid] = useUid();

  return (
    <Show when={uid()}>
      <ul>
        <For each={navLinks}>
          {(link) => (
            <li>
              <A activeClass={styles['item--active']} href={link.href}>{link.title}</A>
            </li>
          )
          }
        </For>
      </ul >
    </Show>
  );
}

export { Header };
