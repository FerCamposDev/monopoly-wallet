import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
