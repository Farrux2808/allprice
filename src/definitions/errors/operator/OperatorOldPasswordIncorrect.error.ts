import { ErrorCodeEnum } from '../../enums';
import { BaseError } from '../Base.error';

export class OperatorOldPasswordIncorrectError extends BaseError {
  constructor(message: string = 'Operator old password incorrect') {
    super(
      message,
      {
        uz: "Operatorning eski paroli noto'g'ri",
        ru: 'Неверный старый пароль оператора',
        en: 'Operator old password incorrect',
      },
      ErrorCodeEnum.OPERATOR_OLD_PASSWORD_INCORRECT_ERROR,
    );
  }
}
