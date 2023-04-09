import { useNavigate } from '@solidjs/router';
import { fbLogoutUser } from '../../firebase/auth';

function Footer() {
  const navigate = useNavigate();
  const handleLogout = async (evt) => {
    evt.preventDefault();
    await fbLogoutUser();
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <a href="#" onClick={handleLogout}>Logout</a>
    </div>
  );
}

export { Footer };
