import {
  Match, Switch, createSignal, createEffect,
} from 'solid-js';
import styles from './Icon.module.scss';

function Icon(props) {
  const [classes, setClasses] = createSignal(styles['c-icon']);

  createEffect(() => {
    if (props.classes) {
      setClasses(`${styles['c-icon']} ${props.classes}`);
    }
  });

  return (
    /* eslint-disable solid/self-closing-comp */
    <Switch fallback={null}>
      <Match when={props.name === 'delete'}>
        <svg width='24px' height='24px' viewBox='0 0 24 24' class={classes()}><g strokeWidth='1' fill='none'><polygon points='2.5 23.5 18.5 23.5 18.5 3.5 2.5 3.5'></polygon><polygon points='6.5 3.5 14.5 3.5 14.5 0.5 6.5 0.5'></polygon><path d='M0,3.5 L22,3.5'></path><path d='M6.5,7 L6.5,19'></path><path d='M10.5,7 L10.5,19'></path><path d='M14.5,7 L14.5,19'></path></g></svg>
      </Match>
      <Match when={props.name === 'plus'}>
        <svg width='23px' height='23px' viewBox='0 0 23 23' class={classes()}><g strokeWidth='1' fill='none'><path d='M11.5,0.5 L11.5,22.5'></path><path d='M22.5,11.5 L0.5,11.5'></path></g></svg>
      </Match>
      <Match when={props.name === 'warning'}>
        <svg width='23px' height='23px' viewBox='0 0 23 23' class={classes()}><g strokeWidth='1' fill='none'><path d='M11.5,15.8057 L11.5,8.1537' strokeLinecap='round'></path><polygon strokeLinecap='round' points='22.5 22.5 0.5 22.5 11.5 0.5'></polygon><path d='M12,19 C12,19.276 11.776,19.5 11.5,19.5 C11.224,19.5 11,19.276 11,19 C11,18.724 11.224,18.5 11.5,18.5 C11.776,18.5 12,18.724 12,19 L12,19 Z'></path></g></svg>
      </Match>
      <Match when={props.name === 'average'}>
        <svg width='24px' height='24px' viewBox='0 0 24 24' class={classes()}><g strokeWidth='1' fill='none'><circle cx='12' cy='12' r='9.5'></circle><path d='M2.5,21.5 L21.5262976,2.47370241' strokeLinecap='square'></path></g></svg>
      </Match>
      <Match when={props.name === 'sum'}>
        <svg width='20px' height='24px' viewBox='0 0 20 24' class={classes()}><g strokeWidth='1' fill='none'><polyline points='20 0.5 0.542 0.5 13.504 12 0.542 23.5 20 23.5'></polyline></g></svg>
      </Match>
      <Match when={props.name === 'login'}>
        <svg width='24px' height='22px' viewBox='0 0 24 22' class={classes()}><g strokeWidth='1' fill='none'><polyline points='13.5 17.5 13.5 21.5 0.5 21.5 0.5 0.5 13.5 0.5 13.5 4.5'></polyline><path d='M23.5,11.5 L5.5,11.5'></path><polyline points='10.5 16.5 5.5 11.5 10.5 6.5'></polyline></g></svg>
      </Match>
      <Match when={props.name === 'logout'}>
        <svg width='22px' height='23px' viewBox='0 0 22 23' class={classes()}><g strokeWidth='1' fill='none'><polyline points='13.5 18.5205 13.5 21.4995 0.5 21.4995 0.5 0.4995 13.5 0.4995 13.5 4.4995'></polyline><path d='M4.5,11.5 L21.5,11.5'></path><polyline points='16.5 6.4922 21.5 11.4922 16.5 16.4922'></polyline></g></svg>
      </Match>
      <Match when={props.name === 'plus2'}>
        <svg width='23px' height='23px' viewBox='0 0 23 23' class={classes()}><g strokeWidth='1' fill='none'><path d='M11.5,0.5 L11.5,22.5'></path><path d='M22.5,11.5 L0.5,11.5'></path></g></svg>
      </Match>
      <Match when={props.name === 'workouts'}>
        <svg width='23px' height='21px' viewBox='0 0 23 21' class={classes()}><g strokeWidth='1' fill='none'><path d='M11.5,4 C11.5,2.066 16.648,0.5 22.5,0.5 L22.5,17 C16.648,17 11.5,18.566 11.5,20.5 C11.5,18.566 6.351,17 0.5,17 L0.5,0.5 C6.351,0.5 11.5,2.066 11.5,4 L11.5,4 Z'></path><path d='M11.5,4 L11.5,20.375'></path><path d='M9,6.2402 C7.39,5.6232 5.113,5.1772 2.5,5.0002'></path><path d='M9,9.2402 C7.39,8.6232 5.113,8.1772 2.5,8.0002'></path><path d='M9,12.2402 C7.39,11.6232 5.113,11.1772 2.5,11.0002'></path><path d='M9,15.2402 C7.39,14.6232 5.113,14.1772 2.5,14.0002'></path><path d='M14,6.2402 C15.61,5.6232 17.887,5.1772 20.5,5.0002'></path><path d='M14,9.2402 C15.61,8.6232 17.887,8.1772 20.5,8.0002'></path><path d='M14,12.2402 C15.61,11.6232 17.887,11.1772 20.5,11.0002'></path><path d='M14,15.2402 C15.61,14.6232 17.887,14.1772 20.5,14.0002'></path></g></svg>
      </Match>
      <Match when={props.name === 'chevron-left'}>
        <svg class={`${classes()}  ${styles['c-icon--filled']}`} width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>
      </Match>
      <Match when={props.name === 'chevron-right'}>
        <svg class={`${classes()} ${styles['c-icon--filled']}`} width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
      </Match>
    </Switch>
    /* eslint-enable solid/self-closing-comp */
  );

}

export { Icon };
