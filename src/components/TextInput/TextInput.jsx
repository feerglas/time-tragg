import { Show } from 'solid-js';
import styles from './TextInput.module.scss';

export function TextInput(props) {
  return (
    <label
      class={`${styles.wrapper} ${props.class}`}
      classList={{
        'is-invalid': !!props.control.errors,
        'is-touched': props.control.isTouched,
        'is-required': props.control.isRequired,
      }}
    >
      <span class={styles.label}>{props.label}</span>

      <input
        class={styles.input}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder || ''}
        value={props.control.value}
        onInput={(evt) => {
          props.control.setValue(evt.currentTarget.value || null);
        }}
        onBlur={() => {
          props.control.markTouched(true);
        }}
        required={props.control.isRequired}
      />

      <Show when={props.control.isTouched && !props.control.isValid}>
        <span class={styles.error}>{props.control.errors.message}</span>
      </Show>
    </label>
  );
}
