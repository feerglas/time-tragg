// eslint-disable-next-line import/no-extraneous-dependencies
import { Table as BootstrapTable, Form } from 'solid-bootstrap';
import {
  For, createEffect, createSignal, createMemo, Show,
} from 'solid-js';
import { Button } from '../Button/Button.jsx';
import { Icon } from '../Icon/Icon.jsx';
import { dbKeys } from '../../firebase/keys';
import { getDayForDisplay, getDateForDisplay } from '../../helpers/dateTime';
import { getMinuteDurationForEntry, getZeroStartAndEndDates } from '../../pages/Summary/summary.data';
import styles from './EntriesTable.module.scss';

const config = {
  itemsPerPage: 20,
};

function EntriesTable(props) {
  const {
    startDate,
    endDate,
  } = getZeroStartAndEndDates();
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

  const getEntryDuration = (entry) => getMinuteDurationForEntry(startDate, endDate, entry);

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
      <BootstrapTable
        striped
        bordered
        size="sm"
        class={styles.table}
      >
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
                  <span class={styles['cell-date__date']}>{getDateForDisplay(entry[dbKeys.date])}</span>
                  <span class={styles['cell-date__day']}>{getDayForDisplay(entry[dbKeys.date])}</span>
                </td>
                <td>
                  <span class={styles['cell-duration__time']}>
                    <span>{entry[dbKeys.startTime]}</span>
                    <span>-</span>
                    <span>{entry[dbKeys.endTime]}</span>
                  </span>
                  <span class={styles['cell-duration__minutes']}>{getEntryDuration(entry)}min</span>
                </td>
                <td class={styles['cell-delete']}>
                  <Button
                    variant="outline-danger"
                    onClick={props.handleDelete(entry.id)}
                    icon={<Icon name="delete" />}
                    class={styles['cell-delete__button']}
                  />
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </BootstrapTable>
      <Show when={totalPages() > 0}>
        <div class={styles.pagination}>
          <Button
            onClick={handlePaginationPrevious}
            variant="outline-primary"
            icon={<Icon name="chevron-left" />}
          />
          <Form.Select
            class={styles.select}
            onChange={handlePaginationSelect}
            value={currentPage()}
          >
            <For each={[...Array(totalPages()).keys()]}>
              {(page) => (
                <option value={page}>{page + 1}</option>
              )}
            </For>
          </Form.Select>
          <Button
            onClick={handlePaginationNext}
            variant="outline-primary"
            icon={<Icon name="chevron-right" />}
          />
        </div>
      </Show>
    </div>
  );
}

export { EntriesTable };
