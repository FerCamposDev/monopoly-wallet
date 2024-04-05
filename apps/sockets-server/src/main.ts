/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { sharedTypes } from '@monopoly-wallet/shared-types';
import express from 'express';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to sockets-server!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
  console.log(sharedTypes());
});
server.on('error', console.error);