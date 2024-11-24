import { Types } from 'mongoose';
import { OperatorStatusEnum } from '../../enums';
import { OperatorEntity } from '../../../domain';

export class GetOperatorListResponse {
  id?: Types.ObjectId;

  fullName?: string;

  email?: string;

  status?: OperatorStatusEnum;

  constructor(operator: OperatorEntity) {
    if (operator && operator instanceof OperatorEntity) {
      this.id = operator.getId();
      this.fullName = operator.getFullName();
      this.email = operator.getEmail();
      this.status = operator.getStatus();
    }
  }
}
