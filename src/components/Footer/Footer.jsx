import { useNavigate } from '@solidjs/router';
import { Show } from 'solid-js';
import { fbLogoutUser } from '../../firebase/auth';
import { useUid } from '../UidProvider/UidProvider.jsx';
import { Icon } from '../Icon/Icon.jsx';
import styles from './Footer.module.scss';

function Footer() {
  const navigate = useNavigate();
  const [uid, email] = useUid();

  const handleLogout = async (evt) => {
    evt.preventDefault();
    await fbLogoutUser();
    navigate('/login', { replace: true });
  };

  return (
    <div class={styles.footer}>
      <Show when={email}>
        <span class={styles.mail}>{email()}</span>
      </Show>
      <Show when={uid()}>
        <a class={styles.link} href="#" onClick={handleLogout}>
          <Icon classes={styles.icon} name='logout' />
          <span class={styles.text}>Logout</span>
        </a>
      </Show>
    </div>
  );
}

export { Footer };
