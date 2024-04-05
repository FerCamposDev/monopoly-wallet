import { SocketActions, SocketEvents } from "@monopoly-wallet/shared-types";
import { useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = 'http://localhost:3333';
const socket = io(SOCKET_URL);

export function App() {
  const handleCreateGame = () => {
    try {
      socket.emit(SocketActions.CREATE_GAME, 'Avengers')
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  useEffect(()=>{
    try {
      socket.onAny((args) => {
        console.log('Socket name: >> ', args);
      })
      socket.on("available_tokens", (data) => {
        console.log('tokens :>> ', data);
      });

      socket.on('error', (data) => {
        console.log('Error data :>> ', data);
      })

      socket.on('custom-error', (data) => {
        console.log('Error data :>> ', data);
      })

      socket.on("connect_error", (err) => {
        console.log(err.message);
      });
    } catch (error) {
      console.log(error)
    }
    
  },[])

  return (
    <div>
      <button onClick={handleCreateGame}>
        Create Game
      </button>
    </div>
  );
}

export default App;
