import { Routes, Route } from '@solidjs/router';
import { SignInSignUp } from './pages/SignInSignUp/SignInSignUp.jsx';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword.jsx';
import { AddTime } from './pages/AddTime/AddTime.jsx';
import { Header } from './components/Header/Header.jsx';
import { RouteGuard } from './components/RouteGuard/RouteGuard.jsx';

import styles from './App.module.css';

function App() {
  return (
    <div class={styles.App}>
      <Header />

      <Routes>
        <Route path='/login' component={SignInSignUp} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/' component={RouteGuard}>
          <Route path='/' component={AddTime} />
        </Route>
        <Route path="*" element={() => <div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
