import { createFormGroup, createFormControl } from 'solid-forms';

import { TextInput } from '../../components/TextInput/TextInput.jsx';
import { Button } from '../../components/Button/Button.jsx';

import { fbSignUpUser } from '../../firebase';
import { isValidMail } from '../../helpers/validators';

function SignInSignUp() {
  const lengthValidator = (rawValue) => (!rawValue || rawValue.length < 6 ? { isMissing: true, message: 'password must have at least 6 characters' } : null);
  const mailValidator = (rawValue) => (!isValidMail(rawValue) ? { isMissing: true, message: 'this is not a valid email address' } : null);

  const group = createFormGroup({
    password: createFormControl('', {
      required: true,
      validators: [lengthValidator],
    }),
    email: createFormControl('', {
      required: true,
      validators: [mailValidator],
    }),
  });

  const onSubmit = async (evt) => {
    evt.preventDefault();

    if (!group.isValid) return;

    const { email, password } = group.value;

    try {
      const signupResult = await fbSignUpUser(email, password);

      console.log(signupResult.user);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div>
      <p>sign in / sign up</p>
      <form onSubmit={onSubmit}>

        <TextInput
          name="email"
          type="email"
          label="email"
          placeholder="email"
          control={group.controls.email}
        />

        <TextInput
          name="password"
          type="password"
          label="password"
          placeholder="password"
          control={group.controls.password}
        />

        <Button disabled={!group.isValid} type="submit" text="Sign Up" />

      </form>
    </div>
  );
}

export { SignInSignUp };