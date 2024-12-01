import { Types } from 'mongoose';
import { ServiceEnum } from '../../enums';

export interface ServiceCategoryResponse {
  id: Types.ObjectId;
  categoryId: Types.ObjectId;
  serviceCategoryId: string;
  service: ServiceEnum;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
