import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from './config';

// Initialize Firebase
initializeApp(firebaseConfig);

// Sign up a new user
export const fbSignUpUser = async (email, password) => {
  try {
    const auth = getAuth();

    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error);
  }
};
