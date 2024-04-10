import express from 'express';
import http from "http";
import cors from "cors";
import { Server } from 'socket.io';
import { SocketAction } from '@monopoly-wallet/shared-types';
import { GameController } from './controllers/GameActions.controller';
import { RoomController } from './controllers/RoomEvents.controller';

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

  socket.on(SocketAction.CREATE_GAME, controller.createGame);
  
  socket.on(SocketAction.RESTORE_GAME, controller.restoreGame);

  socket.on(SocketAction.JOIN_ROOM, controller.joinRoom);

  socket.on(SocketAction.LEAVE_ROOM, controller.leaveRoom);

  socket.on(SocketAction.JOIN_GAME, controller.joinGame);

  socket.on(SocketAction.JOIN_GAME_TO_TOKEN, controller.joinGameToToken);

  socket.on(SocketAction.LEAVE_GAME, controller.leaveGame);

  // payments
  socket.on(SocketAction.PAYMENT_P2P, controller.paymentP2P);

  socket.on(SocketAction.PAYMENT_TO_BANK, controller.paymentToBank);

  socket.on(SocketAction.PAYMENT_TO_PLAYER, controller.paymentToPlayer);

  socket.on('disconnect', controller.disconnect);
})

// ROOMS
const roomController = new RoomController(io);
io.of("/").adapter.on("create-room", roomController.create);
io.of('/').adapter.on('join-room', roomController.join)
io.of('/').adapter.on('leave-room', roomController.leave);
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