// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sharedTypes } from '@monopoly-wallet/shared-types';
import styles from './app.module.css';

import NxWelcome from './nx-welcome';

export function App() {
  const shared = sharedTypes();
  console.log('shared :>> ', shared);
  return (
    <div>
      <NxWelcome title="front" />
    </div>
  );
}

export default App;
