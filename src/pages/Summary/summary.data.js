import { getAllEntries, getAllEntriesForDateRange } from '../../firebase/db';
import { dbKeys } from '../../firebase/keys';
import { getDateForDisplay } from '../../helpers/dateTime';

const arrayOfMonthsSinceFirstWorkout = (firstWorkout) => {
  const dates = [];
  const firstDate = new Date(firstWorkout);
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const firstYear = firstDate.getFullYear();
  const firstMonth = firstDate.getMonth();
  let yearCounter = todayYear;
  let monthCounter = todayMonth;

  const options = {
    month: 'long',
  };

  const monthName = today.toLocaleString('de-DE', options);

  dates.push({
    year: todayYear,
    month: todayMonth,
    monthName,
  });

  while (firstYear < yearCounter || firstMonth < monthCounter) {

    if (monthCounter > 0) {
      monthCounter -= 1;
    } else {
      yearCounter -= 1;
      monthCounter = 11;
    }

    dates.push({
      year: yearCounter,
      month: monthCounter,
      monthName: (new Date(yearCounter, monthCounter, 15)).toLocaleString('de-DE', options),
    });

  }

  return dates;
};

export const getZeroStartAndEndDates = () => {
  const startDate = new Date();
  const endDate = new Date();

  startDate.setSeconds(0);
  endDate.setSeconds(0);
  startDate.setMilliseconds(0);
  endDate.setMilliseconds(0);

  return {
    startDate,
    endDate,
  };
};

export const getMinuteDurationForEntry = (startDate, endDate, entry) => {
  const startSplit = entry[dbKeys.startTime].split(':');
  const endSplit = entry[dbKeys.endTime].split(':');

  startDate.setHours(startSplit[0]);
  startDate.setMinutes(startSplit[1]);
  endDate.setHours(endSplit[0]);
  endDate.setMinutes(endSplit[1]);

  return Math.floor(endDate.getTime() - startDate.getTime()) / 1000 / 60;
};

const getShortestLongestWorkouts = (entries) => {
  const {
    startDate,
    endDate,
  } = getZeroStartAndEndDates();

  const returnObject = {
    min: {
      value: false,
      date: false,
    },
    max: {
      value: false,
      date: false,
    },
  };

  entries.forEach((entry) => {
    const entryMinutes = getMinuteDurationForEntry(startDate, endDate, entry);

    if (!returnObject.min.value || entryMinutes < returnObject.min.value) {
      returnObject.min.value = entryMinutes;
      returnObject.min.date = getDateForDisplay(entry[dbKeys.date]);
    }

    if (!returnObject.max.value || entryMinutes > returnObject.max.value) {
      returnObject.max.value = entryMinutes;
      returnObject.max.date = getDateForDisplay(entry[dbKeys.date]);
    }
  });

  return returnObject;
};

const getMonthSummary = (workoutsForRange) => {
  const {
    startDate,
    endDate,
  } = getZeroStartAndEndDates();

  let totalTime = 0;

  workoutsForRange.forEach((workout) => {
    totalTime += getMinuteDurationForEntry(startDate, endDate, workout);
  });

  const minMax = getShortestLongestWorkouts(workoutsForRange);
  const hasWorkouts = workoutsForRange.length > 0;

  return {
    totalWorkouts: workoutsForRange.length,
    totalTime,
    minutesPerWorkout: hasWorkouts ? Math.floor(totalTime / workoutsForRange.length) : 0,
    min: minMax.min.value,
    max: minMax.max.value,
  };
};

const addWorkoutsToMonths = (allEntries, months) => {
  const entries = [];

  months.forEach((_month) => {
    const month = JSON.parse(JSON.stringify(_month));
    const monthStartDate = new Date(month.year, month.month, 1, 4);
    const monthLastDate = new Date(month.year, month.month + 1, 0, 23);
    const workoutsForRange = getAllEntriesForDateRange(allEntries, monthStartDate, monthLastDate);

    month.workouts = workoutsForRange;

    // add month summary
    month.summary = getMonthSummary(workoutsForRange);

    entries.push(month);
  });

  return entries;
};

const getMonthsSinceDate = (date) => {
  const endDate = new Date();
  const startDate = new Date(date);
  const monthsDiff = endDate.getMonth() - startDate.getMonth();

  const diff = monthsDiff + (12 * (endDate.getFullYear() - startDate.getFullYear()));

  return diff;
};

const getWeeksSinceDate = (date) => {
  const endDate = new Date();
  const startDate = new Date(date);
  const msDiff = endDate.getTime() - startDate.getTime();

  const diff = msDiff / 1000 / 60 / 60 / 24 / 7;

  return diff;
};

const getTotalTime = (entries) => {
  const {
    startDate,
    endDate,
  } = getZeroStartAndEndDates();

  let minutes = 0;

  entries.forEach((entry) => {
    minutes += getMinuteDurationForEntry(startDate, endDate, entry);
  });

  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    minutes,
    hours,
    days,
  };
};

const getSummary = async (uid) => {
  const allEntries = await getAllEntries(uid);
  const totalTime = getTotalTime(allEntries);
  const shortestLongest = getShortestLongestWorkouts(allEntries);
  const firstWorkoutDate = allEntries[allEntries.length - 1][dbKeys.date];
  const averageWorkoutsPerWeek = allEntries.length / getWeeksSinceDate(firstWorkoutDate);
  const averageWorkoutsPerMonth = allEntries.length / getMonthsSinceDate(firstWorkoutDate);
  const months = arrayOfMonthsSinceFirstWorkout(firstWorkoutDate);
  const monthsWithWorkouts = addWorkoutsToMonths(allEntries, months);

  return {
    totalTrainings: allEntries.length,
    totalTime,
    averageMinutesPerWorkout: Math.floor(totalTime.minutes / allEntries.length),
    shortestWorkout: shortestLongest.min,
    longestWorkout: shortestLongest.max,
    averageWorkoutsPerWeek: averageWorkoutsPerWeek.toFixed(1),
    averageWorkoutsPerMonth: averageWorkoutsPerMonth.toFixed(1),
    months: monthsWithWorkouts,
  };
};

export { getSummary };
