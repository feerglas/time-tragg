// eslint-disable-next-line import/no-extraneous-dependencies
import { Table as BootstrapTable } from 'solid-bootstrap';
import { For } from 'solid-js';
import { Button } from '../Button/Button.jsx';
import { dbKeys } from '../../firebase/keys';

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
              <td>{entry[dbKeys.date]}</td>
              <td>{entry[dbKeys.startTime]} - {entry[dbKeys.endTime]}</td>
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
