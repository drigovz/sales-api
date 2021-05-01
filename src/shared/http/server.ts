import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const port = '3333' || process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error!',
    });
  }
});

app.listen(port, () => {
  console.log(`🏆 Server is running on http://localhost:${port} 🏆`);
});
