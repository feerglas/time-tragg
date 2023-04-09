import { useNavigate } from '@solidjs/router';
import { Show } from 'solid-js';
import { fbLogoutUser } from '../../firebase/auth';
import { useUid } from '../UidProvider/UidProvider.jsx';

function Footer() {
  const navigate = useNavigate();
  const [uid] = useUid();

  const handleLogout = async (evt) => {
    evt.preventDefault();
    await fbLogoutUser();
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <Show when={uid()}>
        <a href="#" onClick={handleLogout}>Logout</a>
      </Show>
    </div>
  );
}

export { Footer };
