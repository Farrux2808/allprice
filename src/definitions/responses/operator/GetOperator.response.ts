import { Types } from 'mongoose';
import { LanguageEnum, OperatorStatusEnum } from '../../enums';
import { OperatorEntity } from '../../../domain';


export class GetOperatorResponse {
  id?: Types.ObjectId;

  fullName: string;

  email?: string;

  status?: OperatorStatusEnum;

  createdAt?: Date;

  constructor(operator: OperatorEntity) {
    if (operator && operator instanceof OperatorEntity) {
      this.id = operator.getId();
      this.fullName = operator.getFullName();
      this.email = operator.getEmail();
      this.status = operator.getStatus();
      this.createdAt = operator.getCreatedAt();
    }
  }
}
