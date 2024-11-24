import { BaseError } from '../Base.error';
import { ErrorCodeEnum } from '../../enums';

export class OperatorIsNotDeletableError extends BaseError {
  constructor(message: string = 'The operator is not deletable') {
    super(
      message,
      {
        en: 'The operator is not deletable',
        ru: 'Оператор не является удаляемым',
        uz: `Operatorni o'chirish mumkun emas`,
      },
      ErrorCodeEnum.OPERATOR_IS_NOT_DELETABLE,
    );
  }
}
