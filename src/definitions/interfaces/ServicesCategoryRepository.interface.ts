import { BaseCRUDRepositoryInterface } from './base';
import { ServicesCategoryEntity } from '../../domain';
import { FilterQuery, Types } from 'mongoose';
import { ServiceEnum } from '../enums';

export interface ServicesCategoryRepositoryInterface extends BaseCRUDRepositoryInterface<ServicesCategoryEntity> {
  countDocumentsByFilter(filter: FilterQuery<any>): Promise<number>;
  getByCategoryAndService(categoryId: Types.ObjectId, service: ServiceEnum): Promise<ServicesCategoryEntity>;
  delete(_id: Types.ObjectId): Promise<boolean>;
}
