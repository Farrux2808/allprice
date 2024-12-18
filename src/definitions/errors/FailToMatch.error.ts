import { BaseError } from './Base.error';
import { ErrorCodeEnum } from "../enums";

export class FailToMatchError extends BaseError {
  constructor(field: string, message?: string) {
    super(
      message ? message : `'${field}' is fail to match`,
      {
        en: `'${field}' is fail to match`,
        ru: `'${field}' не соответствует`,
        uz: `'${field}' mos kelmadi`,
        kaa: `'${field}' uyqas kelmadi`,
      },
      ErrorCodeEnum.VALIDATION_FAIL_TO_MATCH_ERROR,
    );
  }
}
