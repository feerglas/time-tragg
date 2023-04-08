import { initializeApp } from 'firebase/app';
import {
  getDatabase, ref, child, push, update,
} from 'firebase/database';
import { firebaseConfig } from './config';
import { dbKeys } from './keys';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

export const addEntry = async (uid, data) => {
  const path = `${uid}/${dbKeys.workouts}`;
  const newPostKey = push(child(dbRef, path)).key;
  const updateKey = `${path}/${newPostKey}`;
  const updates = {};

  updates[updateKey] = data;

  try {
    await update(dbRef, updates);

    return true;
  } catch {
    return false;
  }
};
