import { ErrorCodeEnum } from '../enums';
import { BaseError } from './Base.error';

export class TokenExpiredError extends BaseError {
  constructor(message: string = 'Token expired') {
    super(
      message,
      {
        en: 'Token expired',
        ru: 'Срок действия токена истек',
        uz: 'Token muddati tugagan',
      },
      ErrorCodeEnum.TOKEN_EXPIRED_ERROR,
    );
  }
}
