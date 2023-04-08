import { createResource, createSignal } from 'solid-js';
import { getAllEntries, deleteEntry } from '../../firebase/db';
import { useUid } from '../../components/UidProvider/UidProvider.jsx';
import { Modal } from '../../components/Modal/Modal.jsx';
import { Alert } from '../../components/Alert/Alert.jsx';
import { EntriesTable } from '../../components/EntriesTable/EntriesTable.jsx';

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

      <EntriesTable
        entries={entries}
        handleDelete={(id) => {
          handleDelete(id);
        }}
      />
    </div>
  );
}

export { List };
