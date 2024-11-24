import { BaseError } from './Base.error';
import { ErrorCodeEnum } from '../enums';

export class AuthorizationError extends BaseError {
  constructor(message: string) {
    super(
      message,
      {
        en: `Authorization error`,
        ru: `Ошибка авторизации`,
        uz: `Avtorizatsiya xatosi`,
        kaa: `Avtorizatsiya qátesi`,
      },
      ErrorCodeEnum.AUTHORIZATION_ERROR,
    );
  }
}
