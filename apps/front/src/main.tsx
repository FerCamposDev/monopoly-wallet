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
import { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
import GameProvider from './app/context/game/GameProvider';
import LobbyPage from './app/pages/Lobby';

const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: Routes.RoomByName,
    element: <LobbyPage />,
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

const SOCKET_URL = 'http://localhost:3333';
const socket = io(SOCKET_URL);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <GameProvider>
      <SocketProvider socket={socket}>
        <CssBaseline />
        <Toaster />
        <RouterProvider router={router} />
      </SocketProvider>
    </GameProvider>
  </StrictMode>
);
