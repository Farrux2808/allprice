import { BaseError } from '../Base.error';
import { ErrorCodeEnum } from '../../enums';

export class LoginOrPasswordInCorrectError extends BaseError {
  constructor(message: string = 'Login or password incorrect') {
    super(
      message,
      {
        en: 'Login or password incorrect',
        ru: 'Логин или пароль неверны',
        uz: "Login yoki parol noto'g'ri",
      },
      ErrorCodeEnum.LOGIN_OR_PASSWORD_INCORRECT_ERROR,
    );
  }
}
