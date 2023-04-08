/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';

import './index.css';
import App from './App.jsx';
import { UidProvider } from './components/UidProvider/UidProvider.jsx';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(
  () => (
    <Router>
      <UidProvider uid={false}>
        <App />
      </UidProvider>
    </Router>
  ),
  root,
);
