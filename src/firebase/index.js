import { initializeApp } from 'firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
} from 'firebase/auth';
import { firebaseConfig } from './config';

// Initialize Firebase
initializeApp(firebaseConfig);

// Sign up a new user
export const fbSignUpUser = async (email, password) => {
  try {
    const auth = getAuth();

    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.code);
  }
};

// Log in existing user
export const fbSignInUser = async (email, password) => {
  try {
    const auth = getAuth();

    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.code);
  }
};

// Get current login state
export const fbGetLoginState = (cb) => {
  try {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        cb(user.uid);

        return;
      }

      throw new Error('unable to get user info');
    });

  } catch (error) {
    throw new Error(error.code);
  }
};
