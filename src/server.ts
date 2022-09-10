import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers';
import 'express-async-errors';
import { errorHandler } from './middlewares/errorHandlingMiddleware';

dotenv.config();
const PORT: number = Number(process.env.PORT) || 5000;
const server = express();
server.use(json());
server.use(cors());

server.use(router);
server.use(errorHandler);

server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
})