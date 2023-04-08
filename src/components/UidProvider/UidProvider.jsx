import {
  createContext, createEffect, createSignal, useContext,
} from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { fbGetLoginState } from '../../firebase/auth';

const UidContext = createContext();

export function UidProvider(props) {
  const navigate = useNavigate();
  const [uid, setUid] = createSignal(false);

  createEffect(() => {
    fbGetLoginState((identifier) => {
      if (identifier) {
        setUid(identifier.uid);
      } else {
        setUid(false);
        navigate('/login', { replace: true });
      }
    });
  });

  return (
    <UidContext.Provider value={[uid]}>
      {props.children}
    </UidContext.Provider>
  );
}

export function useUid() { return useContext(UidContext); }
