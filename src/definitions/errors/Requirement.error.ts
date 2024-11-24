import { BaseError } from './Base.error';
import { ErrorCodeEnum } from '../enums';

export class RequirementError extends BaseError {
  constructor(field: string, message?: string) {
    super(
      message ? message : `'${field}' is required field`,
      {
        en: `'${field}' is required field`,
        ru: `'${field}' обязательное поле`,
        uz: `'${field}' majburiy maydon`,
        kaa: `'${field}' májburiy maydan`,
      },
      ErrorCodeEnum.REQUIREMENT_ERROR,
    );
  }
}
