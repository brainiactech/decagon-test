import CheckLimit from '@/utils/checkRateLimiting';
import { RequestWithUser } from '@interfaces/auth.interface';
import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';

const rateLimiterMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
  console.log(Authorization);
  await CheckLimit(Authorization, parseInt(process.env.Rate_Limit) || 30, (timeLeftInSecs: number) => {
    const toMinutes: number = Math.round(timeLeftInSecs / 60);
    next(new HttpException(400, `Too many requests, please try again in the next ${toMinutes} minute(s)`));
  });
  next();
};

export default rateLimiterMiddleware;
