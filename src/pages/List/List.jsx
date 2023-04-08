import {
  createResource, For, createSignal,
} from 'solid-js';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Table } from 'solid-bootstrap';
import { getAllEntries, deleteEntry } from '../../firebase/db';
import { useUid } from '../../components/UidProvider/UidProvider.jsx';
import { dbKeys } from '../../firebase/keys';
import { Button } from '../../components/Button/Button.jsx';
import { Modal } from '../../components/Modal/Modal.jsx';
import { Alert } from '../../components/Alert/Alert.jsx';

function List() {
  const [uid] = useUid();
  const [entries, { refetch }] = createResource(uid, getAllEntries);
  const [showModal, setShowModal] = createSignal(false);
  const [idToDelete, setIdToDelete] = createSignal();
  const [deleteError, setDeleteError] = createSignal(false);

  const handleDelete = (id) => {
    setDeleteError(false);
    setIdToDelete(id);
    setShowModal(true);
  };

  const handleDeleteCancel = () => {
    setIdToDelete();
    setShowModal(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteEntry(uid(), idToDelete());

      setIdToDelete();
      handleDeleteCancel();

      refetch();
    } catch {
      handleDeleteCancel();
      setIdToDelete();
      setDeleteError(true);
    }
  };

  return (
    <div>
      <Alert
        title="Error"
        text="There was an error deleting the entry..."
        show={deleteError}
        onClose={() => setDeleteError(false)}
      />

      <Modal
        title="Delete Entry"
        text="Are you sure you want to delete this entry? This can not be undone!"
        cancelText="Cancel"
        confirmText="Delete"
        handleCancel={handleDeleteCancel}
        handleConfirm={handleDeleteConfirm}
        show={showModal}
      />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Duration</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <For each={entries()}>
            {(entry) => (
              <tr>
                <td>{entry[dbKeys.date]}</td>
                <td>{entry[dbKeys.startTime]} - {entry[dbKeys.endTime]}</td>
                <td>
                  <Button
                    text="delete"
                    onClick={() => {
                      handleDelete(entry.id);
                    }}
                  />
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </Table>
    </div>
  );
}

export { List };
