import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import GamePage from './app/pages/game';
import { CssBaseline } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './app/pages/NotFound';
import HomePage from './app/pages/Home';
import CollectPage from './app/pages/game/collect';
import TransferPage from './app/pages/game/transfer';
import PurchasePage from './app/pages/game/purchase';
import { Routes } from './commons/enums/routes.enum';
import SocketProvider from './app/context/sockets/SocketProvider';

const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: Routes.Game,
    element: <GamePage />,
  },
  {
    path: Routes.GameCollect,
    element: <CollectPage />
  },
  {
    path: Routes.GameTransfer,
    element: <TransferPage />
  },
  {
    path: Routes.GamePurchase,
    element: <PurchasePage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <SocketProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </SocketProvider>
  </StrictMode>
);
