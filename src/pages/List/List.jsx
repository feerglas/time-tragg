import {
  createResource, createSignal, createEffect, Show,
} from 'solid-js';
import { getAllEntries, deleteEntry, entriesPlaceholder } from '../../firebase/db';
import { useUid } from '../../components/UidProvider/UidProvider.jsx';
import { Modal } from '../../components/Modal/Modal.jsx';
import { Alert } from '../../components/Alert/Alert.jsx';
import { EntriesTable } from '../../components/EntriesTable/EntriesTable.jsx';

function List() {
  const [uid] = useUid();
  const [entries, { refetch }] = createResource(uid, getAllEntries);
  const [items, setItems] = createSignal(false);
  const [showModal, setShowModal] = createSignal(false);
  const [idToDelete, setIdToDelete] = createSignal();
  const [deleteError, setDeleteError] = createSignal(false);
  const [fetchError, setFetchError] = createSignal(false);

  createEffect(() => {
    const tempItems = entries();

    setFetchError(false);

    if (tempItems instanceof Error) {
      setFetchError(true);
      setItems([]);
    } else {
      setItems(tempItems);
    }
  });

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

      <Alert
        title="Error"
        text="There was an error fetching the entries..."
        show={fetchError}
        onClose={() => setFetchError(false)}
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

      <Show when={!fetchError()}>
        <EntriesTable
          entries={items}
          placeholder={entriesPlaceholder}
          handleDelete={(id) => {
            handleDelete(id);
          }}
        />
      </Show>
    </div>
  );
}

export { List };
