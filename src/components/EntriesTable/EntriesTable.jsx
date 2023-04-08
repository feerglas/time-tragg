// eslint-disable-next-line import/no-extraneous-dependencies
import { Table as BootstrapTable } from 'solid-bootstrap';
import { For } from 'solid-js';
import { Button } from '../Button/Button.jsx';
import { dbKeys } from '../../firebase/keys';
import { getDayForDisplay, getDateForDisplay } from '../../helpers/dateTime';

function EntriesTable(props) {
  return (
    <BootstrapTable striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Duration</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <For each={props.entries()}>
          {(entry) => (
            <tr>
              <td>
                <span>{getDayForDisplay(entry[dbKeys.date])}</span>
                <span>{getDateForDisplay(entry[dbKeys.date])}</span>
              </td>
              <td>
                <span>{entry[dbKeys.startTime]}</span>
                <span>-</span>
                <span>{entry[dbKeys.endTime]}</span>
              </td>
              <td>
                <Button
                  text="delete"
                  onClick={props.handleDelete(entry.id)}
                />
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </BootstrapTable>
  );
}

export { EntriesTable };
