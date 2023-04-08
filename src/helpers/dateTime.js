export const twoDigitsWithLeadingZero = (value) => (value < 10 ? `0${value}` : `${value}`);

export const formattedTimeStringFromDate = (date) => {
  const minutes = twoDigitsWithLeadingZero(date.getMinutes());
  const hours = twoDigitsWithLeadingZero(date.getHours());

  return `${hours}${minutes}`;
};

// returns a date in the format 20230128
export const formatDateStringForDateComparison = (date) => {
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };

  return (new Date(date)).toLocaleDateString('de-DE', options);
};

export const removeColonsFromTime = (time) => time.split(':').join('');

export const getDateTimePickerDefaults = () => {
  const defaults = {
    hourFrom: '13',
    hourTo: '14',
    minuteFrom: '00',
    minuteTo: '00',
  };

  const today = new Date();
  const time = new Date();
  const timePlusOneHour = new Date();

  today.setMinutes(defaults.minuteFrom);
  today.setHours(0);
  time.setMinutes(defaults.minuteFrom);
  time.setHours(defaults.hourFrom);
  timePlusOneHour.setMinutes(defaults.minuteFrom);
  timePlusOneHour.setHours(defaults.hourTo);

  return [
    today,
    time,
    timePlusOneHour,
  ];
};
