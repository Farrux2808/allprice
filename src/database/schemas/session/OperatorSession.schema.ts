import { index, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { OperatorSessionMetadataSchema } from './OperatorSessionMetadata.schema';
import { OperatorSchema } from '../Operator.schema';
import { OperatorSessionStatusEnum } from '../../../definitions';

@index({ ownerId: 1 })
@index({ accessToken: 1 }, { unique: true })
@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class OperatorSessionSchema {
  /** Идентификатор владельца */

  @prop({ ref: () => OperatorSchema })
  operator?: Ref<OperatorSchema>;

  /** Статус сеанса */
  @prop({ enum: OperatorSessionStatusEnum })
  status?: OperatorSessionStatusEnum;

  /** Токен доступа */
  @prop()
  accessToken?: string;

  /** Строки User-Agent */
  @prop()
  useragent?: string;

  /** Истекает */
  @prop()
  expireSeconds?: number;

  /** Метаданные */
  @prop({ _id: false })
  metadata?: OperatorSessionMetadataSchema;

  /** ID */
  _id?: Types.ObjectId;

  /** Время использования */
  @prop()
  usedAt?: Date;

  /** Дата истекает */
  @prop()
  expiresAt?: Date;

  /** Дата обновления */
  @prop()
  updatedAt?: Date;

  /** Дата создания */
  @prop()
  createdAt?: Date;
}
