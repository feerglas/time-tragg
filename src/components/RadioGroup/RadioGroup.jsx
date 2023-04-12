import { For } from 'solid-js';
import { ButtonGroup, ToggleButton } from 'solid-bootstrap';

function RadioGroup(props) {

  const handleChange = (evt) => {
    props.handleChange(evt.target.value);
  };

  return (
    <ButtonGroup class={props.class}>
      <For each={props.radios}>
        {(radio) => (
          <ToggleButton
            id={radio.id}
            type="radio"
            name={props.name}
            value={radio.value}
            checked={radio.checked}
            variant='outline-dark'
            onChange={handleChange}
          >{radio.label}</ToggleButton>
        )}
      </For>
    </ButtonGroup>
  );
}

export { RadioGroup };
