import express from 'express';
import http from "http";
import cors from "cors";
import { Server } from 'socket.io';
import { SocketAction, SocketEvent } from '@monopoly-wallet/shared-types';
import { GameController } from './controllers/game';
import { games } from './model/games';

const app = express();
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200"
  }
})

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`)
  const controller = new GameController(socket);

  /* socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  })
  socket.on('test', (data) => {
    socket.emit('available_tokens', ['ASD'])
  }) */

  /* socket.on('restore_game', (roomName: string, game: Game) => {
      restoreGame(roomName, game);
      socket.join(roomName);
  }) */
  socket.on(SocketAction.CREATE_GAME, controller.createGame);

  socket.on(SocketAction.JOIN_ROOM, controller.joinRoom);

  socket.on(SocketAction.LEAVE_ROOM, controller.leaveRoom);

  socket.on(SocketAction.JOIN_GAME, controller.joinGame);

  socket.on(SocketAction.JOIN_GAME_TO_TOKEN, controller.joinGameToToken);

  socket.on(SocketAction.LEAVE_GAME, controller.leaveGame);

  socket.on('disconnect', controller.disconnect);
})

// ROOMS
io.of("/").adapter.on("create-room", (room: string) => {
  console.log(`room ${room} was created`);
});

io.of('/').adapter.on('join-room', (room: string, id: string) => {
  if (room !== id) {
    try {
      console.log(`socket ${id} has joined room ${room}`);
      io.in(room).emit(SocketEvent.AVAILABLE_TOKENS, games.getGame(room).availableTokens);
    } catch (error) {
      io.in(room).emit(SocketEvent.CUSTOM_ERROR, error)
    }
  }
})

io.of('/').adapter.on('leave-room', (room: string, id) => {
  if (room !== id) {
    try {
      console.log(`socket ${id} has leave room ${room}`);
      io.in(room).emit(SocketEvent.AVAILABLE_TOKENS, games.getGame(room).availableTokens);
    } catch (error) {
      io.in(room).emit(SocketEvent.CUSTOM_ERROR, error)
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