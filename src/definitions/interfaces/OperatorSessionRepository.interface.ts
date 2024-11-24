import { BaseCRUDRepositoryInterface } from './base';
import { OperatorSessionEntity } from '../../domain';
import { FilterQuery, Types } from 'mongoose';

export interface OperatorSessionRepositoryInterface extends BaseCRUDRepositoryInterface<OperatorSessionEntity> {
  getByOperatorId(ownerId: Types.ObjectId): Promise<OperatorSessionEntity>;

  setUsedTime(_id: Types.ObjectId): Promise<OperatorSessionEntity>;

  deActivate(_id: Types.ObjectId): Promise<OperatorSessionEntity>;

  countDocumentsByFilter(filter: FilterQuery<any>): Promise<number>;

  deActivateAllByOperator(operatorId: Types.ObjectId): Promise<void>;
}
