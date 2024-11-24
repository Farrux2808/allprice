import { BaseError } from '../Base.error';
import { ErrorCodeEnum } from '../../enums';

export class OperatorIsNotActiveError extends BaseError {
  constructor(message: string = 'The operator is not active') {
    super(
      message,
      {
        en: 'The operator is not active',
        ru: 'Оператор не активен',
        uz: 'Operator active holatda emas',
      },
      ErrorCodeEnum.OPERATOR_IS_NOT_ACTIVE_ERROR,
    );
  }
}
