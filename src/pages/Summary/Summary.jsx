// eslint-disable-next-line import/no-extraneous-dependencies
import { Table as BootstrapTable } from 'solid-bootstrap';
import {
  createResource, For, Show, createMemo,
} from 'solid-js';
import { getSummary } from './summary.data';
import { useUid } from '../../components/UidProvider/UidProvider.jsx';
import styles from './Summary.module.scss';

function Summary() {
  const [uid] = useUid();
  const [data] = createResource(uid, getSummary);
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
        description: 'Total trainings',
        value: totalTrainings,
      },
      {
        description: 'Total time',
        value: totalTime,
      },
      {
        description: 'average min per workout',
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
        description: 'average workouts per week',
        value: averageWorkoutsPerWeek,
      },
      {
        description: 'average workouts per month',
        value: averageWorkoutsPerMonth,
      },
    ];
  });

  return (
    <div>
      <BootstrapTable
        striped
        size="sm"
        class={styles.summary}
      >
        <tbody>
          <For each={summary()}>
            {(item) => (
              <tr>
                <td>{item.description}</td>
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
            <th>total</th>
            <th>average</th>
          </tr>
        </thead>
        <tbody>
          <For each={data()?.months}>
            {(entry) => (
              <tr>
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
                    <span>{entry.summary.min}</span>/<span>{entry.summary.max}</span>
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
