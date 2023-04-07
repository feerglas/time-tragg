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

import './DateTimePicker.airpicker.css';

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
    from: defaults[1],
    to: defaults[2],
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
      from: evt.date,
    });
  };

  const handleTimeSelectTo = (evt) => {
    setValidSelection(true);
    setSelectedDate({
      ...selectedDate(),
      to: evt.date,
    });
  };

  createEffect(() => {
    const from = formattedTimeStringFromDate(selectedDate().from);
    const to = formattedTimeStringFromDate(selectedDate().to);
    const isValid = validateTime(from, to);

    if (isValid) {
      const correctDate = new Date(selectedDate().date);
      const sortDate = correctDate.getTime();

      correctDate.setHours(selectedDate().from.getHours());
      correctDate.setMinutes(selectedDate().from.getMinutes());

      props.handleSelect({
        date: correctDate,
        sortDate,
        from: `${from}`,
        to: `${to}`,
      });
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
    new AirDatepicker(`#${ids.datepicker}`, datePickerOptions); // eslint-disable-line no-new
    new AirDatepicker(`#${ids.timepickerFrom}`, timePickerOptionsFrom); // eslint-disable-line no-new
    new AirDatepicker(`#${ids.timepickerTo}`, timePickerOptionsTo); // eslint-disable-line no-new
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
