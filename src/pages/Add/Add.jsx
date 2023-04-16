import { createSignal, createEffect, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Button } from '../../components/Button/Button.jsx';
import { DateTimePicker } from '../../components/DateTimePicker/DateTimePicker.jsx';
import { addEntry } from '../../firebase/db';
import { useUid } from '../../components/UidProvider/UidProvider.jsx';
import styles from './Add.module.scss';

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
      <form onSubmit={onSubmit}>
        <DateTimePicker
          handleSelect={setSelection}
        />

        <Button
          size="lg"
          type="submit"
          text="Save"
          disabled={!selection()}
        />
      </form>

      <Show when={submitError()}>
        <p class={styles.error}>{submitError()}</p>
      </Show>

    </div>
  );
}

export { Add };
