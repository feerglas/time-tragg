import { createSignal, createEffect, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Button } from '../../components/Button/Button.jsx';
import { DateTimePicker } from '../../components/DateTimePicker/DateTimePicker.jsx';
import { addEntry } from '../../firebase/db';
import { useUid } from '../../components/UidProvider/UidProvider.jsx';

function Add() {
  const navigate = useNavigate();
  const [selection, setSelection] = createSignal({});
  const [submitError, setSubmitError] = createSignal();
  const [uid] = useUid();

  createEffect(() => {
    if (selection()) {
      setSubmitError();
    }
  });

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setSubmitError();

    if (uid()) {
      try {
        await addEntry(uid(), selection());
        navigate('/list');
      } catch (err) {
        setSubmitError(err.message);
      }
    }
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

      <Show when={submitError()}>
        <p>{submitError()}</p>
      </Show>

    </div>
  );
}

export { Add };
