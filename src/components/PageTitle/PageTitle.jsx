import styles from './PageTitle.module.scss';

function PageTitle(props) {
  return (
    <h1 class={styles.title}>{props.text}</h1>
  );
}

export { PageTitle };
