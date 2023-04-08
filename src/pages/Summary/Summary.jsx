// eslint-disable-next-line import/no-extraneous-dependencies
import { Table as BootstrapTable } from 'solid-bootstrap';
import { createResource, For, Show } from 'solid-js';
import { getSummary } from './summary.data';
import { useUid } from '../../components/UidProvider/UidProvider.jsx';

function Summary() {
  const [uid] = useUid();
  const [data] = createResource(uid, getSummary);

  return (
    <div>
      <h2>total trainings</h2>
      <div>{data()?.totalTrainings}</div>

      <h2>total time</h2>
      <div>{data()?.totalTime.minutes}</div>
      <div>{data()?.totalTime.hours}</div>
      <div>{data()?.totalTime.days}</div>

      <h2>average minutes per workout</h2>
      <div>{data()?.averageMinutesPerWorkout}</div>

      <h2>shortest</h2>
      <div>{data()?.shortestWorkout.value}</div>
      <div>{data()?.shortestWorkout.date}</div>

      <h2>longest</h2>
      <div>{data()?.longestWorkout.value}</div>
      <div>{data()?.longestWorkout.date}</div>

      <h2>average workouts per week</h2>
      <div>{data()?.averageWorkoutsPerWeek}</div>

      <h2>average workouts per month</h2>
      <div>{data()?.averageWorkoutsPerMonth}</div>

      <h2>months</h2>
      <BootstrapTable striped bordered hover size="sm">
        <thead>
          <tr>
            <th></th>
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
                  <span>{entry.monthName}</span>
                  <span>{entry.year.toString().substring(2, 4)}</span>
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
