import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { TranslatesSchema } from '../Translates.schema';

export class CategorySchema {
  @prop()
  name?: TranslatesSchema;

  @prop()
  status?: boolean;

  /** ID */
  _id?: Types.ObjectId;

  /** Дата обновления */
  updatedAt?: Date;

  /** Дата создания */
  createdAt?: Date;
}
