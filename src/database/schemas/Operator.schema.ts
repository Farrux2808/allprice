import { Types } from 'mongoose';
import { prop } from '@typegoose/typegoose';
import { OperatorStatusEnum } from '../../definitions';

export class OperatorSchema {
  /** Имя Фамилия */
  @prop()
  fullName: string;

  /** Адрес электронной почты */
  @prop()
  email?: string;

  /** Пароль */
  @prop()
  password?: string;

  /** Статус */
  @prop()
  status?: OperatorStatusEnum;

  /** Roles */
  @prop()
  roles?: string;

  /** ID */
  _id?: Types.ObjectId;

  /** Дата обновления */
  updatedAt?: Date;

  /** Дата создания */
  createdAt?: Date;
}
