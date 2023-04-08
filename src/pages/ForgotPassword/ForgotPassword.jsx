import { createSignal, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { createFormGroup, createFormControl } from 'solid-forms';

import { TextInput } from '../../components/TextInput/TextInput.jsx';
import { Button } from '../../components/Button/Button.jsx';

import { isValidMail } from '../../helpers/validators';
import { fbSendPasswordResetMail } from '../../firebase/auth';

function ForgotPassword() {
  const [sendError, setSendError] = createSignal('');
  const [sendSuccess, setSendSuccess] = createSignal(false);

  const mailValidator = (rawValue) => (!isValidMail(rawValue) ? { isMissing: true, message: 'this is not a valid email address' } : null);

  const group = createFormGroup({
    email: createFormControl('', {
      required: true,
      validators: [mailValidator],
    }),
  });

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setSendError('');
    setSendSuccess(false);

    if (!group.isValid) return;

    const { email } = group.value;

    try {
      await fbSendPasswordResetMail(email);

      setSendSuccess(true);
    } catch {
      setSendError('There was an error sending the reset mail. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextInput
          name="email"
          type="email"
          label="email"
          placeholder="email"
          control={group.controls.email}
        />

        <Button disabled={!group.isValid} type="submit" text='Reset password' />

        <Show when={sendError().length > 0}>{sendError()}</Show>
        <Show when={sendSuccess()}>
          The reset email was successfully send. Follow the instrcutions in the mail.
        </Show>

        <p><A href='/login'>Go back to login</A></p>
      </form>
    </div>
  );
}

export { ForgotPassword };
