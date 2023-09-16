import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const secretKey = 'chinese-palace-app';
        const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;

        const userIdFromToken = decodedToken.userId;
        const tokenId = +req.params[0].split('/')[1];

        if (userIdFromToken === tokenId) {
          next();
        } else {
          res.status(403).json({ message: 'No tienes autorización para acceder a estas direcciones.' });
        }
      } catch (error) {
        res.status(401).json({ message: 'Token inválido o vencido.' });
      }
    } else {
      res.status(401).json({ message: 'Token de autorización no proporcionado.' });
    }
  }
}
