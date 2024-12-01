import { BaseCRUDRepositoryInterface } from './base';
import { CategoryEntity } from '../../domain';
import { FilterQuery, Types } from 'mongoose';

export interface CategoryRepositoryInterface extends BaseCRUDRepositoryInterface<CategoryEntity> {
  countDocumentsByFilter(filter: FilterQuery<any>): Promise<number>;
  delete(_id: Types.ObjectId): Promise<boolean>;
}
