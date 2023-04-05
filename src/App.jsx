import styles from './App.module.css';
import SignInSignUp from './components/SignInSignUp/SignInSignUp.jsx';

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>time-tragg</h1>
      </header>
      <SignInSignUp />
    </div>
  );
}

export default App;
