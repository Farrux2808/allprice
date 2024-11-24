import { BaseError } from '../Base.error';
import { ErrorCodeEnum } from '../../enums';

export class OperatorEmailExistsError extends BaseError {
  constructor(message: string = 'This email belongs to an active operator.') {
    super(
      message,
      {
        en: 'This email belongs to an active operator.',
        ru: 'Эта электронная почта принадлежит активному оператору.',
        uz: 'Ushbu elektron pochta faol operatorga tegishli.',
      },
      ErrorCodeEnum.EMAIL_ALREADY_EXISTS_ERROR,
    );
  }
}
