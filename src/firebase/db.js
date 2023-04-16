import { initializeApp } from 'firebase/app';
import {
  getDatabase, ref, child, push, update, get, remove,
} from 'firebase/database';
import { firebaseConfig } from './config';
import { dbKeys } from './keys';
import { arrayifyFirebaseObject } from '../helpers/dataTransform';
import { removeColonsFromTime, formatDateStringForDateComparison } from '../helpers/dateTime';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

const sortEntries = (entries) => entries.sort((a, b) => b[dbKeys.sortDate] - a[dbKeys.sortDate]);

export const getAllEntries = async (uid) => {
  try {
    const snapshot = await get(child(dbRef, `${uid}/${dbKeys.workouts}`));

    if (snapshot.exists()) {
      const result = snapshot.val();
      const resultArray = arrayifyFirebaseObject(result);
      const sortedResults = sortEntries(resultArray);

      return sortedResults;
    }

    return [];

  } catch (error) {
    return new Error(error);
  }
};

export const entriesPlaceholder = () => {
  const placeholderObject = {
    date: '1983-02-09T06:35:16.672Z',
    endTime: '09:00',
    id: '',
    sortDate: 0,
    startTime: '08:00',
  };

  return new Array(20).fill(placeholderObject);
};

export const getAllEntriesForDateRange = (allEntries, from, to) => {
  const fromFormatted = new Date(from);
  const toFormatted = new Date(to);

  const filteredEntries = allEntries.filter((item) => {
    const entryDate = new Date(item[dbKeys.date]);
    const entryDateFormatted = new Date(entryDate);

    return entryDateFormatted <= toFormatted && entryDateFormatted >= fromFormatted;
  });

  return filteredEntries;
};

const getAllEntriesForDateRangeStrict = (allEntries, from, to) => {
  const fromFormatted = formatDateStringForDateComparison(from);
  const toFormatted = formatDateStringForDateComparison(to);
  const filteredEntries = allEntries.filter((item) => {
    const entryDate = new Date(item[dbKeys.date]);
    const entryDateFormatted = formatDateStringForDateComparison(entryDate);

    return entryDateFormatted <= toFormatted && entryDateFormatted >= fromFormatted;
  });

  return filteredEntries;
};

const entryAlreadyThere = async (entry, uid) => {
  const date = entry[dbKeys.date];
  const allEntries = await getAllEntries(uid);
  const entriesForDate = getAllEntriesForDateRangeStrict(allEntries, date, date);

  if (entriesForDate.length === 0) {
    return false;
  }

  const from = parseInt(removeColonsFromTime(entry[dbKeys.startTime]), 10);
  const to = parseInt(removeColonsFromTime(entry[dbKeys.endTime]), 10);

  let itemFound = false;

  entriesForDate.every((item) => {
    const itemFrom = parseInt(removeColonsFromTime(item[dbKeys.startTime]), 10);
    const itemTo = parseInt(removeColonsFromTime(item[dbKeys.endTime]), 10);

    if (itemFrom >= from && itemFrom <= to) {
      itemFound = true;

      return false;
    }

    if (itemTo <= to && itemTo >= from) {
      itemFound = true;

      return false;
    }

    return true;
  });

  return itemFound;
};

export const addEntry = async (uid, data) => {
  const path = `${uid}/${dbKeys.workouts}`;
  const newPostKey = push(child(dbRef, path)).key;
  const updateKey = `${path}/${newPostKey}`;
  const updates = {};

  updates[updateKey] = data;

  try {
    const alreadyThere = await entryAlreadyThere(data, uid);

    if (alreadyThere) {
      throw new Error('There is already an entry in this time range.');
    }

    await update(dbRef, updates);

    return true;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteEntry = async (uid, id) => {
  const refToDelete = ref(database, `${uid}/${dbKeys.workouts}/${id}`);

  await remove(refToDelete);
};
