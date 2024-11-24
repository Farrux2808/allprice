import { ErrorCodeEnum } from '../../enums';
import { BaseError } from '../Base.error';

export class OperatorNeedToChangePasswordError extends BaseError {
  constructor(message: string = 'The operator need to change the password') {
    super(
      message,
      {
        uz: "Operator parolni o'zgartirishi kerak",
        ru: 'Оператору необходимо сменить пароль',
        en: 'The operator need to change the password',
      },
      ErrorCodeEnum.OPERATOR_NEED_TO_CHANGE_PASSWORD_ERROR,
    );
  }
}
