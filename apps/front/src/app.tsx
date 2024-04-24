import GamePage from './app/pages/game';
import { Box, CssBaseline } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './app/pages/NotFound';
import HomePage from './app/pages/Home';
import CollectPage from './app/pages/game/collect';
import TransferPage from './app/pages/game/transfer';
import PayToBankPage from './app/pages/game/pay-to-bank';
import { Routes } from './app/commons/enums/routes.enum';
import SocketProvider from './app/context/sockets/SocketProvider';
import { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
import GameProvider from './app/context/game/GameProvider';
import LobbyPage from './app/pages/Lobby';
import PayFromBankPage from './app/pages/game/pay-from-bank';
import PayCollectPage from './app/pages/game/pay-collect';
import CustomThemeProvider from './app/theme/ThemeContext';
import AppVersionDetector from './app/components/shared/AppVersionDetector';

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
    path: Routes.GameTab,
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
    path: Routes.GameToBank,
    element: <PayToBankPage />
  },
  {
    path: Routes.GameFromBank,
    element: <PayFromBankPage />
  },
  {
    path: Routes.GamePayCollect,
    element: <PayCollectPage />
  }
])

const App = () => {
  const socket = io(import.meta.env.VITE_SOCKETS_URL);

  return (
    <CustomThemeProvider>
      <GameProvider>
        <SocketProvider socket={socket}>
          <CssBaseline />
          <Toaster />
          <Box sx={{ height: '100vh' }}>
            <RouterProvider router={router} />
          </Box>
          <AppVersionDetector />
        </SocketProvider>
      </GameProvider>
    </CustomThemeProvider>
  )
}

export default App