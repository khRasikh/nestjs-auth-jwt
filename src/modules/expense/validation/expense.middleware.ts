import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExpenseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (res.statusCode === 200) {
      next();
    } else {
      throw console.error('Make sure you get the data form DB accurately.');
    }
  }
}
