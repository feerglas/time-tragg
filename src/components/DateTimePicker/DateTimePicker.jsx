// https://air-datepicker.com/

// eslint-disable-next-line import/no-extraneous-dependencies
import AirDatepicker from 'air-datepicker';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'air-datepicker/air-datepicker.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import localeEn from 'air-datepicker/locale/de';

import {
  onMount, createSignal, createEffect, Show,
} from 'solid-js';

import { formattedTimeStringFromDate, getDateTimePickerDefaults } from '../../helpers/dateTime';

import { dbKeys } from '../../firebase/keys';

import './DateTimePicker.airpicker.scss';

const ids = {
  datepicker: 'datepicker',
  timepickerFrom: 'timepicker-from',
  timepickerTo: 'timepicke-to',
};

const validateTime = (from, to) => {
  if (parseInt(from, 10) >= parseInt(to, 10)) {
    return false;
  }

  return true;
};

function DateTimePicker(props) {
  const defaults = getDateTimePickerDefaults();

  const [validSelection, setValidSelection] = createSignal(true);
  const [selectedDate, setSelectedDate] = createSignal({
    date: defaults[0],
    startTime: defaults[1],
    endTime: defaults[2],
  });

  const handleDateSelect = (evt) => {
    setValidSelection(true);
    setSelectedDate({
      ...selectedDate(),
      date: evt.date,
    });
  };

  const handleTimeSelectFrom = (evt) => {
    setValidSelection(true);
    setSelectedDate({
      ...selectedDate(),
      startTime: evt.date,
    });
  };

  const handleTimeSelectTo = (evt) => {
    setValidSelection(true);
    setSelectedDate({
      ...selectedDate(),
      endTime: evt.date,
    });
  };

  const prepareReturnObject = (from, to) => {
    const correctDate = new Date(selectedDate().date);
    const returnObject = {};

    correctDate.setHours(from.substring(0, 2));
    correctDate.setMinutes(from.substring(2));

    const sortDate = correctDate.getTime();

    returnObject[dbKeys.date] = correctDate.toISOString();
    returnObject[dbKeys.sortDate] = sortDate;
    returnObject[dbKeys.startTime] = `${from.substring(0, 2)}:${from.substring(2)}`;
    returnObject[dbKeys.endTime] = `${to.substring(0, 2)}:${to.substring(2)}`;

    return returnObject;
  };

  createEffect(() => {
    const from = formattedTimeStringFromDate(selectedDate().startTime);
    const to = formattedTimeStringFromDate(selectedDate().endTime);
    const isValid = validateTime(from, to);

    if (isValid) {
      const entryObject = prepareReturnObject(from, to);

      props.handleSelect(entryObject);
    } else {
      setValidSelection(false);
      props.handleSelect(false);
    }

  });

  const datePickerOptions = {
    locale: localeEn,
    selectedDates: defaults[0],
    autoClose: true,
    isMobile: true,
    onSelect: handleDateSelect,
  };

  const timePickerOptionsFrom = {
    locale: localeEn,
    selectedDates: [defaults[1]],
    autoClose: true,
    onlyTimepicker: true,
    timepicker: true,
    inline: true,
    minutesStep: 5,
    onSelect: handleTimeSelectFrom,
  };

  const timePickerOptionsTo = {
    ...timePickerOptionsFrom,
    selectedDates: defaults[2],
    onSelect: handleTimeSelectTo,
  };

  onMount(() => {
    /* eslint-disable no-new */
    new AirDatepicker(`#${ids.datepicker}`, datePickerOptions);
    new AirDatepicker(`#${ids.timepickerFrom}`, timePickerOptionsFrom);
    new AirDatepicker(`#${ids.timepickerTo}`, timePickerOptionsTo);
    /* eslint-enable no-new */
  });

  return (
    <div>
      <input id={ids.datepicker} />
      <div id={ids.timepickerFrom} />
      <div id={ids.timepickerTo} />
      <Show when={!validSelection()}>
        The end time should be later than the start time.
      </Show>
    </div>
  );
}

export { DateTimePicker };
