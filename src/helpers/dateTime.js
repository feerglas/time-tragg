export const twoDigitsWithLeadingZero = (value) => (value < 10 ? `0${value}` : `${value}`);

export const formattedTimeStringFromDate = (date) => {
  const minutes = twoDigitsWithLeadingZero(date.getMinutes());
  const hours = twoDigitsWithLeadingZero(date.getHours());

  return `${hours}${minutes}`;
};

export const getDayForDisplay = (date) => {
  const options = {
    weekday: 'long',
  };

  const formattedDate = (new Date(date)).toLocaleString('de-DE', options);

  return formattedDate;
};

export const getDateForDisplay = (date) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  };

  const formattedDate = (new Date(date)).toLocaleString('de-DE', options);

  return formattedDate;
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
