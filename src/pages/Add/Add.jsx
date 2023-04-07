import { createSignal, createEffect } from 'solid-js';
import { Button } from '../../components/Button/Button.jsx';
import { DateTimePicker } from '../../components/DateTimePicker/DateTimePicker.jsx';

function Add() {
  const [selection, setSelection] = createSignal({});

  createEffect(() => {
    console.log(selection());
  });

  const onSubmit = async (evt) => {
    evt.preventDefault();
  };

  return (
    <div>
      <h1>Add an entry</h1>

      <form onSubmit={onSubmit}>
        <DateTimePicker
          handleSelect={setSelection}
        />

        <Button
          type="submit"
          text="Save"
          disabled={!selection()}
        />
      </form>

    </div>
  );
}

export { Add };
