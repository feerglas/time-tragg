import { Routes, Route } from '@solidjs/router';
import { SignInSignUp } from './pages/SignInSignUp/SignInSignUp.jsx';
import { AddTime } from './pages/AddTime/AddTime.jsx';
import { RouteGuard } from './components/RouteGuard/RouteGuard.jsx';

import styles from './App.module.css';

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>time-tragg</h1>
      </header>

      <Routes>
        <Route path='/signup' component={SignInSignUp} />
        <Route path='/' component={RouteGuard}>
          <Route path='/' component={AddTime} />
        </Route>
        <Route path="*" element={() => <div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
