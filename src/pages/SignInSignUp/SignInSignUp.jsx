import { createSignal, Show } from 'solid-js';
import { createFormGroup, createFormControl } from 'solid-forms';
import { useNavigate, A } from '@solidjs/router';

import { TextInput } from '../../components/TextInput/TextInput.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup.jsx';
import { PageTitle } from '../../components/PageTitle/PageTitle.jsx';

import { fbSignUpUser, fbSignInUser } from '../../firebase/auth';
import { isValidMail } from '../../helpers/validators';

const radios = [
  {
    id: 'login',
    value: 'login',
    label: 'Login',
    checked: true,
  },
  {
    id: 'signup',
    value: 'signup',
    label: 'Sign Up',
  },
];

function SignInSignUp() {
  const navigate = useNavigate();

  const [isForLogin, setIsForLogin] = createSignal(true);
  const [loginError, setLoginError] = createSignal('');

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
    setLoginError('');

    if (!group.isValid) return;

    const { email, password } = group.value;

    try {
      if (isForLogin()) {
        await fbSignInUser(email, password);
      } else {
        await fbSignUpUser(email, password);
      }

      navigate('/add', { replace: true });
    } catch (err) {
      if (isForLogin()) {
        if (err.message === 'auth/user-not-found' || err.message === 'auth/wrong-password') {
          setLoginError('wrong username or password.');
        } else {
          setLoginError('there seems to be an error during login. please try again.');
        }
      } else if (!isForLogin()) {
        if (err.message === 'auth/email-already-in-use') {
          setLoginError('the email is already in use. please try to login.');
        } else {
          setLoginError('there seems to be an error during signup. please try again.');
        }
      }
    }
  };

  const handleRadioChange = (value) => {
    setIsForLogin(value === 'login');
    setLoginError('');
  };

  return (
    <div>
      <PageTitle text="Login / Signup" />

      <form onSubmit={onSubmit}>

        <RadioGroup
          name='signInSignUp'
          radios={radios}
          handleChange={handleRadioChange}
        />

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

        <Button disabled={!group.isValid} type="submit" text={isForLogin() ? 'Login' : 'Sign Up'} />

        <Show when={loginError().length > 0}>{loginError()}</Show>
      </form>

      <Show when={isForLogin()}>
        <p>
          Forgot your password? No problem, <A href="/forgot-password">click here</A> to get an email with
          instructions on how to reset your Password.
        </p>
      </Show>
    </div>
  );
}

export { SignInSignUp };
