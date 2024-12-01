import { Types } from 'mongoose';
import { prop, Ref } from '@typegoose/typegoose';
import { CategorySchema } from './Category.schema';
import { ServiceEnum } from '../../../definitions';

export class ServicesCategorySchema {
  @prop({ ref: () => CategorySchema })
  categoryId?: Ref<CategorySchema>;

  @prop()
  service: ServiceEnum;

  @prop()
  status?: boolean;

  @prop()
  serviceCategoryId?: string;

  /** ID */
  _id?: Types.ObjectId;

  /** Дата обновления */
  updatedAt?: Date;

  /** Дата создания */
  createdAt?: Date;
}
