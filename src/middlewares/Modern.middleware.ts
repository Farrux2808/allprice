import { Request, Response, NextFunction } from 'express';
import { LanguageEnum } from '../definitions';

export async function ModernMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const lang = req.headers['content-language'] ? req.headers['content-language'] : LanguageEnum.EN;
  req.lang = lang;
  res.lang = lang;
  await next();
}
