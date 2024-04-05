import express from 'express';
import http from "http";
import cors from "cors";
import { Server } from 'socket.io';

type Token = string;
type Player = string;

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

  socket.on('send_message', (data) => {
      socket.broadcast.emit('receive_message', data)
  })
  socket.on('test', (data) => {
      socket.emit('available_tokens', ['ASD'])
  })

  socket.on('create_game', (roomName: string) => {
      try {
          // createGame(roomName);
          socket.join(roomName);
      } catch (error) {
          socket.emit('custom-error', error)
      }
  })

  /* socket.on('restore_game', (roomName: string, game: Game) => {
      restoreGame(roomName, game);
      socket.join(roomName);
  }) */

  socket.on('join_room', (roomName: string) => {
      socket.join(roomName);
  })

  socket.on('leave_room', (roomName: string) => {
      try {
          // disconnectPlayerById(roomName, socket.id);
          socket.leave(roomName);
      } catch (error) {
          socket.emit('custom-error', error)
      }
  })

  socket.on('join_game', (roomName: string, player: Player) => {
      try {
          // addPlayer(roomName, player);
      } catch (error) {
          socket.emit('custom-error', error)
      }
  })

  socket.on('join_game_to_token', (roomName: string, token: Token) => {
      try {
          // connectPlayerById(roomName, socket.id, token);
      } catch (error) {
          socket.emit('custom-error', error)
      }
  })

  socket.on('leave_game', (roomName: string, player: Player) => {
      try {
          // removePlayerByToken(roomName, player.token);
          socket.leave(roomName);
      } catch (error) {
          console.log('error :>> ', error);
          socket.emit('custom-error', error)
      }
  })

  socket.on('disconnect', (data) => {
      try {
          socket.rooms.forEach(room => {
              // disconnectPlayerById(room, socket.id);
          })
          console.warn(`Disconnect: ${socket.id}`, data);
      } catch (error) {
          socket.emit('custom-error', error)
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
          // io.in(room).emit('available_tokens', getAvailableTokens(room));
      } catch (error) {
          io.in(room).emit('custom-error', error)
      }
  }
}) 

io.of('/').adapter.on('leave-room', (room: string, id) => {
  if (room !== id) {
      try {
          console.log(`socket ${id} has leave room ${room}`);
          // io.in(room).emit('available_tokens', getAvailableTokens(room));
      } catch (error) {
          io.in(room).emit('custom-error', error)
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