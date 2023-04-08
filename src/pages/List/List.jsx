import { createResource, For } from 'solid-js';
import { getAllEntries } from '../../firebase/db';
import { useUid } from '../../components/UidProvider/UidProvider.jsx';
import { dbKeys } from '../../firebase/keys';

function List() {
  const [uid] = useUid();
  const [entries] = createResource(uid, getAllEntries);

  return (
    <div>
      <ul>
        <For each={entries()} fallback={<div>Loading...</div>}>
          {(entry) => (
            <li>
              {entry[dbKeys.date]}: {entry[dbKeys.startTime]} - {entry[dbKeys.endTime]}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

export { List };
