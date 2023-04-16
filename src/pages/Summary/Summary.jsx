// eslint-disable-next-line import/no-extraneous-dependencies
import { Table as BootstrapTable } from 'solid-bootstrap';
import {
  For, Show, createMemo, createResource, createSignal
} from 'solid-js';
import { Alert } from '../../components/Alert/Alert.jsx';
import { useUid } from '../../components/UidProvider/UidProvider.jsx';
import styles from './Summary.module.scss';
import { getSummary } from './summary.data';

function Summary() {
  const [fetchError, setFetchError] = createSignal(false);

  const loadSummary = async (uid) => {
    setFetchError(false);

    try {
      return await getSummary(uid);
    } catch {
      setFetchError(true);

      return false;
    }

  };

  const [uid] = useUid();
  const [data] = createResource(uid, loadSummary);

  const summary = createMemo(() => {
    const totalTrainings = data()?.totalTrainings || 0;
    const totalTimeMin = data()?.totalTime.minutes || 0;
    const totalTimeH = data()?.totalTime.hours || 0;
    const totalTimeDays = data()?.totalTime.days || 0;
    const totalTime = `${totalTimeMin} / ${totalTimeH} / ${totalTimeDays}`;
    const averageMinPerWorkout = data()?.averageMinutesPerWorkout || 0;
    const shortestVal = data()?.shortestWorkout.value || 0;
    const shortestDate = data()?.shortestWorkout.date || '02.09.83';
    const shortest = `${shortestVal} (${shortestDate})`;
    const longestVal = data()?.longestWorkout.value || 0;
    const longestDate = data()?.longestWorkout.date || '02.09.83';
    const longest = `${longestVal} (${longestDate})`;
    const averageWorkoutsPerWeek = data()?.averageWorkoutsPerWeek || 0;
    const averageWorkoutsPerMonth = data()?.averageWorkoutsPerMonth || 0;

    return [
      {
        description: 'Σ trainings',
        value: totalTrainings,
      },
      {
        description: 'Σ time',
        value: totalTime,
      },
      {
        description: 'ø min per workout',
        value: averageMinPerWorkout,
      },
      {
        description: 'shortest',
        value: shortest,
      },
      {
        description: 'longest',
        value: longest,
      },
      {
        description: 'ø workouts / week',
        value: averageWorkoutsPerWeek,
      },
      {
        description: 'ø workouts / month',
        value: averageWorkoutsPerMonth,
      },
    ];
  });

  return (
    <div>
      <Alert
        title="Error"
        text="There was an error fetching the entries..."
        show={fetchError}
        onClose={() => setFetchError(false)}
      />
      <BootstrapTable
        size="sm"
        class={styles.summary}
        variant="dark"
      >
        <tbody>
          <For each={summary()}>
            {(item) => (
              <tr>
                <td class={styles['item-description']}>{item.description}</td>
                <td class={styles.value}>{item.value}</td>
              </tr>
            )}
          </For>
        </tbody>
      </BootstrapTable>

      <BootstrapTable
        striped
        bordered
        size="sm"
        class={styles.months}
      >
        <thead>
          <tr>
            <th />
            <th>min</th>
            <th>min / max</th>
            <th>Σ</th>
            <th>ø</th>
          </tr>
        </thead>
        <tbody>
          <For each={data()?.months}>
            {(entry, index) => (
              <tr class={index() === 0 ? styles['month-current'] : ''}>
                <td>
                  {entry.monthName.substring(0, 3)} {entry.year.toString().substring(2, 4)}
                </td>
                <td>
                  <Show
                    when={entry.summary.totalWorkouts > 0}
                    fallback={<span>-</span>}
                  >
                    {entry.summary.totalTime}
                  </Show>
                </td>
                <td>
                  <Show
                    when={entry.summary.totalWorkouts > 0}
                    fallback={<span>-</span>}
                  >
                    <span>{entry.summary.min}</span> / <span>{entry.summary.max}</span>
                  </Show>
                </td>
                <td>
                  <Show
                    when={entry.summary.totalWorkouts > 0}
                    fallback={<span>-</span>}
                  >
                    {entry.summary.totalWorkouts}
                  </Show>
                </td>
                <td>
                  <Show
                    when={entry.summary.totalWorkouts > 0}
                    fallback={<span>-</span>}
                  >
                    {entry.summary.minutesPerWorkout}
                  </Show>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </BootstrapTable>
    </div>
  );
}

export { Summary };
