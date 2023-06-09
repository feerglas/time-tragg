import { Routes, Route } from '@solidjs/router';
import { SignInSignUp } from './pages/SignInSignUp/SignInSignUp.jsx';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword.jsx';
import { Add } from './pages/Add/Add.jsx';
import { List } from './pages/List/List.jsx';
import { Summary } from './pages/Summary/Summary.jsx';
import { Header } from './components/Header/Header.jsx';
import { Footer } from './components/Footer/Footer.jsx';

import styles from './App.module.scss';

function App() {
  return (
    <div>
      <Header />

      <div class={styles.content}>
        <Routes>
          <Route path='/login' component={SignInSignUp} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/list' component={List} />
          <Route path='/summary' component={Summary} />
          <Route path='/add' component={Add} />
          <Route path='/' component={Add} />
          <Route path="*" element={() => <div>Page not found</div>} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
