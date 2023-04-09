import { A } from '@solidjs/router';
import { Show, For } from 'solid-js';

import { Icon } from '../Icon/Icon.jsx';
import { useUid } from '../UidProvider/UidProvider.jsx';
import styles from './Header.module.scss';

const navLinks = [
  {
    href: '/add',
    icon: 'plus',
  },
  {
    href: '/list',
    icon: 'workouts',
  },
  {
    href: '/summary',
    icon: 'sum',
  },
];

function Header() {
  const [uid] = useUid();

  return (
    <Show when={uid()}>
      <ul class={styles.list}>
        <For each={navLinks}>
          {(link) => (
            <li class={styles.item}>
              <A class={styles.link} activeClass={styles['link--active']} href={link.href}>
                <Icon name={link.icon} />
              </A>
            </li>
          )
          }
        </For>
      </ul >
    </Show>
  );
}

export { Header };
