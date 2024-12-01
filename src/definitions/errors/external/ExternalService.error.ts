import { ErrorCodeEnum } from '../../enums';
import { BaseError } from '../Base.error';

export class ExternalServiceError extends BaseError {
  constructor(message?: string, code?: ErrorCodeEnum) {
    super(
      message ? message : `External service error`,
      {
        en: `External service error`,
        ru: `Ошибка внешней службы`,
        uz: `Tashqi xizmat xatosi`,
      },
      code,
    );
  }
}
