// eslint-disable-next-line import/no-extraneous-dependencies
import { Table as BootstrapTable, Pagination, Form } from 'solid-bootstrap';
import {
  For, createEffect, createSignal, createMemo, Show,
} from 'solid-js';
import { Button } from '../Button/Button.jsx';
import { Icon } from '../Icon/Icon.jsx';
import { dbKeys } from '../../firebase/keys';
import { getDayForDisplay, getDateForDisplay } from '../../helpers/dateTime';

const config = {
  itemsPerPage: 50,
};

function EntriesTable(props) {
  const [currentPage, setCurrentPage] = createSignal(0);
  const [currentItems, setCurrentItems] = createSignal([]);
  const totalPages = createMemo(() => {
    if (props.entries()) {
      const divider = props.entries().length / config.itemsPerPage;
      let pages = Math.floor(divider);

      if (divider - Math.floor(divider) !== 0) {
        pages += 1;
      }

      return pages;
    }

    return [];
  });

  createEffect(() => {
    if (!props.entries()) {
      return;
    }

    const startIndex = currentPage() * config.itemsPerPage;
    const endIndex = startIndex + config.itemsPerPage;
    const newItems = props.entries().slice(startIndex, endIndex);

    setCurrentItems(newItems);
  });

  const handlePaginationSelect = (evt) => {
    const val = parseInt(evt.target.value, 10);

    setCurrentPage(val);

  };

  const handlePaginationNext = () => {
    if (currentPage() > totalPages() - 2) {
      return;
    }

    setCurrentPage(currentPage() + 1);
  };

  const handlePaginationPrevious = () => {
    if (currentPage() < 1) {
      return;
    }

    setCurrentPage(currentPage() - 1);
  };

  return (
    <div>
      <Show when={totalPages() > 0}>
        <Pagination>
          <Pagination.Prev onClick={handlePaginationPrevious} />
          <Form.Select
            onChange={handlePaginationSelect}
            value={currentPage()}
          >
            <For each={[...Array(totalPages()).keys()]}>
              {(page) => (
                <option value={page}>{page + 1}</option>
              )}
            </For>
          </Form.Select>
          <Pagination.Next onClick={handlePaginationNext} />
        </Pagination>
      </Show>

      <BootstrapTable striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Duration</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <For each={currentItems()}>
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
                    variant="outline-danger"
                    onClick={props.handleDelete(entry.id)}
                    icon={<Icon name="delete" />}
                  />
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </BootstrapTable>
    </div>
  );
}

export { EntriesTable };
