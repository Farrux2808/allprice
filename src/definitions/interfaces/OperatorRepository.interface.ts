import { BaseCRUDRepositoryInterface } from './base';
import { OperatorEntity } from '../../domain';
import { FilterQuery, Types } from 'mongoose';

export interface OperatorRepositoryInterface extends BaseCRUDRepositoryInterface<OperatorEntity> {
  countDocumentsByFilter(filter: FilterQuery<any>): Promise<number>;

  deleteById(_id: Types.ObjectId): Promise<boolean>;

  getByEmail(email: string): Promise<OperatorEntity>;

  deleteRolesFromMany(roleId: Types.ObjectId): Promise<boolean>;
}
