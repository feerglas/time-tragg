import { Show, For } from 'solid-js';

export function TextInput(props) {
  return (
    <label
      classList={{
        'is-invalid': !!props.control.errors,
        'is-touched': props.control.isTouched,
        'is-required': props.control.isRequired,
      }}
    >
      <span>{props.label}</span>

      <input
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
        <For each={Object.values(props.control.errors)}>
          {(errorMsg) => <small>{errorMsg}</small>}
        </For>
      </Show>
    </label>
  );
}
