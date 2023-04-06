import { For } from 'solid-js';
import { Radio } from '../Radio/Radio.jsx';

function RadioGroup(props) {

  return (
    <For each={props.radios}>
      {(radio) => (
        <Radio
          id={radio.id}
          name={props.name}
          value={radio.value}
          label={radio.label}
          checked={radio.checked}
          onChange={props.handleChange}
        />
      )}
    </For>
  );
}

export { RadioGroup };
