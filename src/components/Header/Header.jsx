import { A, useNavigate } from '@solidjs/router';
import { fbLogoutUser } from '../../firebase';

function Header() {
  const navigate = useNavigate();

  const handleLogout = async (evt) => {
    evt.preventDefault();

    await fbLogoutUser();

    navigate('/login', { replace: true });
  };

  return (
    <ul>
      <li>
        <A href="/">add</A>
      </li>
      <li>
        <A href="/list">list</A>
      </li>
      <li>
        <A href="/summary">summary</A>
      </li>
      <li>
        <a href="#" onClick={handleLogout}>logout</a>
      </li>
    </ul>
  );
}

export { Header };
