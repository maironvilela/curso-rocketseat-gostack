import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação token JWT
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Token é necessário', 401);
  }

  const [, token] = authorization.split(' ');
  const { secret } = authConfig.jwt;
  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };
    next();
  } catch (error) {
    throw new AppError('Token Invalido', 401);
  }
}
