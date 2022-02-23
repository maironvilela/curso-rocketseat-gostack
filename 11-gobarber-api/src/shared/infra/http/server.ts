import 'reflect-metadata';
import 'dotenv/config'
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';
import '@shared/infra/typeorm';
import '../../container/index'

import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
import { errors } from 'celebrate';

let errorCode: number;

const app = express();
app.use(cors());
app.use(rateLimiter)
app.use(express.json());
app.use(routes);
app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {

  if (err instanceof AppError) {
    errorCode = err.statusCode;
    response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    response.status(500).json({
      status: 'error',
      message: err.stack,
    });
  }
});

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
