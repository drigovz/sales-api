import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/authConfig';

interface IPayloadToken {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT Token is missing!', 401);
  }

  // Bearer token_key
  const [, token] = authHeader.split(' ');

  try {
    const payloadToken = verify(token, authConfig.jwt.secret);
    const { sub } = payloadToken as IPayloadToken;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token!', 401);
  }
}
