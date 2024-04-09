import express from 'express';
import http from "http";
import cors from "cors";
import { Server } from 'socket.io';
import { CustomError, IPlayer, SocketActionInterfaces, SocketActions, SocketEvents, Token } from '@monopoly-wallet/shared-types';
import { GameRooms } from './game/GameRooms';

const app = express();
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200"
  }
})
const games = new GameRooms();

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`)

  /* socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  })
  socket.on('test', (data) => {
    socket.emit('available_tokens', ['ASD'])
  }) */

  const emitError = error => {
    if (error instanceof CustomError) {
      return socket.emit(SocketEvents.CUSTOM_ERROR, error)
    }
    console.error('error :>> ', error);
    socket.emit('error', { message: 'Something went wrong', data: error?.toString() });
  };

  const action: SocketActionInterfaces[SocketActions.JOIN_GAME_TO_TOKEN] = (roomName: string) => {
    try {
      games.createGameRoom(roomName);
      socket.join(roomName);
    } catch (error) {
      emitError(error)
    }
  };
  socket.on(SocketActions.CREATE_GAME, action)

  /* socket.on('restore_game', (roomName: string, game: Game) => {
      restoreGame(roomName, game);
      socket.join(roomName);
  }) */

  socket.on(SocketActions.JOIN_ROOM, (room: string) => {
    socket.join(room);
  })

  socket.on(SocketActions.LEAVE_ROOM, (room: string) => {
    try {
      games.getGame(room).disconnectPlayerById(socket.id);
      socket.leave(room);
    } catch (error) {
      emitError(error)
    }
  })

  socket.on(SocketActions.JOIN_GAME, (room: string, player: IPlayer) => {
    try {
      games.getGame(room).addPlayer(player)
    } catch (error) {
      emitError(error)
    }
  })

  socket.on(SocketActions.JOIN_GAME_TO_TOKEN, (room: string, token: Token) => {
    try {
      games.getGame(room).connectPlayerById(socket.id, token)
    } catch (error) {
      emitError(error)
    }
  })

  socket.on(SocketActions.LEAVE_GAME, (room: string, player: IPlayer) => {
    try {
      games.getGame(room).removePlayerByToken(player.token)
      socket.leave(room);
    } catch (error) {
      emitError(error)
    }
  })

  socket.on('disconnect', (data) => {
    try {
      socket.rooms.forEach(room => {
        games.getGame(room).disconnectPlayerById(socket.id);
      })
      console.warn(`Disconnect: ${socket.id}`, data);
    } catch (error) {
      emitError(error)
    }
  })
})

// ROOMS
io.of("/").adapter.on("create-room", (room: string) => {
  console.log(`room ${room} was created`);
});

io.of('/').adapter.on('join-room', (room: string, id: string) => {
  if (room !== id) {
    try {
      console.log(`socket ${id} has joined room ${room}`);
      io.in(room).emit(SocketEvents.AVAILABLE_TOKENS, games.getGame(room).availableTokens);
    } catch (error) {
      io.in(room).emit(SocketEvents.CUSTOM_ERROR, error)
    }
  }
})

io.of('/').adapter.on('leave-room', (room: string, id) => {
  if (room !== id) {
    try {
      console.log(`socket ${id} has leave room ${room}`);
      io.in(room).emit(SocketEvents.AVAILABLE_TOKENS, games.getGame(room).availableTokens);
    } catch (error) {
      io.in(room).emit(SocketEvents.CUSTOM_ERROR, error)
    }
  }
})
// ROOMS END

/* app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to sockets-server!' });
}); */

const port = process.env.PORT || 3333;
/* const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
}); 
server.on('error', console.error);
*/
server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
})